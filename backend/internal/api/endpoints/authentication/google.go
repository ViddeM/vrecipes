package authentication

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
    googleOauth2 "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
	"log"
	"net/http"
)

var (
	providerGoogle="google"
	googleConfig *oauth2.Config
)

func init() {
	registerOnInit(func () {
		envVars := common.GetEnvVars()

		googleConfig = &oauth2.Config{
			ClientID:     envVars.GoogleClientId,
			ClientSecret: envVars.GoogleSecret,
			Endpoint:     google.Endpoint,
			RedirectURL:  envVars.GoogleRedirectUri,
			Scopes:       []string{
				googleOauth2.UserinfoProfileScope,
				googleOauth2.UserinfoEmailScope,
			},
		}
	})
}

func GoogleInitAuth(c *gin.Context) {
	initAuth(c, googleConfig)
}

func GoogleCallback(c *gin.Context) {
	token := handleCallback(c, googleConfig)
	if token == nil {
		return
	}

	client := googleConfig.Client(context.Background(), token)
	s, err := googleOauth2.NewService(context.Background(), option.WithHTTPClient(client))
	if err != nil {
		log.Printf("Failed to setup google oauth2 service: %v\n", err)
		abort(c)
		return
	}

	userInfo, err := s.Userinfo.Get().Do()
	if err != nil {
		log.Printf("Failed to perform google userInfo request: %v\n", err)
		abort(c)
		return
	}

	if userInfo.VerifiedEmail == nil || *userInfo.VerifiedEmail == false {
		log.Printf("User '%s' has not verified their email ('%s')\n", userInfo.Name, userInfo.Email)
		abort(c)
		return
	}

	if checkIfWhitelisted(userInfo.Email) {
		err = setSession(c, userInfo.Name, userInfo.Email, providerGoogle, token)
		if err != nil {
			log.Printf("Failed to save sessionData")
			abort(c)
			return
		}

		c.Redirect(http.StatusTemporaryRedirect, "/")
		return
	}

	c.String(http.StatusForbidden, "Not authorized")
}