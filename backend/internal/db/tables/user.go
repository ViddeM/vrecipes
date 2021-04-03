package tables

type User struct {
	ID uint64
	Name string `json:"name"`
	Email string `json:"email"`
	Provider string

}

func (_ User) StructName() string {
	return "User"
}