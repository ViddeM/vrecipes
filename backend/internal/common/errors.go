package common

import "errors"

var RowAlreadyExists = errors.New("rowAlreadyExists")
var NoSuchRecipe = errors.New("noSuchRecipe")