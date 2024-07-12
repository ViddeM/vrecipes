package authentication

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/microsoft"
	"log"
	"net/http"
)

type microsoftMeResponse struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

var (
	providerMicrosoft = "microsoft"
	microsoftConfig   *oauth2.Config
)

func init() {
	registerOnInit(func() {
		envVars := common.GetEnvVars()

		microsoftConfig = &oauth2.Config{
			ClientID:     envVars.MicrosoftClientId,
			ClientSecret: envVars.MicrosoftSecret,
			Endpoint:     microsoft.AzureADEndpoint(""),
			RedirectURL:  envVars.MicrosoftRedirectUri,
			Scopes: []string{
				"email openid profile",
			},
		}
	})
}

func MicrosoftInitAuth(c *gin.Context) {
	initAuth(c, microsoftConfig)
}

func MicrosoftCallback(c *gin.Context) {
	token := handleCallback(c, microsoftConfig)
	if token == nil {
		return
	}

	user, err := MicrosoftMeRequest(token.AccessToken)
	if err != nil {
		log.Printf("Failed to retrieve user data from microsoft: %v\n", err)
		abort(c)
		return
	}

	if checkIfWhitelisted(user.Email) {
		err := setSession(c, user.Name, user.Email, providerMicrosoft, token)
		if err != nil {
			log.Printf("Failed to save sessionData: %v\n", err)
			abort(c)
			return
		}
	}

	c.Redirect(http.StatusTemporaryRedirect, "/")
	return
}

func MicrosoftMeRequest(accessToken string) (*microsoftMeResponse, error) {
	var user microsoftMeResponse
	url := common.GetEnvVars().MicrosoftMeUri
	headers := map[string]string{
		"Authorization": fmt.Sprintf("Bearer %s", accessToken),
	}
	_, err := common.GetRequest(url, headers, &user)
	return &user, err
}
