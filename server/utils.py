import json

import aiohttp
from PIL import Image, ImageDraw


async def post(
        url: str, data: dict | str, session: aiohttp.ClientSession
) -> list[dict]:
    """Send post request with data to the url and read response"""

    async with session.post(url, data=data) as response:
        data = await response.read()
        return data


async def generate_palette() -> list[tuple[int, int, int]]:
    """Generate random pallete"""

    url = "http://colormind.io/api/"

    async with aiohttp.ClientSession() as session:
        response = await post(url, '{"model": "default"}', session)

        palette_json: dict[str, list[list[int]]] = json.loads(response)

        result = list(map(tuple, palette_json.get("result")))

        return result


def draw_rectangle(
        coords: tuple[int, int, int, int], fill: tuple[int, int, int], image: ImageDraw.Draw
) -> None:
    """Draw rectangle on the image"""

    image.rectangle(coords, fill=fill)


def rgb_to_hex(rgb: tuple[int, int, int]) -> str:
    """Rgb to hex"""

    return '%02x%02x%02x' % rgb


def get_pallete_image(colors: list[tuple[int, int, int]], width: int, height: int) -> Image:
    """Get pallete image from five colors"""

    img = Image.new("RGB", (width, height), "gray")
    image_draw = ImageDraw.Draw(img)
    col_w = width // 5

    for i in range(0, width, col_w):
        coords = (i, 0, i + col_w, height)
        fill = colors[i // col_w if i else 0]

        draw_rectangle(coords, fill, image_draw)

    return img


async def get_pallete(width: int, height: int) -> tuple[list[str], Image]:
    pallete = await generate_palette()
    img = get_pallete_image(pallete, width, height)

    return list(map(rgb_to_hex, pallete)), img
