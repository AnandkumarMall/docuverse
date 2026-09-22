# 📄 DocuVerse — 100% Private, Client-Side Document & Image Suite

[![Astro](https://img.shields.io/badge/Astro-v7.3.3-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-22c55e?logo=github)](https://anandkumarmall.github.io/docuverse/)
[![Zero Uploads](https://img.shields.io/badge/Privacy-100%25%20Client--Side-6366f1)](#-why-docuverse-zero-uploads-absolute-privacy)
[![Zero Paywalls](https://img.shields.io/badge/Paywalls-None-success)](#)

> **DocuVerse** is a modern, high-performance web suite of free PDF, image manipulation, and productivity tools. Every operation runs **100% locally in your browser** using WebAssembly and client-side JavaScript. Your files never leave your device — no servers, no telemetry, no file size caps, and no paywalls.

🌐 **Live Website**: [https://anandkumarmall.github.io/docuverse/](https://anandkumarmall.github.io/docuverse/)  
📦 **GitHub Repository**: [https://github.com/AnandkumarMall/docuverse](https://github.com/AnandkumarMall/docuverse)

---

## 🔒 Why DocuVerse? (Zero Uploads, Absolute Privacy)

Most popular online document tools (Smallpdf, iLovePDF, Adobe Acrobat Online) silently transmit your sensitive documents, financial contracts, tax forms, IDs, and personal photos to third-party cloud servers for processing. Even when they claim "files are deleted after 1 hour", your data is exposed to remote servers, network transit risks, and potential data leaks.

**DocuVerse eliminates that risk entirely:**
- 🛡️ **Zero Server Uploads**: Processing happens inside your browser tab via WebAssembly and HTML5 Canvas.
- ⚡ **Instant Processing**: No network upload or download bottlenecks. Drop a 200MB file and it processes immediately.
- 🚫 **No Sign-Up / No Limits**: No email collection, no daily quotas, no wait queues, and no premium paywalls.
- 📴 **Offline Capable**: Once loaded in your browser, core tools function even if you disconnect from the internet.
- 🧹 **Zero Watermarks**: Your downloaded documents and images remain clean, authentic, and unmodified.

---

## 🛠️ Complete Feature Catalog

DocuVerse features **22 specialized tools** across three categories:

### 📑 1. PDF Tools (11 Tools)

| Tool | Route | Description & Key Capabilities |
| :--- | :--- | :--- |
| **Direct PDF Text Editor** | [`/pdf/editor`](https://anandkumarmall.github.io/docuverse/pdf/editor/) | Edit text directly inside any PDF file. Modify existing wording or add custom styled annotations with visual overlay and high-res vector rendering. |
| **Merge PDF** | [`/pdf/merge`](https://anandkumarmall.github.io/docuverse/pdf/merge/) | Drag-and-drop combine multiple PDF files into a single unified document with custom reordering. |
| **Split PDF** | [`/pdf/split`](https://anandkumarmall.github.io/docuverse/pdf/split/) | Extract single pages, custom page ranges (e.g. `1-3, 5, 8`), or burst an entire PDF into individual files. |
| **Compress PDF** | [`/pdf/compress`](https://anandkumarmall.github.io/docuverse/pdf/compress/) | Reduce PDF size with presets (Extreme, Recommended, High Quality) or set a **Target File Size (KB/MB)** with live auto-calculating ratio and instant visual page preview. |
| **PDF to Word** | [`/pdf/to-word`](https://anandkumarmall.github.io/docuverse/pdf/to-word/) | Extract structured text, paragraphs, and headings from PDF pages and export to editable `.docx` documents. |
| **PDF to Image** | [`/pdf/to-image`](https://anandkumarmall.github.io/docuverse/pdf/to-image/) | Convert PDF pages into crystal-clear JPG or PNG images with custom DPI settings and ZIP batch download. |
| **Protect PDF** | [`/pdf/protect`](https://anandkumarmall.github.io/docuverse/pdf/protect/) | Encrypt PDF files with 128-bit/256-bit password protection to prevent unauthorized reading or copying. |
| **Unlock PDF** | [`/pdf/unlock`](https://anandkumarmall.github.io/docuverse/pdf/unlock/) | Decrypt password-protected PDFs and produce unrestricted, open copies directly in your browser. |
| **Watermark PDF** | [`/pdf/watermark`](https://anandkumarmall.github.io/docuverse/pdf/watermark/) | Stamp custom text watermarks across every page with adjustable opacity, angle, font size, and color. |
| **Sign PDF** | [`/pdf/sign`](https://anandkumarmall.github.io/docuverse/pdf/sign/) | Draw a signature with a stylus/mouse, type with calligraphic script fonts, or upload a signature image, with drag-and-drop placement on any page. |
| **Organize PDF** | [`/pdf/organize`](https://anandkumarmall.github.io/docuverse/pdf/organize/) | Visual page grid to rotate individual pages (90°/180°/270°), reorder pages via drag-and-drop, and delete unwanted pages. |

---

### 🖼️ 2. Image Tools (7 Tools)

| Tool | Route | Description & Key Capabilities |
| :--- | :--- | :--- |
| **Compress Image** | [`/image/compress`](https://anandkumarmall.github.io/docuverse/image/compress/) | Compress JPG, PNG, and WebP files. Supports **multi-file batch processing**, individual slider controls, target file size matching, real-time live preview, and one-click ZIP download. |
| **Resize Image** | [`/image/resize`](https://anandkumarmall.github.io/docuverse/image/resize/) | Resize by **Pixels (px), Centimeters (cm), Millimeters (mm), Inches (in), or Percentage (%)** with configurable DPI (72, 150, 300 DPI for official portal submissions). Cross-format export to PNG, JPEG, WebP, or PDF. |
| **Crop Image** | [`/image/crop`](https://anandkumarmall.github.io/docuverse/image/crop/) | Interactive crop box with popular aspect ratio presets (1:1 Square, 16:9 Landscape, 4:3 Standard, 9:16 Story, 3:2 Photo) plus freeform selection. |
| **Convert Format** | [`/image/convert`](https://anandkumarmall.github.io/docuverse/image/convert/) | Fast cross-conversion between JPG, PNG, WebP, AVIF, BMP, and GIF with custom quality and batch ZIP export. |
| **Image to PDF** | [`/image/to-pdf`](https://anandkumarmall.github.io/docuverse/image/to-pdf/) | Convert multiple photos into a single PDF with page orientation choices (Portrait/Landscape), margins, and page sizes (A4, Letter, Fit to Image). |
| **Remove EXIF** | [`/image/remove-exif`](https://anandkumarmall.github.io/docuverse/image/remove-exif/) | Inspect and strip sensitive privacy metadata (GPS coordinates, camera model, shutter speed, timestamp, serial numbers) before sharing photos online. |
| **Color Picker** | [`/image/color-picker`](https://anandkumarmall.github.io/docuverse/image/color-picker/) | Magnifying loupe tool to sample any pixel from an uploaded image and instantly copy HEX, RGB, or HSL color codes to your clipboard. |

---

### ⚡ 3. Productivity & Developer Utilities (4 Tools)

| Tool | Route | Description & Key Capabilities |
| :--- | :--- | :--- |
| **Extract Text (OCR)** | [`/tools/ocr`](https://anandkumarmall.github.io/docuverse/tools/ocr/) | Client-side Optical Character Recognition powered by WebAssembly Tesseract.js. Extracts plain text from photos, scans, and screenshots without sending images to cloud APIs. |
| **SVG Optimizer** | [`/tools/svg-optimizer`](https://anandkumarmall.github.io/docuverse/tools/svg-optimizer/) | Strips metadata, unnecessary editor XML tags, hidden shapes, and minifies coordinate precision to shrink SVG vector assets for web performance. |
| **Image to Base64** | [`/tools/image-to-base64`](https://anandkumarmall.github.io/docuverse/tools/image-to-base64/) | Encodes any image file into raw Base64 data strings, CSS `background-image` snippets, or HTML `<img>` tags for inline embed use. |
| **Favicon Generator** | [`/tools/favicon-generator`](https://anandkumarmall.github.io/docuverse/tools/favicon-generator/) | Generates complete icon suites from a single image: 16x16, 32x32, 48x48, 180x180 Apple Touch Icon, and ready-to-paste `<link>` HTML tags in a neat ZIP archive. |

---

## 📊 Comparison Matrix

| Feature | DocuVerse | Traditional Online Services (Smallpdf, iLovePDF, etc.) |
| :--- | :---: | :---: |
| **Server Uploads** | **None (100% In-Browser)** | Yes (Uploads to remote cloud) |
| **Privacy & GDPR Safety** | **Total (Files never leave device)** | Subject to third-party privacy policies |
| **File Size Limit** | **Unlimited (Device RAM only)** | Typically 5 MB – 50 MB on free tier |
| **Usage Limits** | **Unlimited free uses** | Usually 2–3 tasks per day on free tier |
| **Sign-Up Required** | **No account needed** | Often required after 1–2 uses |
| **Processing Latency** | **Instant (No upload/download lag)** | High (Upload time + Queue wait + Download time) |
| **Target Size Compression** | **Yes (Auto-calculated)** | Paid / Premium feature |
| **Watermarks** | **Zero Watermarks** | Common on free tiers |

---

## 🏗️ Architecture & Technology Stack

DocuVerse is built as a blazing-fast, static Multi-Page Application (MPA) using the modern web platform:

- **Framework**: [Astro v7.3](https://astro.build/) — Pure HTML output with zero framework bloat on pages that don't need client JS.
- **Styling**: Modern Vanilla CSS Design System with customized tokens, fluid typography, dark-mode-ready color palette, and micro-animations.
- **Client-Side Engines**:
  - `pdf-lib` — WebAssembly-compatible PDF parsing, page extraction, encryption, and synthesis.
  - `tesseract.js` — Client-side WebAssembly Optical Character Recognition engine.
  - `pica` — High-quality Lanczos3 canvas image resampling and resizing.
  - `browser-image-compression` — Client-side web worker image compression.
  - `docx` — Client-side Word document generator.
  - `fflate` — Ultra-fast WebAssembly-grade zip archiver and extractor.
  - `exifr` — Fast client-side EXIF/IPTC/XMP metadata reader.
- **Hosting & CI/CD**: [GitHub Pages](https://pages.github.com/) with automated [GitHub Actions](https://github.com/features/actions) build pipeline (`deploy.yml`).

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js**: `v22.12.0` or higher
- **npm**: `v10.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AnandkumarMall/docuverse.git
   cd docuverse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:4321/docuverse/` (or `http://localhost:4321/` depending on your environment variable settings).

4. **Build for production**:
   ```bash
   npm run build
   ```
   Static files are compiled into the `./dist` directory.

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deploying to GitHub Pages

DocuVerse includes a turnkey GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Quick Deployment Steps
1. Fork or push this repository to your GitHub account.
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Any push to `main` will trigger the build and deploy automatically.
4. Your site will be published at `https://<your-username>.github.io/<repo-name>/`.

---

## 🛡️ Security & Privacy Guarantee

1. **No External Storage**: There is no database, no Amazon S3 bucket, and no backend API attached to DocuVerse.
2. **Local Memory Only**: All PDF and image buffers exist strictly in your browser's runtime RAM and are discarded when you close or refresh the tab.
3. **No Third-Party Analytics**: Zero behavioral surveillance, zero invasive cookies, and zero fingerprinting.

---

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Crafted with care for privacy and performance. <b>DocuVerse</b> — Your files stay yours.
</p>
