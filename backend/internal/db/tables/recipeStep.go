package tables

type RecipeStep struct {
	RecipeID uint64
	Number uint16
	Step string
}

func (_ RecipeStep) StructName() string {
	return "Recipe Step"
}