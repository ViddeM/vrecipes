package authentication

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"golang.org/x/oauth2"
	"log"
	"net/http"
)

var (
	providerAccountsRs = "accounts-rs"
	accountsRsConfig   *oauth2.Config
)

var AccountsRsEndpoint = oauth2.Endpoint{
	AuthURL:  "https://accounts.vidarmagnusson.com/api/oauth/authorize",
	TokenURL: "https://accounts.vidarmagnusson.com/api/oauth/token",
}

func init() {
	registerOnInit(
		func() {
			envVars := common.GetEnvVars()

			accountsRsConfig = &oauth2.Config{
				ClientID:     envVars.AccountsRsClientId,
				ClientSecret: envVars.AccountsRsSecret,
				Endpoint:     AccountsRsEndpoint,
				RedirectURL:  envVars.AccountsRsRedirectUri,
				Scopes: []string{
					"user",
				},
			}
		},
	)
}

func AccountsRsInitAuth(c *gin.Context) {
	initAuth(c, accountsRsConfig)
}

func AccountsRsCallback(c *gin.Context) {
	token := handleCallback(c, accountsRsConfig)
	if token == nil {
		return
	}

	user, err := accountsRsUserRequest(token.AccessToken)
	if err != nil {
		log.Printf("Failed to perform user request: %v\n", err)
		renewAuth(c)
		return
	}

	if checkIfWhitelisted(user.Email) {
		fullName := fmt.Sprintf("%s %s", user.FirstName, user.LastName)
		err = setSession(c, fullName, user.Email, providerAccountsRs, token)
		if err != nil {
			log.Printf("Failed to save sessionData: %v\n", err)
			abort(c)
			return
		}

		c.Redirect(http.StatusTemporaryRedirect, "/")
		return
	}

	c.String(http.StatusForbidden, "Not authorized")
}

type accountsRsResponse struct {
	Success accountsRsUserResponse `json:"success"`
}

type accountsRsUserResponse struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

func accountsRsUserRequest(accessToken string) (*accountsRsUserResponse, error) {
	var response accountsRsResponse
	_, err := common.GetRequest(
		common.GetEnvVars().AccountsRsUserEndpoint, map[string]string{
			"Authorization": fmt.Sprintf("Bearer %s", accessToken),
		}, &response,
	)

	if err != nil {
		return nil, err
	}

	return &response.Success, nil
}
