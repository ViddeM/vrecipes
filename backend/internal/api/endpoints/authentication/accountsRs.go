package authentication

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"golang.org/x/oauth2"
)

var (
	providerAccountsRs = "accounts-rs"
	accountsRsConfig   *oauth2.Config
)

var AccountsRsEndpoint = oauth2.Endpoint{
	AuthURL:  "https://beta-accounts.vidarmagnusson.com/api/oauth/authorize",
	TokenURL: "https://beta-accounts.vidarmagnusson.com/api/oauth/token",
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
					"profile",
					"email",
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

type accountsRsUserResponse struct {
	FirstName string `json:"given_name"`
	LastName  string `json:"family_name"`
	Email     string `json:"email"`
}

func accountsRsUserRequest(accessToken string) (*accountsRsUserResponse, error) {
	var response accountsRsUserResponse
	_, err := common.GetRequest(
		common.GetEnvVars().AccountsRsUserEndpoint, map[string]string{
			"Authorization": fmt.Sprintf("Bearer %s", accessToken),
		}, &response,
	)

	if err != nil {
		return nil, err
	}

	return &response, nil
}
