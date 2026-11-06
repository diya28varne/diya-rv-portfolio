"""Build Diya's one-page A4 resume PDF + preview PNGs."""
from pathlib import Path
import json

import numpy as np
import pypdfium2 as pdfium
from PIL import Image
from pypdf import PdfReader
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "Diya-RV-Resume.pdf"
PREV = ROOT / "public" / "resume"

pdfmetrics.registerFont(TTFont("Calibri", "C:/Windows/Fonts/calibri.ttf"))
pdfmetrics.registerFont(TTFont("Calibri-Bold", "C:/Windows/Fonts/calibrib.ttf"))
pdfmetrics.registerFont(TTFont("Calibri-Italic", "C:/Windows/Fonts/calibrii.ttf"))

BLACK = HexColor("#000000")
BODY = HexColor("#1a1a1a")
LINE = HexColor("#222222")

PROFILE = (
    "I am a final-year B.E. undergraduate student in Information Science and Engineering at MVJ College of Engineering, "
    "with a strong interest in software development, problem-solving, and debugging. "
    "I enjoy working with Java, AI/ML, and SQL, and applying my knowledge to develop practical solutions. "
    "A proactive learner and problem solver who enjoys taking initiative, adapting to new technologies, and contributing to team success. "
    "Seeking an opportunity to apply my technical skills, gain industry experience, and contribute to impactful projects. "
    "Outside academics, I enjoy acting, fashion and editorial modelling, playing basketball and badminton, and travelling."
)

EDUCATION = [
    ("BE in Information Science", "2023 – Present  ·  GPA 8.5/10", "MVJ College of Engineering, Bangalore"),
    ("12th (PUC)", "2023  ·  89%", "Mount Carmel PU College"),
    ("10th (SSLC)", "2021  ·  96.16%", "Gulabi Girls High School"),
]

SKILLS = [
    ("Languages", "Java, C++, JavaScript, TypeScript, HTML, CSS, SQL, Python"),
    ("Frontend", "React, Next.js, Tailwind CSS"),
    ("Backend & Data", "FastAPI, REST APIs, SQLite, PostgreSQL, Redis"),
    ("Tools", "Vercel, Git, GitHub, VS Code"),
    ("Soft Skills", "Communication, Leadership Mindset, Problem Solving, Team Collaboration"),
]

CERTS = [
    "NPTEL – Problem Solving Through Programming in Java",
    "Simplilearn – Cloud Computing",
    "JPMorganChase Software Engineering Job Simulation on Forage – May 2025",
]

PROJECTS = [
    (
        "ThreatLens",
        "Python, FastAPI, scikit-learn, SQLite, React",
        "Explainable hybrid intrusion detector for network flows: a supervised model and an anomaly model score the same record, then a decision layer turns that into a priority and a reason so the investigation can be replayed.",
        "Built Random Forest + Isolation Forest scoring with FastAPI predict/alert/history endpoints, SQLite alert storage, and a React dashboard for overview and traffic analysis on a documented CICIDS2017 holdout.",
        "https://github.com/diya28varne/IDS",
        "https://threatlens-ids.vercel.app/",
    ),
    (
        "RefMind",
        "React, Vite, FastAPI, IBM Granite",
        "Explainable referee-decision demo for the IBM SkillsBuild AI Builders Challenge where a fan votes first, then sees the rule, camera view, and why disagreement can remain.",
        "Built a React/Vite frontend and FastAPI backend that grounds explanations in IFAB laws with IBM Granite tooling, including a demo path that runs without API keys.",
        "https://github.com/diya28varne/hands-on-labs",
        "https://hands-on-labs.vercel.app/?demo=wc1986-hand-of-god",
    ),
    (
        "CrimeLens AI",
        "Next.js, TypeScript, FastAPI, PostgreSQL, Redis",
        "Decision-support console for reading incidents spatially with maps, prediction, network views, and written briefings, keeping a person in the loop before anyone acts on a score.",
        "Built a Next.js console and FastAPI service with PostgreSQL/PostGIS + Redis, JWT role scoping by district or station, and an English/Kannada interface.",
        "https://github.com/diya28varne/CrimeLens-ai",
        "https://crimelens-ai-phi.vercel.app/",
    ),
]

