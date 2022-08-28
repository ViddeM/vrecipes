package common

import "errors"

var ErrNameTaken = errors.New("nameTaken")
var ErrNoSuchRecipe = errors.New("noSuchRecipe")
var ErrNoSuchRecipeBook = errors.New("noSuchRecipeBook")
var ErrNoSuchTag = errors.New("noSuchTag")
var ErrRedis = errors.New("redisError")
var ErrExportDataNotFound = errors.New("exportDataNotFound")
var ErrImportDataResponseErr = errors.New("importDataResponseError")
