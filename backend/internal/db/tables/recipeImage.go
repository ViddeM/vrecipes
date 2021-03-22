package tables

type RecipeImage struct {
	Image *Image
	ImageID uint64 `gorm:"primaryKey"`
	Recipe *Recipe
	RecipeID uint64 `gorm:"primaryKey"`
}

func (_ RecipeImage) StructName() string {
	return "Recipe Image"
}