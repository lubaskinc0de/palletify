import io

from fastapi import FastAPI
from utils import get_pallete

from fastapi.middleware.cors import CORSMiddleware

from base64 import b64encode

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def get_image(width: int = 600, height: int = 400):
    colors, pallete_img = await get_pallete(width, height)
    image: io.BytesIO = io.BytesIO()

    pallete_img.save(image, format="PNG")
    image: bytes = b64encode(image.getvalue())

    return {
        'image': image,
        'colors': colors,
    }
