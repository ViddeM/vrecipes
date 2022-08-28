package common

import (
	"github.com/joho/godotenv"
	"log"
	"os"
	"strconv"
)

type envVars struct {
	DbUser     string
	DbPassword string
	DbName     string
	DbHost     string
	ResetDb    bool

	RedisAddress string

	BackendAddress string
	ImageFolder    string
	WhiteList      string
	Secret         string
	GinMode        string
	Port           uint16
	AuthEnabled    bool

	GithubClientId          string
	GithubSecret            string
	GithubRedirectUri       string
	GithubUserEmailEndpoint string
	GithubUserEndpoint      string

	GoogleClientId    string
	GoogleSecret      string
	GoogleRedirectUri string

	FacebookClientId    string
	FacebookSecret      string
	FacebookRedirectUri string
	FacebookMeUri       string

	MicrosoftClientId    string
	MicrosoftSecret      string
	MicrosoftRedirectUri string
	MicrosoftMeUri       string
}

var ginModes = []string{
	"debug",
	"release",
}

var vars envVars

func GetEnvVars() *envVars {
	return &vars
}

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Unable to load .env file")
	} else {
		log.Println("Loaded environment variables from .env file")
	}

	loadEnvVars()
}

func loadEnvVars() {
	vars = envVars{
		DbUser:     loadNonEmptyString("db_user"),
		DbPassword: loadNonEmptyString("db_password"),
		DbName:     loadNonEmptyString("db_name"),
		DbHost:     loadNonEmptyString("db_host"),
		ResetDb:    loadBool("reset_db"),

		RedisAddress: loadNonEmptyString("redis_address"),

		Secret:         loadNonEmptyString("secret"),
		WhiteList:      loadNonEmptyString("whitelist"),
		GinMode:        loadGinMode("GIN_MODE"),
		BackendAddress: loadNonEmptyString("backend_address"),
		Port:           loadUint16("PORT"),
		AuthEnabled:    loadBool("auth_enabled"),
		ImageFolder:    loadNonEmptyString("image_folder"),

		GithubClientId:          loadNonEmptyString("github_client_id"),
		GithubSecret:            loadNonEmptyString("github_secret"),
		GithubRedirectUri:       loadNonEmptyString("github_redirect_uri"),
		GithubUserEmailEndpoint: loadNonEmptyString("github_user_email_endpoint"),
		GithubUserEndpoint:      loadNonEmptyString("github_user_endpoint"),

		GoogleClientId:    loadNonEmptyString("google_client_id"),
		GoogleSecret:      loadNonEmptyString("google_secret"),
		GoogleRedirectUri: loadNonEmptyString("google_redirect_uri"),

		FacebookClientId:    loadNonEmptyString("facebook_client_id"),
		FacebookSecret:      loadNonEmptyString("facebook_secret"),
		FacebookRedirectUri: loadNonEmptyString("facebook_redirect_uri"),
		FacebookMeUri:       loadNonEmptyString("facebook_me_uri"),

		MicrosoftClientId:    loadNonEmptyString("microsoft_client_id"),
		MicrosoftSecret:      loadNonEmptyString("microsoft_secret"),
		MicrosoftRedirectUri: loadNonEmptyString("microsoft_redirect_uri"),
		MicrosoftMeUri:       loadNonEmptyString("microsoft_me_uri"),
	}
}

func loadNonEmptyString(key string) string {
	val := os.Getenv(key)
	if val == "" {
		log.Fatalf("Environment variable '%s' is not set or empty\n", key)
	}

	return val
}

func loadUint16(key string) uint16 {
	val := loadNonEmptyString(key)
	num, err := strconv.ParseUint(val, 10, 16)
	if err != nil {
		log.Fatalf("Environment variable '%s' is not a valid uint16: %v\n", key, err)
	}

	return uint16(num)
}

func loadBool(key string) bool {
	val := loadNonEmptyString(key)
	b, err := strconv.ParseBool(val)
	if err != nil {
		log.Fatalf("Environment variable '%s' is not a valid boolean: %v\n", key, err)
	}

	return b
}

func loadGinMode(key string) string {
	val := loadNonEmptyString(key)
	for _, mode := range ginModes {
		if mode == val {
			return val
		}
	}

	log.Fatalf("Invalid gin mode '%s', must be one of: %+v\n", val, ginModes)
	return ""
}
