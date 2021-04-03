package tables

type Image struct {
	ID uint64
	Name string
}

func (_ Image) StructName() string {
	return "Image"
}