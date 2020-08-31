from typing import Tuple


class HttpResponse:
    def __init__(self, code: int = 200, error: str = None, data=None):
        self.code = code
        self.error = error
        self.data = data

    def get_response(self) -> Tuple[dict, int]:
        if self.code != 200 or self.error is not None:
            return {
                "data": {},
                "error": {
                    "isError": True,
                    "message": self.error
                }
            }, self.code

        return {
            "data": self.data,
            "error": {
                "isError": False,
                "message": ""
            }
        }, 200


def get_with_error(code: int, error: str):
    return HttpResponse(code=code, error=error)


def get_with_data(data: dict):
    return HttpResponse(data=data)
