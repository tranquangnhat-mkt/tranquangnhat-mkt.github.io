#!/usr/bin/env python3
"""Normalize the six user-supplied asset packs for the static portfolio."""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT.parent / "work" / "v22-assets"
DEST_ROOT = ROOT / "assets" / "images" / "projects"

PROJECTS = {
    "epicure": "epicure-website-replatforming-v22",
    "events": "b2b-event-activation-v22",
    "ecommerce": "ecommerce-growth-v22",
    "smeg": "smeg-digital-brand-system-v22",
    "breville": "breville-christmas-challenge-v22",
    "affiliate": "saint-lbeau-v22",
}


def slugify(value: str) -> str:
    value = value.replace("Đ", "D").replace("đ", "d")
    value = unicodedata.normalize("NFKD", value)
    value = "".join(char for char in value if not unicodedata.combining(char))
    value = value.lower().replace("'", "").replace("&", " and ")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value


def has_white_background(image: Image.Image) -> bool:
    rgb = image.convert("RGB")
    width, height = rgb.size
    samples = [
        rgb.getpixel((0, 0)),
        rgb.getpixel((width - 1, 0)),
        rgb.getpixel((0, height - 1)),
        rgb.getpixel((width - 1, height - 1)),
    ]
    return sum(min(pixel) >= 235 and max(pixel) - min(pixel) <= 24 for pixel in samples) >= 3


def transparent_logo(source: Path, destination: Path) -> None:
    image = Image.open(source).convert("RGBA")
    if has_white_background(image):
        pixels = []
        for red, green, blue, alpha in image.getdata():
            near_white = min(red, green, blue) >= 235 and max(red, green, blue) - min(red, green, blue) <= 24
            pixels.append((red, green, blue, 0 if near_white else alpha))
        image.putdata(pixels)
    image.save(destination, "PNG", optimize=True)


def convert_photo(source: Path, destination: Path) -> None:
    image = Image.open(source)
    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGB")
    image.save(destination, "WEBP", quality=84, method=6)


def is_valid_image(path: Path) -> bool:
    if not path.exists() or path.stat().st_size == 0:
        return False
    try:
        with Image.open(path) as image:
            image.verify()
    except (OSError, SyntaxError):
        return False
    return True


def main() -> None:
    manifest: dict[str, dict[str, str]] = {}
    for source_group, destination_group in PROJECTS.items():
        source_dir = SOURCE_ROOT / source_group
        destination_dir = DEST_ROOT / destination_group
        destination_dir.mkdir(parents=True, exist_ok=True)
        project_manifest: dict[str, str] = {}
        for source in sorted(source_dir.iterdir(), key=lambda path: path.name.casefold()):
            if not source.is_file():
                continue
            is_logo = "logo" in source.stem.casefold()
            extension = ".png" if is_logo else ".webp"
            destination = destination_dir / f"{slugify(source.stem)}{extension}"
            if not is_valid_image(destination):
                if is_logo:
                    transparent_logo(source, destination)
                else:
                    convert_photo(source, destination)
            project_manifest[source.name] = destination.relative_to(ROOT).as_posix()
        manifest[source_group] = project_manifest

    manifest_path = ROOT / "assets" / "data" / "v22-assets.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
