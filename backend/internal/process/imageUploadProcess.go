package process

import (
	"fmt"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/models"
	"github.com/viddem/vrecipes/backend/internal/validation"
	"os"
)

func UploadImage(file *validation.File) (*ImageJson, error) {
	filenameWithPath := fmt.Sprintf("%s%s", file.Name, file.FileType)

	id, err := commands.CreateImage(&models.Image{
		Name: filenameWithPath,
	})
	if err != nil {
		return nil, err
	}

	uniqueFilename := fmt.Sprintf("%d_%s", id, filenameWithPath)
	folder := os.Getenv("image_folder")
	path := fmt.Sprintf("%s/%s", folder, uniqueFilename)
	newFile, err := os.Create(path)
	if err != nil {
		return nil, err
	}

	_, err = newFile.Write(file.Data)
	if err != nil {
		return nil, err
	}

	return &ImageJson{
		Path: uniqueFilename,
		ID:   id,
	}, err
}
