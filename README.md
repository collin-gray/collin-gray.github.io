# Foundry Print and Promo — Website

**foundryprintpromo.com**  
Built as a static single-page site. Hosted on GitHub Pages. No backend, no CMS, no build tools required.

---

## File Structure

```
foundryprintpromo/
├── index.html              ← Main page (all sections)
├── css/
│   └── styles.css          ← All styles and design tokens
├── js/
│   └── script.js           ← Navigation, scroll, animations
├── assets/
│   ├── Primary Light.svg   ← Logo (REQUIRED — place here)
│   ├── favicon.ico         ← Browser tab icon (optional)
│   └── work-1.jpg          ← Featured work photos (replace with real images)
│   └── work-2.jpg
│   └── work-3.jpg
│   └── work-4.jpg
└── README.md
```

---

## Hosting on GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (or create an account).
2. Click the **+** icon in the top right and choose **New repository**.
3. Name it exactly: `foundryprintpromo.com`  
   Or name it anything you want — it does not affect custom domain setup.
4. Set it to **Public**.
5. Click **Create repository**.

---

### Step 2 — Upload your files

**Option A — Upload via GitHub website (easiest)**

1. Open your new repository on GitHub.
2. Click **Add file > Upload files**.
3. Drag and drop the entire folder contents:
   - `index.html`
   - `css/` folder
   - `js/` folder
   - `assets/` folder
4. Scroll down and click **Commit changes**.

**Option B — Use Git (recommended for ongoing updates)**

```bash
# In your project folder:
git init
git add .
git commit -m "Initial site launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

### Step 3 — Enable GitHub Pages

1. In your repository, click **Settings** (top tab).
2. Scroll down to the **Pages** section in the left sidebar.
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**.

GitHub will give you a URL like:  
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

The site will be live within 1-2 minutes.

---

### Step 4 — Connect your custom domain (foundryprintpromo.com)

**In GitHub:**
1. Go to **Settings > Pages**.
2. Under **Custom domain**, enter: `foundryprintpromo.com`
3. Click **Save**.
4. Check **Enforce HTTPS** once it appears (may take a few minutes).

**In your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):**

Add these DNS records:

| Type  | Host | Value               |
|-------|------|---------------------|
| A     | @    | 185.199.108.153     |
| A     | @    | 185.199.109.153     |
| A     | @    | 185.199.110.153     |
| A     | @    | 185.199.111.153     |
| CNAME | www  | YOUR_USERNAME.github.io |

DNS changes can take up to 24-48 hours to propagate fully.

---

## Adding Your Logo

Place your logo file at:
```
assets/Primary Light.svg
```

The file name must match exactly — including the space and capital letters.  
If you rename the file, update both `<img src="...">` tags in `index.html` (one in the header, one in the footer).

If the SVG fails to load for any reason, the site automatically displays a text fallback: **FOUNDRY / PRINT & PROMO**. No broken image icons will appear.

---

## Adding Real Photography

Replace these placeholder files in the `assets/` folder:

| File | What it shows |
|------|--------------|
| `work-1.jpg` | Brand Apparel — screen print, embroidery, hats |
| `work-2.jpg` | Promotional Goods — drinkware, merchandise |
| `work-3.jpg` | Signage & Print — banners, graphics |
| `work-4.jpg` | Team Stores — merch programs |

**Recommended photo specs:**
- Format: JPG or WebP
- Dimensions: 800 × 1000px minimum (portrait orientation)
- File size: Under 500KB per image (compress with [squoosh.app](https://squoosh.app))

If a photo fails to load, the card automatically shows a dark hatched placeholder labeled "Photo Coming Soon."

---

## Making Copy Updates

All site copy is in `index.html`. It is organized with comments marking each section:

```html
<!-- SECTION 03: WHO WE SERVE -->
<!-- SECTION 04: SERVICES -->
<!-- etc. -->
```

Use your browser's Find & Replace (`Ctrl+F` / `Cmd+F`) to locate specific text.

**Common updates:**
- Phone number: search for `8432592753`
- Email: search for `Collin@foundryprintpromo.com`
- Address: search for `Charleston, South Carolina`
- Tagline: search for `Ideas Forged Into Goods`

---

## Making Style Updates

All colors, fonts, and spacing are defined as CSS variables at the top of `css/styles.css` in the `:root {}` block. To change the accent color, for example:

```css
:root {
  --color-accent: #C4541A;  /* Change this one value */
}
```

That single change updates every button, highlight, and accent across the entire site.

---

## Pushing Updates (after initial setup)

```bash
# Make your changes, then:
git add .
git commit -m "Update copy / replace photos / etc."
git push
```

GitHub Pages will rebuild and publish within 1-2 minutes.

---

## Questions or Help

Contact: Collin@foundryprintpromo.com  
Phone: (843) 259-2753
