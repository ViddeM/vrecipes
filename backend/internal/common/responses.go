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

var (
	ResponseRecipeNameExist      = "recipe_name_exists"
	ResponseFailedToCreateRecipe = "failed_to_create_recipe"
	ResponseRecipeNotFound       = "recipe_not_found"
	ResponseInvalidJson          = "invalid_json"
	ResponseMissingFile          = "missing_file"
	ResponseBadImage             = "bad_image"
	ResponseFailedToSaveImage    = "failed_to_save_image"
	ResponseFailedToRetrieveRecipes = "failed_to_retrieve_recipes"
	ResponseFailedToRetrieveRecipe = "failed_to_retrieve_recipe"
)
