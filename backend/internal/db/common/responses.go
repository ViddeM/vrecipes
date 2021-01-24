package common

type Response struct {
	Success bool `json:"success"`
	Data map[string]interface{} `json:"data"`
	Error string `json:"error"`
}
