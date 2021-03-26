package tables

type User struct {
	ID uint64 `gorm:"autoIncrement"`
	Name string `gorm:"not null" json:"name"`
	Email string `gorm:"unique;not null" json:"email"`
}

func (_ User) StructName() string {
	return "User"
}