package tables

type Unit struct {
	Name string `json:"name"`
}

func (_ Unit) StructName() string {
	return "Unit"
}