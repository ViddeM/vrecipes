package process

import (
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/models"
)

func GetUserJson(id uint64) (*models.User, error) {
	user, err := queries.GetUser(id)
	if err != nil {
		return nil, err
	}

	emails, err := queries.GetEmailsForUser(user.ID)
	if err != nil {
		return nil, err
	}

	var emailJsons []models.UserEmail
	for _, email := range emails {
		emailJsons = append(emailJsons, models.UserEmail{
			Email:    email.Email,
			Provider: email.Provider,
		})
	}

	return &models.User{
		Id:     user.ID,
		Name:   user.Name,
		Emails: emailJsons,
	}, nil
}
