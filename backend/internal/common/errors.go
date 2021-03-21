package common

import "errors"

var ErrRowAlreadyExists = errors.New("rowAlreadyExists")
var ErrNoSuchRecipe = errors.New("noSuchRecipe")