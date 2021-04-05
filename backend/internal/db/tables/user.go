package tables

type User struct {
	ID uint64 `json:"id"`
	Name string `json:"name"`
}

func (_ User) StructName() string {
	return "User"
}