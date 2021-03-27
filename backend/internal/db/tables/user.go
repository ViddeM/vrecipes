package tables

type User struct {
	ID uint64 `gorm:"autoIncrement"`
	Name string `gorm:"not null" json:"name"`
	Email string `gorm:"not null" json:"email"`
	Provider string `gorm:"not null;default:'unknown'"`

}

func (_ User) StructName() string {
	return "User"
}