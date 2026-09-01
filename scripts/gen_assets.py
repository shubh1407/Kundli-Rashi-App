"""Generate the 4 Daily Rashifal PNG assets (icon, adaptive icon, splash, favicon).

Pixels are drawn with Pillow, then encoded to PNG manually with zlib + struct
(no PIL encoder involved) as required by the project spec.
"""
import math
import os
import random
import struct
import zlib

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets")

GOLD = (245, 158, 11)
GOLD_LT = (251, 191, 36)
BG_TOP = (10, 10, 26)
BG_MID = (26, 26, 62)
BG_BOT = (15, 15, 46)

DEV_BOLD = "/usr/share/fonts/truetype/noto/NotoSansDevanagari-Bold.ttf"
DEV_REG = "/usr/share/fonts/truetype/noto/NotoSansDevanagari-Regular.ttf"

PNG_MAGIC = b"\x89PNG\r\n\x1a\n"


def save_png(path, img):
    """Encode an RGBA image with a hand-rolled zlib PNG writer."""
    img = img.convert("RGBA")
    w, h = img.size
    data = img.tobytes()
    stride = w * 4
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        raw += data[y * stride:(y + 1) * stride]

    def chunk(tag, payload):
        block = struct.pack(">I", len(payload)) + tag + payload
        block += struct.pack(">I", zlib.crc32(tag + payload) & 0xFFFFFFFF)
        return block

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(bytes(raw), 9))
    png += chunk(b"IEND", b"")
    with open(path, "wb") as fh:
        fh.write(png)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient_bg(w, h, top=BG_TOP, mid=BG_MID, bot=BG_BOT):
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        t = y / max(1, h - 1)
        c = lerp(top, mid, t * 2) if t < 0.5 else lerp(mid, bot, (t - 0.5) * 2)
        for x in range(w):
            px[x, y] = c
    return img


def add_glow(img, cx, cy, radius, color=(124, 58, 237), strength=120):
    glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse(
        [cx - radius, cy - radius, cx + radius, cy + radius],
        fill=(color[0], color[1], color[2], strength),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(radius / 2.4))
    return Image.alpha_composite(img.convert("RGBA"), glow)


def sparkle(draw, cx, cy, radius, points=8, color=GOLD, sharpness=6.0, alpha=255):
    """Pointed n-spoke star polygon."""
    steps = points * 48
    verts = []
    for i in range(steps):
        theta = (i / steps) * 2 * math.pi
        spike = 0.09 + 0.91 * (abs(math.cos(points * theta / 2)) ** sharpness)
        r = radius * spike
        verts.append((cx + r * math.sin(theta), cy - r * math.cos(theta)))
    draw.polygon(verts, fill=color + (alpha,))


def dot(draw, x, y, r, color=GOLD_LT, alpha=220):
    draw.ellipse([x - r, y - r, x + r, y + r], fill=color + (alpha,))


def scatter_stars(draw, w, h, count=42, seed=11, max_r=5):
    rng = random.Random(seed)
    for _ in range(count):
        x = rng.uniform(0, w)
        y = rng.uniform(0, h)
        r = rng.uniform(1.2, max_r)
        a = rng.randint(70, 210)
        if rng.random() > 0.75:
            sparkle(draw, x, y, r * 2.4, points=4, sharpness=8.0, alpha=a)
        else:
            dot(draw, x, y, r, GOLD_LT, a)


def ring(draw, cx, cy, radius, width, color=GOLD, alpha=255):
    draw.ellipse(
        [cx - radius, cy - radius, cx + radius, cy + radius],
        outline=color + (alpha,),
        width=int(width),
    )


def build_icon(size=1024, transparent=False):
    if transparent:
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    else:
        img = gradient_bg(size, size).convert("RGBA")
        img = add_glow(img, size // 2, int(size * 0.47), int(size * 0.42), (124, 58, 237), 130)

    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx = cy = size / 2

    if not transparent:
        scatter_stars(d, size, size, count=46, seed=11, max_r=size / 260)

    R = size * (0.30 if transparent else 0.335)
    ring(d, cx, cy, R, size * 0.028, GOLD, 255)
    ring(d, cx, cy, R * 0.9, size * 0.006, GOLD_LT, 170)

    sparkle(d, cx, cy, R * 0.78, points=8, sharpness=5.5)
    sparkle(d, cx, cy, R * 0.44, points=8, sharpness=3.0, color=GOLD_LT)

    for angle, rr in ((-58, 1.28), (34, 1.3), (150, 1.24), (215, 1.3)):
        ax = cx + R * rr * math.cos(math.radians(angle))
        ay = cy + R * rr * math.sin(math.radians(angle))
        sparkle(d, ax, ay, size * 0.028, points=4, sharpness=7.0, color=GOLD_LT)

    return Image.alpha_composite(img, layer)


def build_splash(size=1024):
    img = gradient_bg(size, size, (8, 8, 20), (23, 23, 54), (10, 10, 26)).convert("RGBA")
    img = add_glow(img, size // 2, int(size * 0.38), int(size * 0.40), (124, 58, 237), 120)

    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    scatter_stars(d, size, size, count=60, seed=5, max_r=size / 300)

    cx = size / 2
    ring(d, cx, size * 0.30, size * 0.13, size * 0.014)
    ring(d, cx, size * 0.30, size * 0.112, size * 0.004, GOLD_LT, 160)
    sparkle(d, cx, size * 0.30, size * 0.105, points=8, sharpness=5.5)

    hi = ImageFont.truetype(DEV_BOLD, int(size * 0.085))
    en = ImageFont.truetype(DEV_REG, int(size * 0.038))

    def center_text(y, text, font, fill):
        box = d.textbbox((0, 0), text, font=font)
        w = box[2] - box[0]
        d.text((cx - w / 2, y), text, font=font, fill=fill)

    center_text(size * 0.47, "दैनिक राशिफल", hi, GOLD_LT + (255,))
    center_text(size * 0.60, "DAILY  RASHIFAL", en, (244, 242, 255, 200))
    d.line(
        [(size * 0.32, size * 0.685), (size * 0.68, size * 0.685)],
        fill=GOLD + (150,),
        width=int(size * 0.004),
    )
    tag = ImageFont.truetype(DEV_REG, int(size * 0.030))
    center_text(size * 0.70, "हर दिन, आपके सितारों का हल", tag, (163, 160, 204, 220))

    return Image.alpha_composite(img, layer)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)

    icon = build_icon(1024, transparent=False)
    save_png(os.path.join(OUT, "icon.png"), icon)

    adaptive = build_icon(1024, transparent=True)
    save_png(os.path.join(OUT, "adaptive-icon.png"), adaptive)

    splash = build_splash(1024)
    save_png(os.path.join(OUT, "splash.png"), splash)

    favicon = icon.resize((96, 96), Image.LANCZOS)
    save_png(os.path.join(OUT, "favicon.png"), favicon)

    for name in ("icon.png", "adaptive-icon.png", "splash.png", "favicon.png"):
        path = os.path.join(OUT, name)
        with open(path, "rb") as fh:
            head = fh.read(8)
        ok = head == PNG_MAGIC
        print(f"{name}: {os.path.getsize(path)} bytes, png_ok={ok}")
