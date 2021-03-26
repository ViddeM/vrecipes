package authentication

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"log"
	"net/http"
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

var (
	errScopeNotFound = errors.New("required scope not found")
	providerGithub="github"
	githubConfig *oauth2.Config
)

func init() {
	registerOnInit(func () {
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
	})
}

func GithubInitAuth(c *gin.Context) {
	initAuth(c, githubConfig)
}

func GithubCallback(c *gin.Context) {
	token := handleCallback(c, githubConfig)
	if token == nil {
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
			err = setSession(c, user.Name, e.Email, providerGithub, token)
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
	_, err := common.GetRequest(common.GetEnvVars().GithubUserEmailEndpoint, map[string]string{
		"Authorization": fmt.Sprintf("token %s", accessToken),
		"Accept": "application/vnd.github.v3+json",
	}, &user)

	return &user, err
}

func githubUserRequest(accessToken string) (*githubUserResponse, error) {
	var user githubUserResponse
	resp, err := common.GetRequest(common.GetEnvVars().GithubUserEndpoint, map[string]string{
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