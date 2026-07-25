#!/usr/bin/env python3
"""Generate web-sized gallery derivatives and rebuild assets/events/manifest.json.

Camera originals are 4000x3000 / ~5 MB each; serving them as grid tiles cost a
visitor ~1 GB to scroll one event. This produces two WebP renditions per photo —
a 640px grid thumbnail and a 1920px lightbox image — and writes the full-size
dimensions into the manifest so the lightbox can reserve space before decode.

Re-encoding also drops EXIF: the originals carry GPS coordinates and camera
serial data that must not ship to the browser.

Usage:
    python3 tools/build-gallery.py [--events-root assets/events] [--force]

Source photos are read from   assets/events/<event>/originals/
Derivatives are written to    assets/events/<event>/{thumb,full}/
"""

import argparse
import json
import os
import sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is required: pip install --user Pillow")

# Longest-edge box for each rendition. The grid renders tiles at most ~330 CSS px
# (1320px container, minmax(220px, 1fr)), so 640 covers a 2x display. The
# lightbox is viewport-bound, so 1920 covers a 1080p-class screen at 1x.
THUMB_EDGE = 640
FULL_EDGE = 1920
THUMB_QUALITY = 72
FULL_QUALITY = 80

SOURCE_DIR = "originals"
RENDITIONS = (("thumb", THUMB_EDGE, THUMB_QUALITY), ("full", FULL_EDGE, FULL_QUALITY))
SOURCE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def source_photos(event_dir):
    """Return sorted source filenames, rejecting stem collisions.

    Renditions are keyed by stem + '.webp', so 'IMG_1.JPG' and 'IMG_1.jpg' would
    silently overwrite each other. Fail loudly instead of dropping a photo.
    """
    src_dir = os.path.join(event_dir, SOURCE_DIR)
    if not os.path.isdir(src_dir):
        return src_dir, []

    names = []
    for name in os.listdir(src_dir):
        if name.startswith("."):
            continue
        if os.path.splitext(name)[1].lower() not in SOURCE_EXTENSIONS:
            continue
        if not os.path.isfile(os.path.join(src_dir, name)):
            continue
        names.append(name)

    by_stem = {}
    for name in names:
        by_stem.setdefault(os.path.splitext(name)[0].lower(), []).append(name)
    collisions = {stem: found for stem, found in by_stem.items() if len(found) > 1}
    if collisions:
        detail = "; ".join(f"{stem} <- {sorted(f)}" for stem, f in sorted(collisions.items()))
        raise SystemExit(f"Name collision in {src_dir}: {detail}")

    return src_dir, sorted(names, key=str.lower)


def render(image, out_path, edge, quality):
    """Write one WebP rendition bounded by `edge` on its longest side."""
    rendition = image.copy()
    rendition.thumbnail((edge, edge), Image.LANCZOS)
    # Pillow writes no EXIF for WebP unless it is passed explicitly, so the GPS
    # and camera metadata on the originals is dropped here.
    rendition.save(out_path, "WEBP", quality=quality, method=6)
    return rendition.size


def build_event(event_dir, force):
    src_dir, names = source_photos(event_dir)
    if not names:
        print(f"  no source photos in {src_dir}", file=sys.stderr)
        return []

    for rendition, _, _ in RENDITIONS:
        os.makedirs(os.path.join(event_dir, rendition), exist_ok=True)

    entries = []
    skipped = 0
    for name in names:
        out_name = os.path.splitext(name)[0] + ".webp"
        paths = {r: os.path.join(event_dir, r, out_name) for r, _, _ in RENDITIONS}

        if not force and all(os.path.exists(p) for p in paths.values()):
            with Image.open(paths["full"]) as done:
                entries.append({"file": out_name, "w": done.width, "h": done.height})
            skipped += 1
            continue

        with Image.open(os.path.join(src_dir, name)) as raw:
            # Phone and DSLR shots store rotation in EXIF; bake it into the pixels
            # so the browser does not have to honour an orientation tag we strip.
            image = ImageOps.exif_transpose(raw).convert("RGB")
            for rendition, edge, quality in RENDITIONS:
                size = render(image, paths[rendition], edge, quality)
                if rendition == "full":
                    entries.append({"file": out_name, "w": size[0], "h": size[1]})

    built = len(entries) - skipped
    print(f"  {len(entries)} photos ({built} built, {skipped} cached)")
    return entries


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--events-root", default=os.path.join("assets", "events"))
    parser.add_argument("--force", action="store_true", help="re-encode photos that already have derivatives")
    args = parser.parse_args()

    root = os.path.abspath(args.events_root)
    if not os.path.isdir(root):
        sys.exit(f"Events root not found: {root}")

    manifest = {}
    for event in sorted(os.listdir(root)):
        event_dir = os.path.join(root, event)
        if not os.path.isdir(event_dir) or event.startswith("."):
            continue
        print(f"{event}:")
        entries = build_event(event_dir, args.force)
        if entries:
            manifest[event] = entries

    manifest_path = os.path.join(root, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=2)
        handle.write("\n")
    print(f"\nwrote {manifest_path} ({len(manifest)} event(s))")


if __name__ == "__main__":
    main()
