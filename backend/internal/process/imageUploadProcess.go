package process

import (
	"encoding/base64"
	"fmt"
	"github.com/jackc/pgx/v4"
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

	img, err := uploadImage(tx, file)
	if err != nil {
		return nil, err
	}

	err = commands.CommitTransaction(tx)
	if err != nil {
		return nil, err
	}

	return img, nil
}

func uploadImage(tx pgx.Tx, file *validation.File) (*models.ImageJson, error) {
	fileName := generateImageName(file.Name)
	fileNameWithPath := fmt.Sprintf("%s%s", fileName, file.FileType)

	id, err := commands.CreateImage(tx, fileNameWithPath)
	if err != nil {
		return nil, err
	}

	uniqueFilename := fmt.Sprintf("%s_%s", id, fileNameWithPath)
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

	return &models.ImageJson{
		Path: uniqueFilename,
		ID:   id,
	}, nil
}

func generateImageName(name string) string {
	return base64.URLEncoding.EncodeToString([]byte(name))
}
