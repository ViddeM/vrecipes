package authentication

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type sessionData struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Token *oauth2.Token `json:"token"`
	Provider string `json:"provider"`
}

type whiteList struct {
	Emails []string `json:"whitelisted_emails"`
}

var (
	githubConfig *oauth2.Config
	providerGithub="github"
	errInvalidToken = errors.New("invalid token")
)


func Init() {
	envVars := common.GetEnvVars()

	githubConfig = &oauth2.Config{
		ClientID:     envVars.GithubClientId,
		ClientSecret: envVars.GithubSecret,
		Endpoint:     github.Endpoint,
		RedirectURL:  envVars.GithubRedirectUri,
		Scopes:       []string{
			"user:email",
		},
	}
}

func initAuth(c *gin.Context, config *oauth2.Config) {
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

	url := config.AuthCodeURL(state)
	c.Header("location", url)
	c.String(http.StatusUnauthorized, url)
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
	c.String(http.StatusUnauthorized, "")
}

func abort(c *gin.Context) {
	c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToAuthenticate))
}

func checkIfWhitelisted(email string) bool {
	file, err := os.Open(common.GetEnvVars().WhiteList)
	if err != nil {
		log.Printf("Failed to read whitelists file: %v\n", err)
		return false
	}
	defer file.Close()
	data, err := ioutil.ReadAll(file)
	if err != nil {
		log.Printf("Failed to parse whitelists file: %v\n", err)
		return false
	}
	var whitelist whiteList
	err = json.Unmarshal(data, &whitelist)
	if err != nil {
		log.Printf("Failed to unmarshal whitelists file: %v\n", err)
		return false
	}

	for _, whitelisted := range whitelist.Emails {
		if whitelisted == email {
			return true
		}
	}
	return false
}

func generateState() (string, error) {
	b := make([]byte, 16)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}
