package common

type SuccessResponse struct {
	Success bool `json:"success"`
	Data interface{} `json:"data"`
}

type ErrorResponse struct {
	Success bool `json:"success"`
	Error error `json:"error"`
}

func Success(data interface{}) SuccessResponse {
	return SuccessResponse{
		Success: true,
		Data:    data,
	}
}

func Error(err error) ErrorResponse {
	return ErrorResponse{
		Success: false,
		Error:   err,
	}
}