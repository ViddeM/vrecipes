package models


type DetailedRecipeJson struct {
	ID uint64                          `json:"id"`
	Name string                        `json:"name"`
	Description string                 `json:"description"`
	OvenTemperature int                `json:"ovenTemperature"`
	EstimatedTime int                  `json:"estimatedTime"`
	Steps []RecipeStepJson             `json:"steps"`
	Ingredients []RecipeIngredientJson `json:"ingredients"`
	Images []ImageJson                 `json:"images"`
}

type RecipeStepJson struct {
	Number uint16 `json:"number"`
	Description string `json:"description"`
}

type RecipeIngredientJson struct {
	Name string `json:"name"`
	Unit string `json:"unit"`
	Amount float32 `json:"amount"`
}

type ImageJson struct {
	Path string `json:"url"`
	ID   uint64 `json:"id"`
}

