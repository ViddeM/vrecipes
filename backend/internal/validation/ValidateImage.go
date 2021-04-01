package validation

import (
	"errors"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"path/filepath"
	"strings"
)

type File struct {
	Name string
	FileType string
	Size int64
	Data []byte
}

var ErrFiletypeNotSupported = errors.New("filetype not supported")
var ErrIncorrectContentType = errors.New("content-type does not match detected type")

func ValidateFile(file *multipart.File, header *multipart.FileHeader) (*File, error) {
	contentType := header.Header.Get("Content-Type")
	if strings.Contains(contentType, "image/") == false &&
		contentType != "application/pdf" {
		return nil, ErrFiletypeNotSupported
	}

	data, err := ioutil.ReadAll(*file)
	if err != nil {
		return nil, err
	}

	detectedFiletype := http.DetectContentType(data)
	if detectedFiletype != contentType {
		return nil, ErrIncorrectContentType
	}

	extension := filepath.Ext(header.Filename)
	fileName := header.Filename[:len(header.Filename) - len(extension)]
	return &File{
		Name:     fileName,
		FileType: extension,
		Size:     header.Size,
		Data:     data,
	}, nil
}