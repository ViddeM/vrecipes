package common

type SuccessResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
}

type ErrorResponse struct {
	Success bool   `json:"success"`
	Error   string `json:"error"`
}

func Success(data interface{}) SuccessResponse {
	return SuccessResponse{
		Success: true,
		Data:    data,
	}
}

func Error(err string) ErrorResponse {
	return ErrorResponse{
		Success: false,
		Error:   err,
	}
}

const (
	ResponseRecipeNameExist             = "recipe_name_exists"
	ResponseFailedToCreateRecipe        = "failed_to_create_recipe"
	ResponseFailedToEditRecipe          = "failed_to_edit_recipe"
	ResponseRecipeNotFound              = "recipe_not_found"
	ResponseInvalidJson                 = "invalid_json"
	ResponseMissingFile                 = "missing_file"
	ResponseBadImage                    = "bad_image"
	ResponseFileTypeNotSupported        = "filetype_not_supported"
	ResponseFailedToSaveImage           = "failed_to_save_image"
	ResponseFailedToRetrieveRecipes     = "failed_to_retrieve_recipes"
	ResponseFailedToRetrieveRecipe      = "failed_to_retrieve_recipe"
	ResponseMalformedRecipeId           = "malformed_recipe_id"
	ResponseFailedToDeleteRecipe        = "failed_to_delete_recipe"
	ResponseFailedToDeleteRecipeBook    = "failed_to_delete_recipe_book"
	ResponseFailedToAuthenticate        = "failed_to_authenticate"
	ResponseInvalidUserId               = "invalid_user_id"
	ResponseNotAuthorized               = "not_authorized"
	ResponseIncorrectUser               = "incorrect_user"
	ResponseRecipeBookNameExists        = "recipe_book_name_exists"
	ResponseFailedToCreateRecipeBook    = "failed_to_create_recipe_book"
	ResponseFailedToRetrieveRecipeBooks = "failed_to_retrieve_recipe_books"
	ResponseRecipeBookNotFound          = "recipe_book_not_found"
	ResponseFailedToRetrieveRecipeBook  = "failed_to_retrieve_recipe_book"
	ResponseMalformedRecipeBookId       = "malformed_recipe_book_id"
	ResponseFailedToEditRecipeBook      = "failed_to_edit_recipe_book"
	ResponseTagNameTaken                = "tag_name_taken"
	ResponseFailedToCreateTag           = "failed_to_create_tag"
)
