package tables

type RecipeBook struct {
	ID uint64
	Name string
	UniqueName string
	Author string
	CreatedBy uint64
	Deleted bool
}