package common

type SuccessResponse struct {
	Success bool `json:"success"`
	Data interface{} `json:"data"`
}

type ErrorResponse struct {
	Success bool `json:"success"`
	Error string `json:"error"`
}

func Success(data interface{}) SuccessResponse {
	return SuccessResponse{
		Success: true,
		Data:    data,
	}
}

func Error(err string) ErrorResponse {
	return ErrorResponse{
		Success: false,
		Error:   err,
	}
}