package tables

type Ingredient struct {
	Name string
}

func (_ Ingredient) StructName() string {
	return "Ingredient"
}