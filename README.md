# VedaAI — AI-Powered Assessment Extraction & Multimodal Spatial Answer Sheet Mapping

<div align="center">

![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)

</div>

---

## 📌 Overview

**VedaAI** is a next-generation AI assessment platform designed for educators and academic institutions. Powered by **Google Gemini Multimodal Vision**, VedaAI automatically extracts questions from question papers, analyzes handwritten student answer sheets, maps student responses to corresponding questions using **normalized spatial bounding boxes**, and performs rubric-based grading with instant feedback.

---

## ✨ Key Features

- 🎨 **Figma-Perfect Light SaaS Design**: Crafted to match modern educational dashboard standards with a collapsible sidebar, breadcrumb navigation, and responsive mobile layout.
- 📐 **Spatial Answer Mapping**: Computes normalized `[ymin, xmin, ymax, xmax]` bounding boxes to highlight handwritten answer regions on the answer sheet (`Q1.`, `Q2.`, `Q3.`).
- ⚡ **Automated Question Extraction**: Parses multi-page Question Papers (PDF/Images) and splits sub-parts (e.g. `11(a)`, `11(b)`) into distinct evaluate-ready entries.
- 🧠 **Smart AI Evaluation**:
  - **Rubric Breakdown**: Evaluates answers criterion-by-criterion with score breakdown.
  - **Sequence Detection**: Flags out-of-order attempts (e.g., student attempting Q13 before Q12).
  - **Constructive AI Feedback**: Generates actionable feedback for student improvement.
- 📄 **In-Browser PDF Processing**: Converts PDFs to images client-side via a local `pdfjs-dist` worker with zero CORS latency.
- 🔍 **Interactive Document Viewer**: Smooth zoom controls (`- 100% +`), multi-page navigation (`< Page 1 of 4 >`), and clickable spatial overlays.
- 📊 **Summary Report Modal**: Computes total score, percentage, letter grades (`A+`, `A`, `B`, etc.), and attempt statistics.
- 🔑 **Flexible API & Demo Modes**: Works out-of-the-box with `.env` configuration or instant offline high-fidelity demo sample mode.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tooling** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [TailwindCSS v4](https://tailwindcss.com/) + [Lucide React Icons](https://lucide.dev/) |
| **AI SDK** | [`@google/genai`](https://www.npmjs.com/package/@google/genai) (Google GenAI SDK v2) |
| **PDF Engine** | [`pdfjs-dist`](https://www.npmjs.com/package/pdfjs-dist) (Client-side Canvas rendering) |

---

## 📂 Project Structure

```text
VedaAI/
├── public/                     # Static icons and assets
├── src/
│   ├── assets/                 # Brand images and vectors
│   ├── components/
│   │   ├── Dashboard/          # Core evaluation view components
│   │   │   ├── BoundingBoxOverlay.tsx  # SVG green bounding boxes layer
│   │   │   ├── Dashboard.tsx           # Multi-pane responsive view & mobile tabs
│   │   │   ├── DocumentViewerPane.tsx  # Handwritten sheet canvas & zoom controls
│   │   │   ├── QuestionCard.tsx        # Question item, score pill & AI Feedback
│   │   │   └── QuestionListPane.tsx    # Extracted questions list & search filter
│   │   ├── ui/                 # Reusable UI metrics & status badges
│   │   ├── ApiKeyModal.tsx     # Gemini API key configuration modal
│   │   ├── FileUploadSection.tsx# Dual upload dropzones & teacher illustration
│   │   ├── Header.tsx          # Figma navigation header bar
│   │   ├── ProcessingOverlay.tsx# Figma "Extracting..." loading screen
│   │   ├── Sidebar.tsx         # Figma collapsible left navigation rail
│   │   └── SummaryReportModal.tsx # Assessment summary & grade analytics
│   ├── data/
│   │   └── sampleData.ts       # Instant biology assessment sample dataset
│   ├── services/
│   │   ├── geminiService.ts    # Gemini AI extraction & spatial grounding engine
│   │   └── pdfService.ts       # PDF to image canvas conversion
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces & types
│   ├── App.tsx                 # Main Application Layout
│   ├── index.css               # Global styles & Tailwind import
│   └── main.tsx                # Application Entry point
├── .env                        # Environment variables (API Key)
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── vite.config.ts              # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SaquibAnjum/VedaAI_Assignment.git
   cd VedaAI_Assignment
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

---

## 🤖 Gemini API Model Fallback Architecture

VedaAI incorporates an automated fallback mechanism across supported Google Gemini model endpoints:

1. `gemini-2.5-flash`
2. `gemini-2.0-flash`
3. `gemini-1.5-flash-latest`
4. `gemini-1.5-pro`

If a model endpoint returns a `404` or region restriction, VedaAI automatically transitions to the next available model without interrupting the user experience.

---

## 🧪 Building & Verification

To verify TypeScript types and bundle the application for production:

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run preview
```

---

## 👤 Author

Developed by **Saquib** as part of the VedaAI Assignment.

- **GitHub**: [@SaquibAnjum](https://github.com/SaquibAnjum)
- **Repository**: [VedaAI_Assignment](https://github.com/SaquibAnjum/VedaAI_Assignment)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
