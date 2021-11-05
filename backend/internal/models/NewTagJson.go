package models

type NewTagJson struct {
	Name        string    `json:"name" validate:"required"`
	Description string    `json:"description"`
	Color       ColorJson `json:"color" validate:"required"`
}

type ColorJson struct {
	R uint8 `json:"r" validate:"required"`
	G uint8 `json:"g" validate:"required"`
	B uint8 `json:"b" validate:"required"`
}
