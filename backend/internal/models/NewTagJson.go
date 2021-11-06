package models

type NewTagJson struct {
	Name        string     `json:"name" binding:"required"`
	Description string     `json:"description"`
	Color       *ColorJson `json:"color" binding:"required"`
}

type ColorJson struct {
	R *uint8 `json:"r" binding:"required"`
	G *uint8 `json:"g" binding:"required"`
	B *uint8 `json:"b" binding:"required"`
}
