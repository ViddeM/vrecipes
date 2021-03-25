package authentication

import (
	"context"
	"errors"
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"log"
	"net/http"
	"os"
	"strings"
)

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

var errScopeNotFound = errors.New("required scope not found")

func GithubInit(c *gin.Context) {
	initAuth(c, githubConfig)
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

			c.Redirect(http.StatusTemporaryRedirect, "/")
			return
		}
	}

	c.String(http.StatusForbidden, "Not authorized")
}

func githubEmailRequest(accessToken string) (*githubUserEmailResponse, error) {
	var user githubUserEmailResponse
	_, err := common.GetRequest(os.Getenv("github_user_email_endpoint"), map[string]string{
		"Authorization": fmt.Sprintf("token %s", accessToken),
		"Accept": "application/vnd.github.v3+json",
	}, &user)

	return &user, err
}

func githubUserRequest(accessToken string) (*githubUserResponse, error) {
	var user githubUserResponse
	resp, err := common.GetRequest(os.Getenv("github_user_endpoint"), map[string]string{
		"Authorization": fmt.Sprintf("token %s", accessToken),
		"Accept": "application/vnd.github.v3+json",
	}, &user)

	if err != nil {
		return nil, err
	}

	scopesStr := resp.Header.Get("X-OAuth-Scopes")
	scopes := strings.Split(scopesStr, ",")
	scopesAccepted := true
	for _, expected := range githubConfig.Scopes {
		scopesAccepted = false
		for _, got := range scopes {
			if expected == got {
				scopesAccepted = true
			}
		}

		if !scopesAccepted {
			break
		}
	}

	if !scopesAccepted {
		return nil, errScopeNotFound
	}

	return &user, nil
}