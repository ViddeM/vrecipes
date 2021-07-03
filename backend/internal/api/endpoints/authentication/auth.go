package authentication

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"golang.org/x/oauth2"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type sessionData struct {
	UserID   uuid.UUID     `json:"user_id"`
	Token    *oauth2.Token `json:"token"`
	Provider string        `json:"provider"`
}

type whiteList struct {
	Emails []string `json:"whitelisted_emails"`
}

var (
	errInvalidToken = errors.New("invalid token")
)

var providers []providerInit

type providerInit func()

func registerOnInit(provider providerInit) {
	providers = append(providers, provider)
}

func Init() {
	if providers != nil {
		for _, provider := range providers {
			provider()
		}
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
	err = session.Save()
	if err != nil {
		abort(c)
		return
	}

	url := config.AuthCodeURL(state)
	c.Header("location", url)
	c.String(http.StatusUnauthorized, url)
}

func setSession(c *gin.Context, name, email, provider string, token *oauth2.Token) error {
	user, err := process.GetOrCreateUser(name, email, provider)
	if err != nil {
		return err
	}

	log.Printf("Retrieved session user: %v\n", user)
	tokenJson, err := json.Marshal(&sessionData{
		UserID:   user.ID,
		Token:    token,
		Provider: provider,
	})
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
	session.Options(
		sessions.Options{
			MaxAge: -1,
			Path:   "/",
		})
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

func handleCallback(c *gin.Context, config *oauth2.Config) *oauth2.Token {
	receivedState := c.Query("state")
	session := sessions.Default(c)
	expectedState := session.Get("oauth-state")

	if receivedState != expectedState {
		log.Printf("Invalid oauth state, expected '%s', got '%s'\n", expectedState, receivedState)
		abort(c)
		return nil
	}

	code := c.Query("code")
	token, err := config.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("Failed to exchange with oauth: %v\n", err)
		abort(c)
		return nil
	}

	return token
}
