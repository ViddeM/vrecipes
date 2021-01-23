from uuid import UUID

from werkzeug.datastructures import FileStorage

from arch.command.ImageCommands import add_image
from arch.query.ConfigQueries import get_config
from arch.query.ImageQueries import get_image_url
from response_messages import MISSING_FILE, FAILED_TO_SAVE_IMAGE
from response_with_data import HttpResponse, get_with_error, get_with_data


def handle_uploaded_images(files: dict) -> HttpResponse:
    if "file" not in files:
        return get_with_error(400, MISSING_FILE)

    file = files["file"]
    image_id = handle_image(file)
    image_url = get_image_url(image_id)
    if image_url is None:
        return get_with_error(500, FAILED_TO_SAVE_IMAGE)

    return get_with_data({
        "image_id": str(image_id),
        "image_url": image_url
    })


def handle_image(image: FileStorage) -> UUID:
    image_data = add_image(image.filename)
    base_path = get_config("image_base_path")
    save_path = f"{base_path}/{image_data.id}_{image_data.name}"
    print(f"Saving file {image.filename} to {save_path}")
    image.save(save_path)
    return image_data.id
