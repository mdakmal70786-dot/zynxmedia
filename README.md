# Zynx Media Website
**Live URL:** https://zynx.site  
**Tech Stack:** HTML5 · CSS3 · JavaScript · GitHub Pages · GoDaddy Domain

---

## 📁 Project Structure

```
zynx-media/
├── index.html          ← Main website file
├── style.css           ← All styles (dark UI + glassmorphism)
├── script.js           ← All interactions + animations
├── assets/
│   ├── images/         ← Add your project screenshots here
│   ├── icons/          ← Custom icons (if any)
│   └── fonts/          ← Local fonts (if needed)
└── README.md           ← This file
```

---

## 🚀 GitHub Pages Deployment Guide

### Step 1 – Create GitHub Account
Go to https://github.com and sign up (free).

### Step 2 – Create New Repository
1. Click **"New"** (green button)
2. Repository name: `zynx-media` *(or any name)*
3. Set to **Public**
4. Click **"Create repository"**

### Step 3 – Upload Files
**Option A – GitHub Web (easiest):**
1. Open your new repository
2. Click **"uploading an existing file"**
3. Drag and drop ALL project files (index.html, style.css, script.js, assets/)
4. Click **"Commit changes"**

**Option B – Git CLI:**
```bash
git init
git add .
git commit -m "Initial commit – Zynx Media website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zynx-media.git
git push -u origin main
```

### Step 4 – Enable GitHub Pages
1. Go to your repository → **Settings** tab
2. Scroll down to **"Pages"** in left sidebar
3. Under **"Source"** → select **"Deploy from a branch"**
4. Branch: `main` | Folder: `/ (root)`
5. Click **Save**
6. Wait 2–3 minutes → your site goes live at:
   `https://YOUR_USERNAME.github.io/zynx-media/`

---

## 🌐 GoDaddy DNS Connection (zynx.site)

### Step 1 – Get GitHub Pages IP Addresses
GitHub Pages uses these IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Step 2 – Add Custom Domain in GitHub
1. Repository → **Settings → Pages**
2. Under **"Custom domain"** → type `zynx.site`
3. Click **Save**
4. GitHub will create a `CNAME` file in your repo automatically

### Step 3 – Configure GoDaddy DNS
1. Log in to **GoDaddy** → My Products → **DNS** (next to zynx.site)
2. Delete existing **A records** (if any point to wrong IPs)
3. Add these **A records**:

| Type | Name | Value            | TTL  |
|------|------|------------------|------|
| A    | @    | 185.199.108.153  | 600  |
| A    | @    | 185.199.109.153  | 600  |
| A    | @    | 185.199.110.153  | 600  |
| A    | @    | 185.199.111.153  | 600  |

4. Add a **CNAME record**:

| Type  | Name | Value                              | TTL  |
|-------|------|------------------------------------|------|
| CNAME | www  | YOUR_USERNAME.github.io            | 600  |

5. Click **Save**

### Step 4 – Wait & Verify
- DNS propagation takes **15 min to 48 hours**
- Check status: https://www.whatsmydns.net/
- Once propagated, visit **https://zynx.site** ✅

### Step 5 – Enable HTTPS (Free SSL)
1. Back in GitHub → Settings → Pages
2. Check **"Enforce HTTPS"** (appears after DNS propagates)
3. Your site is now live with SSL at https://zynx.site 🔒

---

## ✏️ How to Update the Website

### Change Contact Info
In `index.html`, search for:
- `mdakmal70786@gmail.com` → replace with your email
- `+91 98765 43210` → replace with your phone
- `wa.me/917070017747` → replace with your WhatsApp number

### Add Portfolio Images
1. Add your images to `assets/images/`
2. In `style.css`, find `.web-project-1`, `.logo-project-1`, etc.
3. Replace the gradient backgrounds with:
```css
.web-project-1 {
  background: url('assets/images/your-project.jpg') center/cover no-repeat;
}
```

### Update Services Pricing
Add pricing to service cards in `index.html` as needed.

---

## 🎨 Customization Quick Reference

### Change Brand Colors
In `style.css`, edit the `:root` variables:
```css
--accent-1: #6c63ff;    /* Purple – primary accent */
--accent-2: #00d4ff;    /* Cyan – secondary accent */
```

### Change Fonts
Replace the Google Fonts link in `index.html` and update:
```css
--font-display: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
```

---

## 📊 SEO Checklist
- [x] Meta title & description set
- [x] Open Graph tags added
- [x] Semantic HTML structure
- [x] Alt text ready (add to images when added)
- [x] Mobile responsive
- [x] Fast load (no external dependencies except fonts + FA icons)
- [ ] Add Google Analytics tracking code
- [ ] Submit sitemap to Google Search Console

---

## 📞 Support
**Website:** zynx.site  
**Email:** mdakmal70786@gmail.com  
**WhatsApp:** +91 98765 43210

---
*Built with ❤️ by Zynx Media*
