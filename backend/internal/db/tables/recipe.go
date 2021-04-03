package tables

type Recipe struct {
	ID uint64
	Name string
	UniqueName string
	Description string
	OvenTemp int
	EstimatedTime int
	Deleted bool
	CreatedBy uint64
}

func (_ Recipe) StructName() string {
	return "Recipe"
}