package process

import (
	"encoding/base64"
	"fmt"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/models"
	"github.com/viddem/vrecipes/backend/internal/validation"
	"os"
)

func UploadImage(file *validation.File) (*models.ImageJson, error) {
	tx, err := commands.BeginTransaction()
	if err != nil {
		return nil, err
	}
	defer commands.RollbackTransaction(tx)

	fileName := generateImageName(file.Name)
	filenameWithPath := fmt.Sprintf("%s%s", fileName, file.FileType)

	id, err := commands.CreateImage(tx, filenameWithPath)
	if err != nil {
		return nil, err
	}

	uniqueFilename := fmt.Sprintf("%s_%s", id, filenameWithPath)
	folder := common.GetEnvVars().ImageFolder
	path := fmt.Sprintf("%s/%s", folder, uniqueFilename)
	newFile, err := os.Create(path)
	if err != nil {
		return nil, err
	}

	_, err = newFile.Write(file.Data)
	if err != nil {
		return nil, err
	}

	err = commands.CommitTransaction(tx)
	if err != nil {
		return nil, err
	}

	return &models.ImageJson{
		Path: uniqueFilename,
		ID:   id,
	}, err
}

func generateImageName(name string) string {
	return base64.URLEncoding.EncodeToString([]byte(name))
}