ACHIEVEMENTS = [
    "Top 15 at RIFT '26 Hackathon; Final Round at INCEPTRIX (Jain FET); 2nd runner-up at the Ratefluencer National Level AI Hackathon with Team ciphers_2.0",
    "Directed Project Expo and Tech Project Fest, coordinating logistics and showcasing student projects on campus",
    "3-time college-level national short film winner with Raagabhinaya",
]


def wrap(c, text, font, size, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if c.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def build(scale=1.12, gap=1.0):
    """scale bumps fonts; gap multiplies section breathing room. Returns final y."""
    W, H = A4
    c = canvas.Canvas(str(OUT), pagesize=A4)
    left = 0.55 * inch
    right = W - 0.55 * inch
    width = right - left
    bottom = 0.38 * inch

    name_sz = 25 * scale
    title_sz = 11.2 * scale
    contact_sz = 9.8 * scale
    head_sz = 13.2 * scale
    body = 10.6 * scale
    label_sz = 11.2 * scale
    lh = 12.6 * scale
    sec = 6.5 * gap * scale

    y = H - 0.34 * inch

    def heading(text, y):
        c.setFillColor(BLACK)
        c.setFont("Calibri-Bold", head_sz)
        c.drawString(left, y, text)
        y -= 5 * scale
        c.setStrokeColor(LINE)
        c.setLineWidth(0.95)
        c.line(left, y, right, y)
        return y - 12 * scale

    c.setFillColor(BLACK)
    c.setFont("Calibri-Bold", name_sz)
    c.drawCentredString(W / 2, y, "DIYA R V")
    y -= 16 * scale

    c.setFont("Calibri", title_sz)
    c.setFillColor(BODY)
    c.drawCentredString(W / 2, y, "Software Developer | AI & Full-Stack Enthusiast")
    y -= 14.5 * scale

    def draw_contact_row(items, y, size):
        parts = []
        for i, (lab, val) in enumerate(items):
            parts.append((lab, val))
            if i < len(items) - 1:
                parts.append((" | ", None))
        total = sum(
            c.stringWidth(lab, "Calibri", size)
            + (c.stringWidth(val, "Calibri-Bold", size) if val else 0)
            for lab, val in parts
        )
        # Shrink until the row fits inside the page margins.
        while total > width and size > 7.5:
            size -= 0.2
            total = sum(
                c.stringWidth(lab, "Calibri", size)
                + (c.stringWidth(val, "Calibri-Bold", size) if val else 0)
                for lab, val in parts
            )
        x = (W - total) / 2
        for lab, val in parts:
            if val is None:
                c.setFont("Calibri", size)
                c.setFillColor(BODY)
                c.drawString(x, y, lab)
                x += c.stringWidth(lab, "Calibri", size)
            else:
                c.setFont("Calibri", size)
                c.setFillColor(BODY)
                c.drawString(x, y, lab)
                x += c.stringWidth(lab, "Calibri", size)
                c.setFont("Calibri-Bold", size)
                c.drawString(x, y, val)
                x += c.stringWidth(val, "Calibri-Bold", size)
        return y - (contact_sz + 3.5)

    y = draw_contact_row(
        [
            ("Phone: ", "+91 6366100546"),
            ("Email: ", "diyavarne28@gmail.com"),
        ],
        y,
        contact_sz,
    )
    # Second contact row: LinkedIn | GitHub | Portfolio (clickable, same layout as reference).
    contact2 = [
        ("LinkedIn: ", "linkedin.com/in/diya-varne-375422351", "https://www.linkedin.com/in/diya-varne-375422351"),
        ("GitHub: ", "github.com/diya28varne", "https://github.com/diya28varne"),
        # Live site until diyarv.me is purchased + DNS is connected.
        ("Portfolio: ", "diya-rv-portfolio.vercel.app", "https://diya-rv-portfolio.vercel.app"),
    ]
    size2 = contact_sz
    parts2 = []
    for i, (lab, val, _url) in enumerate(contact2):
        parts2.append((lab, val, _url))
        if i < len(contact2) - 1:
            parts2.append((" | ", None, None))
    total2 = sum(
        c.stringWidth(lab, "Calibri", size2)
        + (c.stringWidth(val, "Calibri-Bold", size2) if val else 0)
        for lab, val, _ in parts2
    )
    while total2 > width and size2 > 7.5:
        size2 -= 0.2
        total2 = sum(
            c.stringWidth(lab, "Calibri", size2)
            + (c.stringWidth(val, "Calibri-Bold", size2) if val else 0)
            for lab, val, _ in parts2
        )
    x2 = (W - total2) / 2
    for lab, val, url in parts2:
        if val is None:
            c.setFont("Calibri", size2)
            c.setFillColor(BODY)
            c.drawString(x2, y, lab)
            x2 += c.stringWidth(lab, "Calibri", size2)
        else:
            c.setFont("Calibri", size2)
            c.setFillColor(BODY)
            c.drawString(x2, y, lab)
            x2 += c.stringWidth(lab, "Calibri", size2)
            c.setFont("Calibri-Bold", size2)
            c.setFillColor(BLACK)
            c.drawString(x2, y, val)
            vw = c.stringWidth(val, "Calibri-Bold", size2)
            c.linkURL(url, (x2 - 1, y - 2, x2 + vw + 1, y + size2 + 1), relative=0, thickness=0)
            x2 += vw
    y -= contact_sz + 3.5
    c.setFillColor(BODY)
    y -= 6 * scale + sec * 0.35

    y = heading("PROFILE", y)
    c.setFont("Calibri", body)
    c.setFillColor(BODY)
    for line in wrap(c, PROFILE, "Calibri", body, width):
        c.drawString(left, y, line)
        y -= lh
    y -= sec

    y = heading("EDUCATION", y)
    for title, meta, school in EDUCATION:
        c.setFont("Calibri-Bold", label_sz)
        c.setFillColor(BODY)
        c.drawString(left, y, title)
        c.setFont("Calibri", body)
        c.drawRightString(right, y, meta)
        y -= lh + 0.8 * scale
        c.setFont("Calibri-Italic", body)
        c.drawString(left, y, school)
        y -= lh + 3.2 * scale
    y -= sec * 0.35

    y = heading("SKILLS", y)
    for label, items in SKILLS:
        c.setFont("Calibri-Bold", label_sz)
        c.setFillColor(BODY)
        c.drawString(left, y, label)
        c.setFont("Calibri", body)
        c.drawString(left + 102 * scale, y, items)
        y -= lh + 1.8 * scale
    y -= sec * 0.35

    y = heading("CERTIFICATIONS", y)
    c.setFont("Calibri", body)
    c.setFillColor(BODY)
    for item in CERTS:
        c.drawString(left, y, "•  " + item)
        y -= lh + 1.2 * scale
    y -= sec * 0.35

    y = heading("PROJECTS", y)

    def bullet(text, github=None, demo=None):
        nonlocal y
        c.setFont("Calibri", body)
        c.setFillColor(BODY)
        gh = " GitHub"
        sep = " | "
        dm = "Demo"
        link_w = 0
        if github and demo:
            link_w = (
                c.stringWidth(gh, "Calibri-Bold", body)
                + c.stringWidth(sep, "Calibri", body)
                + c.stringWidth(dm, "Calibri-Bold", body)
            )
        lines = wrap(c, "•  " + text, "Calibri", body, width - (link_w + 6 if link_w else 0))
        for i, line in enumerate(lines):
            c.setFont("Calibri", body)
            c.drawString(left, y, line)
            if github and demo and i == len(lines) - 1:
                x = left + c.stringWidth(line, "Calibri", body)

                def draw_link(label, url, x0):
                    c.setFont("Calibri-Bold", body)
                    c.setFillColor(BLACK)
                    c.drawString(x0, y, label)
                    w = c.stringWidth(label, "Calibri-Bold", body)
                    # Generous hit box so clicks register in Chrome's PDF viewer.
                    c.linkURL(
                        url,
                        (x0 - 1, y - 3, x0 + w + 1, y + body + 1),
                        relative=0,
                        thickness=0,
                    )
                    return x0 + w

                x = draw_link(gh, github, x)
                c.setFont("Calibri", body)
                c.setFillColor(BODY)
                c.drawString(x, y, sep)
                x += c.stringWidth(sep, "Calibri", body)
                draw_link(dm, demo, x)
                c.setFillColor(BODY)
            y -= lh - 0.4 * scale
        return y

    for title, stack, b1, b2, github, demo in PROJECTS:
        c.setFont("Calibri-Bold", label_sz)
        c.setFillColor(BODY)
        c.drawString(left, y, title)
        c.setFont("Calibri-Italic", body)
        c.drawRightString(right, y, stack)
        y -= lh + 0.8 * scale
        bullet(b1)
        bullet(b2, github=github, demo=demo)
        y -= 4.5 * scale + sec * 0.25

    y = heading("ACHIEVEMENTS", y)
    c.setFont("Calibri", body)
    c.setFillColor(BODY)
    for item in ACHIEVEMENTS:
        for i, line in enumerate(wrap(c, item, "Calibri", body, width - 14)):
            c.drawString(left, y, ("•  " if i == 0 else "   ") + line)
            y -= lh - 0.2 * scale
        y -= 3.2 * scale
    y -= sec * 0.45

    y = heading("LANGUAGE", y)
    c.setFont("Calibri", body)
    c.setFillColor(BODY)
    c.drawString(left, y, "English, Hindi, Kannada")
    c.save()
    return y, bottom


def main():
    # Prefer larger type; nudge gap so Language sits near the bottom without overflowing.
    best = None
    for scale in (1.12, 1.10, 1.08, 1.06, 1.05, 1.04, 1.03, 1.02, 1.0):
        y_tight, bottom = build(scale=scale, gap=0.25)
        if y_tight < bottom:
            continue
        lo, hi = 0.25, 2.8
        fit = None
        for _ in range(18):
            mid = (lo + hi) / 2
            y, bottom = build(scale=scale, gap=mid)
            if y < bottom:
                hi = mid
            else:
                lo = mid
                fit = (scale, mid, y)
        if fit:
            best = fit
            if fit[2] - bottom < 22:
                break

    if best is None:
        raise SystemExit("Could not fit resume on one page")

    scale, gap, y = best
    y, bottom = build(scale=scale, gap=gap)
    print(f"scale={scale:.3f} gap={gap:.3f} final_y={y:.1f} bottom={bottom:.1f}")

    PREV.mkdir(parents=True, exist_ok=True)
    pil = pdfium.PdfDocument(str(OUT))[0].render(scale=2).to_pil()
    pil.save(PREV / "page-1.png", "PNG", optimize=True)
    pil.save(PREV / "scroll.png", "PNG", optimize=True)

    # Overlay hit-boxes for the PNG preview (avoids Chrome's PDF toolbar UI).
    page_w, page_h = A4
    links = []
    for annot in PdfReader(str(OUT)).pages[0]["/Annots"]:
        obj = annot.get_object()
        action = obj.get("/A") or {}
        uri = action.get("/URI")
        if not uri:
            continue
        x1, y1, x2, y2 = [float(v) for v in obj["/Rect"]]
        links.append(
            {
                "href": str(uri),
                "left": round(x1 / page_w * 100, 3),
                "top": round((page_h - y2) / page_h * 100, 3),
                "width": round((x2 - x1) / page_w * 100, 3),
                "height": round((y2 - y1) / page_h * 100, 3),
            }
        )
    (PREV / "links.json").write_text(json.dumps(links, indent=2), encoding="utf-8")

    arr = np.array(pil.convert("L"))
    rows = (arr < 250).any(axis=1)
    last = int(np.where(rows)[0].max())
    print(
        "pages 1 | last content row",
        last,
        "of",
        arr.shape[0],
        "| empty bottom %",
        round((arr.shape[0] - last) / arr.shape[0] * 100, 1),
    )
    print("preview links", len(links))


if __name__ == "__main__":
    main()
