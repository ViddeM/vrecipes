package common

import "errors"

var ErrNameTaken = errors.New("nameTaken")
var ErrNoSuchRecipe = errors.New("noSuchRecipe")
var ErrNoSuchTag = errors.New("noSuchTag")
var ErrExportDataNotFound = errors.New("exportDataNotFound")
