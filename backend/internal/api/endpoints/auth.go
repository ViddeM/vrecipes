package endpoints

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
)

var (
	githubConfig *oauth2.Config
	whiteListedEmails = []string{
		"git@vidarmagnusson.com",
	}
	providerGithub="github"
)

func Init() {
	githubConfig = &oauth2.Config{
		ClientID:     os.Getenv("github_client_id"),
		ClientSecret: os.Getenv("github_secret"),
		Endpoint:     github.Endpoint,
		RedirectURL:  os.Getenv("github_redirect_uri"),
		Scopes:       []string{
			"user:email",
		},
	}
}

type sessionData struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Token *oauth2.Token `json:"token"`
	Provider string `json:"provider"`
}

type githubUserResponse struct {
	Login string `json:"login"`
	Name string `json:"name"`
}

type githubUserEmailResponse []githubUserEmail

type githubUserEmail struct {
	Email string `json:"email"`
	Verified bool `json:"verified"`
	Primary bool `json:"primary"`
	Visibility string `json:"visibility"`
}

func AuthGithub(c *gin.Context) {
	state, err := generateState()
	if err != nil {
		abort(c)
		return
	}
	session := sessions.Default(c)
	session.Set("oauth-state", state)
	session.Options(sessions.Options{MaxAge: 20 * 60})
	err = session.Save()
	if err != nil {
		abort(c)
		return
	}

	url := githubConfig.AuthCodeURL(state)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

func GithubCallback(c *gin.Context) {
	receivedState := c.Query("state")
	expectedState := sessions.Default(c).Get("oauth-state")

	if receivedState != expectedState {
		log.Printf("Invalid oauth state, expected '%s', got '%s'\n", expectedState, receivedState)
		abort(c)
		return
	}

	code := c.Query("code")
	token, err := githubConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("Failed to exchange with oauth: %v\n", err)
		abort(c)
		return
	}

	user, err := githubUserRequest(token.AccessToken)
	if err != nil {
		log.Printf("Failed to perform user request: %v\n", err)
		renewAuth(c)
		return
	}

	emails, err := githubEmailRequest(token.AccessToken)
	if err != nil {
		log.Printf("Failed to retrieve emails email data from github: %v", err)
		abort(c)
		return
	}

	for _, e := range *emails {
		if e.Verified && checkIfWhitelisted(e.Email) {
			err = setSession(c, &sessionData{
				Name:     user.Name,
				Email:    e.Email,
				Token:    token,
				Provider: providerGithub,
			})
			if err != nil {
				log.Printf("Failed to save sessionData: %v\n", err)
				abort(c)
				return
			}

			c.String(http.StatusOK, "Welcome %s", e.Email)
			return
		}
	}

	c.String(http.StatusForbidden, "Not authorized")
}

func setSession(c *gin.Context, sessionData *sessionData) error {
	tokenJson, err := json.Marshal(sessionData)
	if err != nil {
		return err
	}

	session := sessions.Default(c)
	session.Set("token", tokenJson)

	err = session.Save()
	return err
}

var errInvalidToken = errors.New("invalid token")

func readSession(c *gin.Context) (*sessionData, error) {
	session := sessions.Default(c)
	data := session.Get("token")
	b, ok := data.([]byte)
	if !ok {
		return nil, errInvalidToken
	}

	var sessionData sessionData
	err := json.Unmarshal(b, &sessionData)
	if err != nil {
		return nil, err
	}

	return &sessionData, nil
}

func resetSession(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	_ = session.Save()
}

func renewAuth(c *gin.Context) {
	resetSession(c)
	AuthGithub(c)
}

func abort(c *gin.Context) {
	c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToAuthenticate))
}

func checkIfWhitelisted(email string) bool {
	for _, whitelisted := range whiteListedEmails {
		if whitelisted == email {
			return true
		}
	}

	return false
}

func githubEmailRequest(accessToken string) (*githubUserEmailResponse, error) {
	var user githubUserEmailResponse
	_, err := getRequest(os.Getenv("github_user_email_endpoint"), map[string]string{
		"Authorization": fmt.Sprintf("token %s", accessToken),
		"Accept": "application/vnd.github.v3+json",
	}, &user)

	return &user, err
}

var errScopeNotFound = errors.New("required scope not found")

func githubUserRequest(accessToken string) (*githubUserResponse, error) {
	var user githubUserResponse
	resp, err := getRequest(os.Getenv("github_user_endpoint"), map[string]string{
		"Authorization": fmt.Sprintf("token %s", accessToken),
		"Accept": "application/vnd.github.v3+json",
	}, &user)

	if err != nil {
		return nil, err
	}

	scopesStr := resp.Header.Get("X-OAuth-Scopes")
	scopes := strings.Split(scopesStr, ",")
	foundScope := false
	for _, scope := range scopes {
		if scope == "user:email" {
			foundScope = true
		}
	}

	if !foundScope {
		return nil, errScopeNotFound
	}

	return &user, nil
}

func getRequest(url string, headers map[string]string, writeTo interface{}) (*http.Response, error) {
	client := &http.Client{}
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}

	for key, val := range headers {
		req.Header.Set(key, val)
	}

	response, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(data, writeTo)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func CheckAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		token := session.Get("token")

		if token == nil {
			session.Clear()
			renewAuth(c)
			c.Abort()
			return
		}

		_, err := readSession(c)
		if err != nil {
			session.Clear()
			log.Printf("Failed to read session: %v\n", err)
			renewAuth(c)
			c.Abort()
			return
		}
	}
}

func generateState() (string, error) {
	b := make([]byte, 16)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}
