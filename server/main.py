import io

from fastapi import FastAPI, Response
from utils import get_pallete_image, generate_palette

app = FastAPI()


@app.get(
    "/",
    responses={200: {"content": {"image/png": {}}}},
    response_class=Response,
)
async def get_image(width: int = 600, height: int = 400):
    pallete = await generate_palette()
    image_pallete = get_pallete_image(pallete, width, height)
    image: io.BytesIO = io.BytesIO()

    image_pallete.save(image, format="PNG")
    image: bytes = image.getvalue()

    return Response(content=image, media_type="image/png")
