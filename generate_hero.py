import random
import math
from PIL import Image, ImageDraw, ImageFilter

W, H = 2400, 1200
random.seed(42)

BLU = (26, 127, 212)
ARANCIO = (245, 166, 35)
MAGENTA = (232, 53, 122)
NERO = (10, 10, 10)

img = Image.new('RGB', (W, H), NERO)
draw = ImageDraw.Draw(img)

# 1. Griglia digitale — solo a destra, sottilissima
for i in range(int(W*0.35), W, 90):
    fade = (i - W*0.35) / (W*0.65)
    alpha = int(18 * fade)
    draw.line([(i, 0), (i, H)], fill=(BLU[0], BLU[1], BLU[2], alpha), width=1)
for j in range(0, H, 90):
    draw.line([(int(W*0.35), j), (W, j)], fill=(BLU[0], BLU[1], BLU[2], 6), width=1)

# 2. Particelle luminose (solo destra, più dense)
np = 500
for _ in range(np):
    x = random.randint(int(W*0.4), W)
    y = random.randint(0, H)
    r = random.choice([1,1,1,2,2,3])
    color = random.choice([BLU, ARANCIO, MAGENTA, BLU, BLU])
    bright = random.uniform(0.5, 1.0)
    c = tuple(int(ch * bright) for ch in color)
    draw.ellipse([x-r, y-r, x+r, y+r], fill=c)

# 3. Flussi orizzontali di dati
n_flows = 100
for _ in range(n_flows):
    x0 = random.randint(int(W*0.4), W)
    y0 = random.randint(0, H)
    length = random.randint(80, 300)
    y_off = random.uniform(-30, 30)
    x1 = x0 + length
    y1 = y0 + y_off
    color = random.choice([BLU, ARANCIO])
    bright = random.uniform(0.35, 0.9)
    c = tuple(int(ch * bright) for ch in color)
    w = random.choice([1,1,2])
    draw.line([(x0, y0), (x1, y1)], fill=c, width=w)

# 4. Onde sinusoidali
for wi in range(10):
    y_base = int(H * (0.1 + wi * 0.09))
    amp = random.randint(40, 80)
    freq = random.uniform(0.002, 0.005)
    phase = random.uniform(0, math.pi*2)
    color = random.choice([BLU, ARANCIO, MAGENTA])
    bright = random.uniform(0.35, 0.8)
    c = tuple(int(ch * bright) for ch in color)
    pts = []
    for x in range(int(W*0.35), W, 5):
        y = y_base + amp * math.sin(freq * x + phase)
        pts.append((x, y))
    for i in range(len(pts)-1):
        draw.line([pts[i], pts[i+1]], fill=c, width=2)

# 5. Nodi di connessione
n_nodes = 22
for _ in range(n_nodes):
    x = random.randint(int(W*0.55), W)
    y = random.randint(0, H)
    r = random.randint(25, 60)
    color = random.choice([BLU, ARANCIO])
    bright = random.uniform(0.25, 0.6)
    c = tuple(int(ch * bright) for ch in color)
    draw.ellipse([x-r, y-r, x+r, y+r], outline=c, width=1)
    r2 = max(3, r//5)
    draw.ellipse([x-r2, y-r2, x+r2, y+r2], fill=c)

# 6. Raggi radiali diffusi a destra
for cx, cy in [(int(W*0.85), int(H*0.35)), (int(W*0.78), int(H*0.65))]:
    for i in range(30):
        angle = random.uniform(0, math.pi*2)
        li = random.randint(60, 120)
        lo = random.randint(180, 400)
        x0 = cx + li * math.cos(angle)
        y0 = cy + li * math.sin(angle)
        x1 = cx + lo * math.cos(angle)
        y1 = cy + lo * math.sin(angle)
        color = random.choice([BLU, ARANCIO])
        bright = random.uniform(0.2, 0.5)
        c = tuple(int(ch * bright) for ch in color)
        draw.line([(x0, y0), (x1, y1)], fill=c, width=1)

# 7. Overlay scuro a sinistra — NERO opaco che si dissolve
overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
fade_width = int(W * 0.62)
for x in range(fade_width):
    t = x / fade_width
    # Ease-out: inizia molto scuro e dissolve velocemente
    alpha = int(230 * (1 - t**0.7))
    od.line([(x, 0), (x, H)], fill=(10, 10, 10, alpha), width=1)

# Aggiungi una seconda banda nera pura a sinistra per garantire testo leggibile
for x in range(int(W*0.22)):
    od.line([(x, 0), (x, H)], fill=(10, 10, 10, 255), width=1)

# 8. Vignettatura
vig = Image.new('RGBA', (W, H), (0, 0, 0, 0))
vd = ImageDraw.Draw(vig)
for y in range(H):
    dy = abs(y - H/2) / (H/2)
    for x in range(0, W, 6):
        dx = abs(x - W/2) / (W/2)
        dist = math.sqrt(dx*dx + dy*dy)
        if dist > 0.6:
            alpha = int(40 * ((dist - 0.6) / 0.4))
            vd.line([(x, y), (x+5, y)], fill=(10, 10, 10, min(alpha, 50)))

img = img.convert('RGBA')
img = Image.alpha_composite(img, overlay)
img = Image.alpha_composite(img, vig)
img = img.convert('RGB')
img = img.filter(ImageFilter.GaussianBlur(radius=0.5))
img.save('assets/images/hero_bg_new.jpg', quality=92, optimize=True)
print("OK")
