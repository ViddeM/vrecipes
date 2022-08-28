package validation

import (
	"errors"
	"io"
	"mime/multipart"
	"net/http"
	"path/filepath"
	"strings"
)

type File struct {
	Name     string
	FileType string
	Size     int64
	Data     []byte
}

var ErrFiletypeNotSupported = errors.New("filetype not supported")
var ErrIncorrectContentType = errors.New("content-type does not match detected type")
var ErrFileSizeMissmatch = errors.New("data size doesn't match size given in header")

func ValidateFile(formFile *multipart.File, header *multipart.FileHeader) (*File, error) {
	data, err := io.ReadAll(*formFile)
	if err != nil {
		return nil, err
	}

	contentType := header.Header.Get("Content-Type")
	if int64(len(data)) != header.Size {
		return nil, ErrFileSizeMissmatch
	}

	file, err := validateFile(data, header.Filename, contentType)
	if err != nil {
		return nil, err
	}

	return file, nil
}

func ValidateImportFile(data []byte, fileName string, header http.Header) (*File, error) {
	contentType := header.Get("Content-Type")
	file, err := validateFile(data, contentType, fileName)
	if err != nil {
		return nil, err
	}

	return file, nil
}

func validateFile(data []byte, filePathName, contentType string) (*File, error) {
	detectedFiletype := http.DetectContentType(data)
	if detectedFiletype != contentType {
		return nil, ErrIncorrectContentType
	}

	if strings.Contains(contentType, "image/") == false &&
		contentType != "application/pdf" {
		return nil, ErrFiletypeNotSupported
	}

	extension := filepath.Ext(filePathName)
	fileName := filePathName[:len(filePathName)-len(extension)]
	return &File{
		Name:     fileName,
		FileType: extension,
		Size:     int64(len(data)),
		Data:     data,
	}, nil
}
