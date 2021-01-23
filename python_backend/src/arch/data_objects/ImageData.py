from dataclasses import dataclass
from uuid import UUID


@dataclass
class ImageData:
    id: UUID
    name: str
