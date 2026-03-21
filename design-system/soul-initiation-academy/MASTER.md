# Design System Master File (B&W Luxury)

> **LOGIC:** This file defines the global design language for Soul Initiation Academy.
> Following the B&W/Greyscale preference and "UI/UX Pro Max" best practices.

---

**Project:** Soul Initiation Academy
**Theme:** Luxury B&W / Greyscale Premium
**Style:** Liquid Glass

---

## Global Rules

### Color Palette (Strict Greyscale)

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#000000` | `--ink` |
| Text | `#111111` | `--text-primary` |
| Secondary | `#444444` | `--text-secondary` |
| Accent/Border | `#D1D1D1` | `--border-light` |
| Background | `#FFFFFF` | `--bg-primary` |
| Surface/Cream | `#F5F5F5` | `--bg-secondary` |
| Contrast | `#FFFFFF` | `--white` |

**Color Notes:** High-contrast greyscale tones only. Focus on textures, overlays, and negative space to create depth.

### Typography (Luxury Serif + Sans)

- **Heading Font:** Cormorant Garamond
- **Body Font:** Jost/Montserrat
- **Mood:** luxury, high-end, fashion, elegant, refined, premium
- **Weights:** Use **600-700** for headlines to ensure they "pop" as requested.
- **Hierarchy:**
  - H1: Super oversized (8vw), tracking-tighter (-0.03em)
  - H2: Oversized (5vw)
  - H3: Medium (2.25rem)
  - Body: 1.125rem for clarity

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap');
```

---

## Typography Hierarchy & Bold Rules

- **Main Headlines**: Must use a text-shadow (`text-shadow: 0 4px 12px rgba(0,0,0,0.4)`) when placed over images to prevent "disappearing".
- **Sub-headlines**: Use `font-semibold` or `font-bold` to distinguish from body copy.
- **Body Copy**: Always use dark text on light backgrounds or vice versa. Avoid mid-tone greys for long text to ensure 4.5:1 contrast.

---

## Component Specs

### Buttons (High-Contrast)

```css
/* Primary Button (Black) */
.btn-primary {
  background: #000000;
  color: #FFFFFF;
  padding: 16px 32px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary:hover {
  background: #222222;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -5px rgba(0,0,0,0.3);
}

/* Secondary/Ghost Button (White) */
.btn-secondary {
  background: #FFFFFF;
  color: #000000;
  border: 1px solid #000000;
  padding: 16px 32px;
  font-weight: 700;
  letter-spacing: 0.25em;
  transition: all 400ms var(--expo);
}
```

### Overlays (Contrast Protection)

- **Hero Overlay**: `bg-gradient-to-b from-black/70 via-black/40 to-black/90`.
- **Image Gradient Overlays**: Always use black gradients on images where text is present.

---

## Anti-Patterns (Do NOT Use)

- ❌ **Colored text or backgrounds** (Except greyscale)
- ❌ **Low contrast text** (Maintain 4.5:1)
- ❌ **Thin fonts on busy images** — Use bold weights or overlays.
- ❌ **Emojis as icons**
- ❌ **Instant state changes**
