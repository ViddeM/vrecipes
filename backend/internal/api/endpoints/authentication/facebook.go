package authentication

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/facebook"
	"log"
	"net/http"
)

var (
	providerFacebook="facebook"
	facebookConfig *oauth2.Config
)

type facebookMeResponse struct {
	Name string `json:"name"`
	Email string `json:"email"`
}

func init() {
	registerOnInit(func () {
		envVars := common.GetEnvVars()
		
		facebookConfig = &oauth2.Config{
			ClientID:     envVars.FacebookClientId,
			ClientSecret: envVars.FacebookSecret,
			Endpoint:     facebook.Endpoint,
			RedirectURL:  envVars.FacebookRedirectUri,
			Scopes:       []string{
				"public_profile,email",
			},
		}
	})
}

func FacebookInitAuth(c *gin.Context) {
	initAuth(c, facebookConfig)
}

func FacebookCallback(c *gin.Context) {
	token := handleCallback(c, facebookConfig)
	if token == nil {
		return
	}

	user, err := facebookMeRequest(token.AccessToken)
	if err != nil {
		log.Printf("Failed to retrieve facebook user: %v\n", err)
		abort(c)
		return
	}

	if checkIfWhitelisted(user.Email) {
		err = setSession(c, user.Name, user.Email, providerFacebook, token)
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

func facebookMeRequest(accessToken string) (*facebookMeResponse, error) {
	var user facebookMeResponse
	url := fmt.Sprintf("%s?fields=name,email&access_token=%s", common.GetEnvVars().FacebookMeUri, accessToken)
	_, err := common.GetRequest(url, map[string]string{}, &user)

	return &user, err
}