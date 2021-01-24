from dataclasses import dataclass
from typing import List, Generic, TypeVar

T = TypeVar("T")


@dataclass
class ResultWithData(Generic[T]):
    data: T
    is_error: bool
    message: str


def get_result_with_data(data: T) -> ResultWithData:
    return ResultWithData(data=data, is_error=False, message="")


def get_result_with_error(error: str) -> ResultWithData:
    return ResultWithData(data=None, is_error=True, message=error)
