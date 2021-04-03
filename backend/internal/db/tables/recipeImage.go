package tables

type RecipeImage struct {
	ImageID uint64
	RecipeID uint64
}

func (_ RecipeImage) StructName() string {
	return "Recipe Image"
}