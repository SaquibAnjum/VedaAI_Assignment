import type { Question, FileItem } from '../types';

/**
 * Creates SVG Data URL for the sample Question Paper (Biology & Life Sciences)
 */
function createSampleQuestionPaperSvg(): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" style="background:#ffffff; font-family:'Segoe UI', Roboto, sans-serif;">
    <rect width="800" height="1100" fill="#ffffff"/>
    
    <!-- Header -->
    <rect x="40" y="40" width="720" height="120" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
    <text x="400" y="75" font-size="22" font-weight="bold" fill="#0f172a" text-anchor="middle">DELHI PUBLIC SCHOOL — BOKARO STEEL CITY</text>
    <text x="400" y="102" font-size="16" font-weight="600" fill="#475569" text-anchor="middle">CLASS 10 MID-TERM EXAMINATION 2026 — BIOLOGY &amp; LIFE PROCESSES</text>
    <text x="60" y="138" font-size="13" font-weight="bold" fill="#64748b">TIME: 2.5 HOURS</text>
    <text x="680" y="138" font-size="13" font-weight="bold" fill="#64748b" text-anchor="end">MAX MARKS: 45</text>

    <line x1="40" y1="175" x2="760" y2="175" stroke="#f05537" stroke-width="3"/>

    <text x="40" y="215" font-size="18" font-weight="bold" fill="#1e293b">SECTION A: SHORT &amp; LONG DESCRIPTIVE QUESTIONS</text>
    <text x="40" y="238" font-size="13" font-style="italic" fill="#64748b">Answer all questions in the provided answer booklet. Include neat labelled diagrams where required.</text>

    <!-- Q1 -->
    <rect x="40" y="265" width="720" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="60" y="295" font-size="15" font-weight="bold" fill="#0f172a">Q1.</text>
    <text x="100" y="295" font-size="14" fill="#334155">Which blood vessel carries blood away from the heart?</text>
    <text x="730" y="295" font-size="13" font-weight="bold" fill="#ea580c" text-anchor="end">[2 Marks]</text>

    <!-- Q2 -->
    <rect x="40" y="325" width="720" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="60" y="355" font-size="15" font-weight="bold" fill="#0f172a">Q2.</text>
    <text x="100" y="355" font-size="14" fill="#334155">Which of the following organelles is primary involved in photosynthesis?</text>
    <text x="730" y="355" font-size="13" font-weight="bold" fill="#ea580c" text-anchor="end">[2 Marks]</text>

    <!-- Q3 -->
    <rect x="40" y="385" width="720" height="60" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="60" y="415" font-size="15" font-weight="bold" fill="#0f172a">Q3.</text>
    <text x="100" y="415" font-size="14" fill="#334155">Explain the role of chloroplasts in photosynthesis, naming the main pigments involved</text>
    <text x="100" y="435" font-size="14" fill="#334155">and briefly outlining the two major stages of the process.</text>
    <text x="730" y="435" font-size="13" font-weight="bold" fill="#ea580c" text-anchor="end">[2 Marks]</text>

    <!-- Q4 -->
    <rect x="40" y="455" width="720" height="60" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="60" y="485" font-size="15" font-weight="bold" fill="#0f172a">Q4.</text>
    <text x="100" y="485" font-size="14" fill="#334155">Describe the flow of blood through the human heart starting from the right atrium and</text>
    <text x="100" y="505" font-size="14" fill="#334155">ending at the aorta; include the names of valves crossed.</text>
    <text x="730" y="505" font-size="13" font-weight="bold" fill="#ea580c" text-anchor="end">[2 Marks]</text>

    <!-- Q5 -->
    <rect x="40" y="525" width="720" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="60" y="555" font-size="15" font-weight="bold" fill="#0f172a">Q5.</text>
    <text x="100" y="555" font-size="14" fill="#334155">Draw a labelled diagram of an alveolus showing capillaries and air space.</text>
    <text x="730" y="555" font-size="13" font-weight="bold" fill="#ea580c" text-anchor="end">[2 Marks]</text>

    <!-- Q6 -->
    <rect x="40" y="585" width="720" height="60" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="60" y="615" font-size="15" font-weight="bold" fill="#0f172a">Q6.</text>
    <text x="100" y="615" font-size="14" fill="#334155">Draw a neat labelled diagram of the human digestive system and label the site where</text>
    <text x="100" y="635" font-size="14" fill="#334155">most absorption of digested food occurs.</text>
    <text x="730" y="635" font-size="13" font-weight="bold" fill="#ea580c" text-anchor="end">[5 Marks]</text>

    <text x="400" y="1050" font-size="12" fill="#94a3b8" text-anchor="middle">— CONTINUED ON NEXT PAGE —</text>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Creates SVG Data URL for Page 1 of Handwritten Answer Sheet (Q1, Q2, Q3)
 */
function createSampleAnswerSheetPage1Svg(): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" style="background:#fffdf9; font-family:'Caveat', 'Comic Sans MS', cursive, sans-serif;">
    <rect width="800" height="1100" fill="#fffdf9"/>
    <!-- Page Header info -->
    <text x="750" y="40" font-size="14" font-weight="bold" fill="#94a3b8" text-anchor="end">Page 1 of 4</text>
    <!-- Red margin line -->
    <line x1="80" y1="0" x2="80" y2="1100" stroke="#fca5a5" stroke-width="2"/>
    
    <!-- Notebook lines -->
    ${Array.from({ length: 33 }).map((_, i) => `<line x1="0" y1="${70 + i * 30}" x2="800" y2="${70 + i * 30}" stroke="#e2e8f0" stroke-width="1"/>`).join('')}

    <!-- Answer Q1 -->
    <g transform="translate(0, 0)">
      <text x="25" y="100" font-size="24" font-weight="bold" fill="#1d4ed8">Q1.</text>
      <text x="100" y="100" font-size="22" fill="#1e293b">Arteries carry oxygenated blood away from the heart to all parts</text>
      <text x="100" y="130" font-size="22" fill="#1e293b">of the body under high pressure. The main artery is the Aorta.</text>
      
      <!-- Chemical Equation box -->
      <rect x="100" y="150" width="620" height="45" rx="4" fill="none" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="410" y="180" font-size="20" font-weight="bold" fill="#1e3a8a" text-anchor="middle">6CO₂  +  6H₂O  ——[Light / Chlorophyll]——&gt;  C₆H₁₂O₆  +  6O₂</text>
      
      <!-- Diagram of plant & sun -->
      <circle cx="360" cy="245" r="16" fill="none" stroke="#ea580c" stroke-width="2"/>
      <path d="M360 220 L360 210 M360 270 L360 280 M335 245 L325 245 M385 245 L395 245 M342 227 L334 219 M378 263 L386 271 M342 263 L334 271 M378 227 L386 219" stroke="#ea580c" stroke-width="2"/>
      <text x="400" y="245" font-size="16" fill="#64748b">Sunlight</text>

      <!-- Plant sketch -->
      <path d="M360 290 Q360 350 360 380" stroke="#166534" stroke-width="3" fill="none"/>
      <!-- Leaves -->
      <path d="M360 330 Q390 310 420 330 Q390 350 360 330" fill="#22c55e" opacity="0.6" stroke="#15803d" stroke-width="1.5"/>
      <path d="M360 345 Q330 325 300 345 Q330 365 360 345" fill="#22c55e" opacity="0.6" stroke="#15803d" stroke-width="1.5"/>
      <!-- Roots -->
      <path d="M360 380 Q340 400 330 420 M360 380 Q375 405 390 425 M360 380 L360 425" stroke="#78350f" stroke-width="2" fill="none"/>

      <text x="140" y="325" font-size="18" fill="#1e293b">Carbon dioxide ——&gt;</text>
      <text x="450" y="355" font-size="18" fill="#1e293b">——&gt; Oxygen</text>
      <text x="410" y="415" font-size="18" fill="#1e293b">Water</text>

      <line x1="100" y1="440" x2="750" y2="440" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1"/>
    </g>

    <!-- Answer Q2 -->
    <g transform="translate(0, 0)">
      <text x="25" y="485" font-size="24" font-weight="bold" fill="#1d4ed8">Q2.</text>
      <text x="100" y="485" font-size="22" fill="#1e293b">The process mainly occurs in the chloroplast of the plant cell.</text>
      <text x="100" y="515" font-size="22" fill="#1e293b">It has two main stages:</text>
      <text x="120" y="545" font-size="22" fill="#1e293b">1. Light reaction — Captures light energy.</text>
      <text x="120" y="575" font-size="22" fill="#1e293b">2. Dark reaction — Uses energy to make glucose.</text>

      <line x1="100" y1="600" x2="750" y2="600" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1"/>
    </g>

    <!-- Answer Q3 -->
    <g transform="translate(0, 0)">
      <text x="25" y="645" font-size="24" font-weight="bold" fill="#1d4ed8">Q3.</text>
      <text x="100" y="645" font-size="22" fill="#1e293b">Chloroplasts contain chlorophyll pigment inside thylakoid membranes.</text>
      <text x="100" y="675" font-size="22" fill="#1e293b">Light dependent reactions produce ATP &amp; NADPH.</text>
      <text x="100" y="705" font-size="22" fill="#1e293b">Calvin cycle fixes CO₂ in the stroma of chloroplast.</text>
    </g>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Creates SVG Data URL for Page 2 of Handwritten Answer Sheet (Q4, Q5, Q6, Q7)
 */
function createSampleAnswerSheetPage2Svg(): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" style="background:#fffdf9; font-family:'Caveat', 'Comic Sans MS', cursive, sans-serif;">
    <rect width="800" height="1100" fill="#fffdf9"/>
    <text x="750" y="40" font-size="14" font-weight="bold" fill="#94a3b8" text-anchor="end">Page 2 of 4</text>
    <line x1="80" y1="0" x2="80" y2="1100" stroke="#fca5a5" stroke-width="2"/>
    ${Array.from({ length: 33 }).map((_, i) => `<line x1="0" y1="${70 + i * 30}" x2="800" y2="${70 + i * 30}" stroke="#e2e8f0" stroke-width="1"/>`).join('')}

    <!-- Answer Q4 -->
    <g transform="translate(0, 0)">
      <text x="25" y="100" font-size="24" font-weight="bold" fill="#1d4ed8">Q4.</text>
      <text x="100" y="100" font-size="22" fill="#1e293b">Blood enters heart from vena cava to atrium.</text>
      <text x="100" y="130" font-size="20" fill="#dc2626" font-style="italic">(Partially answered — missed valves and ventricle order)</text>
      <line x1="100" y1="160" x2="750" y2="160" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1"/>
    </g>

    <!-- Answer Q5 -->
    <g transform="translate(0, 0)">
      <text x="25" y="195" font-size="24" font-weight="bold" fill="#1d4ed8">Q5.</text>
      <text x="100" y="195" font-size="22" fill="#1e293b">[Diagram of Alveolus &amp; Blood Capillaries]</text>
      <ellipse cx="300" cy="280" rx="80" ry="60" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
      <text x="300" y="285" font-size="16" fill="#991b1b" text-anchor="middle">Air Space (O₂)</text>
      <path d="M 200 340 Q 300 370 400 340" fill="none" stroke="#2563eb" stroke-width="6"/>
      <text x="300" y="375" font-size="14" fill="#1e40af" text-anchor="middle">Capillary (Gas exchange: O₂ in, CO₂ out)</text>
      <line x1="100" y1="410" x2="750" y2="410" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1"/>
    </g>

    <!-- Answer Q6 -->
    <g transform="translate(0, 0)">
      <text x="25" y="445" font-size="24" font-weight="bold" fill="#1d4ed8">Q6.</text>
      <text x="100" y="445" font-size="22" fill="#1e293b">Human Digestive System Diagram:</text>
      <rect x="220" y="475" width="120" height="70" rx="20" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <text x="280" y="515" font-size="16" fill="#92400e" text-anchor="middle">Stomach</text>
      <path d="M 280 545 Q 280 620 380 620 Q 420 580 340 560" fill="none" stroke="#16a34a" stroke-width="4"/>
      <text x="440" y="600" font-size="16" font-weight="bold" fill="#15803d">★ Small Intestine (Site of absorption)</text>
      <line x1="100" y1="670" x2="750" y2="670" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1"/>
    </g>

    <!-- Answer Q7 -->
    <g transform="translate(0, 0)">
      <text x="25" y="705" font-size="24" font-weight="bold" fill="#1d4ed8">Q7.</text>
      <text x="100" y="705" font-size="22" fill="#1e293b">Nephron Diagram with Bowman's capsule and Glomerulus:</text>
      <path d="M 220 740 C 220 780, 280 780, 280 740" fill="none" stroke="#dc2626" stroke-width="3"/>
      <text x="250" y="795" font-size="16" fill="#991b1b">Bowman's Capsule &amp; Glomerulus</text>
      <path d="M 280 750 Q 350 850 420 750 L 420 880" fill="none" stroke="#0284c7" stroke-width="3"/>
      <text x="430" y="860" font-size="16" fill="#0369a1">Loop of Henle &amp; Collecting Duct</text>
    </g>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Creates SVG Data URL for Page 3 of Handwritten Answer Sheet (Q8, Q9, Q10)
 */
function createSampleAnswerSheetPage3Svg(): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" style="background:#fffdf9; font-family:'Caveat', 'Comic Sans MS', cursive, sans-serif;">
    <rect width="800" height="1100" fill="#fffdf9"/>
    <text x="750" y="40" font-size="14" font-weight="bold" fill="#94a3b8" text-anchor="end">Page 3 of 4</text>
    <line x1="80" y1="0" x2="80" y2="1100" stroke="#fca5a5" stroke-width="2"/>
    ${Array.from({ length: 33 }).map((_, i) => `<line x1="0" y1="${70 + i * 30}" x2="800" y2="${70 + i * 30}" stroke="#e2e8f0" stroke-width="1"/>`).join('')}

    <!-- Answer Q8 -->
    <g transform="translate(0, 0)">
      <text x="25" y="100" font-size="24" font-weight="bold" fill="#1d4ed8">Q8.</text>
      <text x="100" y="100" font-size="22" fill="#1e293b">Palisade layer has tightly packed columnar cells rich in chloroplasts</text>
      <text x="100" y="130" font-size="22" fill="#1e293b">to absorb maximum sunlight near upper surface.</text>
      <text x="100" y="160" font-size="22" fill="#1e293b">Spongy layer has loose cells with large air spaces for gas diffusion.</text>
      <line x1="100" y1="200" x2="750" y2="200" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1"/>
    </g>

    <!-- Answer Q9 -->
    <g transform="translate(0, 0)">
      <text x="25" y="235" font-size="24" font-weight="bold" fill="#1d4ed8">Q9.</text>
      <text x="100" y="235" font-size="22" fill="#1e293b">Transpiration is the evaporation of water vapor from stomata in leaves.</text>
      <text x="100" y="265" font-size="22" fill="#1e293b">Two environmental factors that increase transpiration rate:</text>
      <text x="120" y="295" font-size="22" fill="#1e293b">1. Higher Temperature (increases kinetic energy of water molecules)</text>
      <text x="120" y="325" font-size="22" fill="#1e293b">2. Increased Wind Speed (removes humid boundary layer)</text>
      <line x1="100" y1="365" x2="750" y2="365" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1"/>
    </g>

    <!-- Answer Q10 -->
    <g transform="translate(0, 0)">
      <text x="25" y="400" font-size="24" font-weight="bold" fill="#1d4ed8">Q10.</text>
      <text x="100" y="400" font-size="22" fill="#1e293b">Xylem vessels are hollow, continuous dead tubes without end walls.</text>
      <text x="100" y="430" font-size="22" fill="#1e293b">Their cell walls are thick and reinforced with lignin, which prevents</text>
      <text x="100" y="460" font-size="22" fill="#1e293b">the vessel from collapsing under extreme negative suction tension.</text>
    </g>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Creates SVG Data URL for Page 4 of Handwritten Answer Sheet (Q13 Out of order, Q11a, Q11b, Q12)
 */
function createSampleAnswerSheetPage4Svg(): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" style="background:#fffdf9; font-family:'Caveat', 'Comic Sans MS', cursive, sans-serif;">
    <rect width="800" height="1100" fill="#fffdf9"/>
    <text x="750" y="40" font-size="14" font-weight="bold" fill="#94a3b8" text-anchor="end">Page 4 of 4</text>
    <line x1="80" y1="0" x2="80" y2="1100" stroke="#fca5a5" stroke-width="2"/>
    ${Array.from({ length: 33 }).map((_, i) => `<line x1="0" y1="${70 + i * 30}" x2="800" y2="${70 + i * 30}" stroke="#e2e8f0" stroke-width="1"/>`).join('')}

    <!-- Out of Order Answer Q13 -->
    <g transform="translate(0, 0)">
      <rect x="95" y="75" width="650" height="145" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5" rx="8"/>
      <text x="110" y="105" font-size="24" font-weight="bold" fill="#c2410c">Ans Q13. (Attempted out of numerical order)</text>
      <text x="110" y="135" font-size="22" fill="#1e293b">Dead space = 0.15 L. Fresh air per breath = 0.5 - 0.15 = 0.35 L.</text>
      <text x="110" y="165" font-size="22" font-weight="bold" fill="#166534">Alveolar Ventilation = 0.35 L x 12 breaths/min = 4.2 L/min.</text>
      <line x1="100" y1="240" x2="750" y2="240" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1"/>
    </g>

    <!-- Answer Q11a -->
    <g transform="translate(0, 0)">
      <text x="25" y="275" font-size="24" font-weight="bold" fill="#1d4ed8">Q11(a).</text>
      <text x="100" y="275" font-size="22" fill="#1e293b">Plant B undergoes etiolation due to lack of sunlight, causing</text>
      <text x="100" y="305" font-size="22" fill="#1e293b">pale stems, reduced chlorophyll synthesis, and weak elongation.</text>
      <line x1="100" y1="340" x2="750" y2="340" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1"/>
    </g>

    <!-- Answer Q11b -->
    <g transform="translate(0, 0)">
      <text x="25" y="375" font-size="24" font-weight="bold" fill="#1d4ed8">Q11(b).</text>
      <text x="100" y="375" font-size="22" fill="#1e293b">Give water and move Plant B to bright sunlight.</text>
      <line x1="100" y1="410" x2="750" y2="410" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1"/>
    </g>

    <!-- Answer Q12 -->
    <g transform="translate(0, 0)">
      <text x="25" y="445" font-size="24" font-weight="bold" fill="#1d4ed8">Q12.</text>
      <text x="100" y="445" font-size="22" fill="#1e293b">Total minute ventilation = Tidal volume x Breathing rate</text>
      <text x="100" y="475" font-size="22" font-weight="bold" fill="#1e293b">= 0.5 L x 12 = 6.0 L/min.</text>
    </g>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    questionNumber: '1',
    text: 'Which blood vessel carries blood away from the heart?',
    maxMarks: 2,
    scoredMarks: 2,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q1',
      detectedQuestionId: '1',
      pageIndex: 0,
      confidenceScore: 0.98,
      matched: true,
      boundingBox: { ymin: 80, xmin: 30, ymax: 440, xmax: 960 },
      extractedAnswerText: 'Arteries carry oxygenated blood away from the heart to all parts of the body under high pressure. The main artery is the Aorta. Chemical equation: 6CO2 + 6H2O -> C6H12O6 + 6O2.',
      aiFeedback: 'Accurate answer! Identified arteries correctly as the blood vessels taking blood away from the heart.',
      rubricBreakdown: [
        { criterion: 'Blood Vessel Identification (Artery)', marksAwarded: 2, maxMarks: 2, comment: 'Correct identification' }
      ]
    }
  },
  {
    id: 'q2',
    questionNumber: '2',
    text: 'Which of the following organelles is primary involved in photosynthesis?',
    maxMarks: 2,
    scoredMarks: 2,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q2',
      detectedQuestionId: '2',
      pageIndex: 0,
      confidenceScore: 0.99,
      matched: true,
      boundingBox: { ymin: 465, xmin: 30, ymax: 600, xmax: 960 },
      extractedAnswerText: 'The process mainly occurs in the chloroplast of the plant cell. It has two main stages: 1. Light reaction - Captures light energy. 2. Dark reaction - Uses energy to make glucose.',
      aiFeedback: 'Excellent work! You correctly identified the chloroplast as the organelle responsible for photosynthesis.',
      rubricBreakdown: [
        { criterion: 'Organelle Identification (Chloroplast)', marksAwarded: 1, maxMarks: 1, comment: 'Correctly named chloroplast' },
        { criterion: 'Light & Dark stage explanation', marksAwarded: 1, maxMarks: 1, comment: 'Detailed two-stage summary provided' }
      ]
    }
  },
  {
    id: 'q3',
    questionNumber: '3',
    text: 'Explain the role of chloroplasts in photosynthesis, naming the main pigments involved and briefly outlining the two major stages of the process.',
    maxMarks: 2,
    scoredMarks: 2,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q3',
      detectedQuestionId: '3',
      pageIndex: 0,
      confidenceScore: 0.96,
      matched: true,
      boundingBox: { ymin: 625, xmin: 30, ymax: 760, xmax: 960 },
      extractedAnswerText: 'Chloroplasts contain chlorophyll pigment inside thylakoid membranes. Light dependent reactions produce ATP & NADPH. Calvin cycle fixes CO2 in stroma.',
      aiFeedback: 'Well structured answer detailing thylakoid membranes, chlorophyll pigment, and light-dependent energy carriers (ATP/NADPH).',
      rubricBreakdown: [
        { criterion: 'Chlorophyll & Thylakoid role', marksAwarded: 1, maxMarks: 1, comment: 'Pigment and location stated' },
        { criterion: 'ATP & NADPH production', marksAwarded: 1, maxMarks: 1, comment: 'Energy products mentioned' }
      ]
    }
  },
  {
    id: 'q4',
    questionNumber: '4',
    text: 'Describe the flow of blood through the human heart starting from the right atrium and ending at the aorta; include the names of valves crossed.',
    maxMarks: 2,
    scoredMarks: 0.5,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q4',
      detectedQuestionId: '4',
      pageIndex: 1,
      confidenceScore: 0.88,
      matched: true,
      boundingBox: { ymin: 80, xmin: 30, ymax: 170, xmax: 960 },
      extractedAnswerText: 'Blood enters heart from vena cava to atrium.',
      aiFeedback: 'Incomplete sequence. Missed tricuspid valve, right ventricle, pulmonary artery, bicuspid valve, and aortic valve.',
      rubricBreakdown: [
        { criterion: 'Heart Chamber Sequence', marksAwarded: 0.5, maxMarks: 1, comment: 'Incomplete chamber order' },
        { criterion: 'Valve Names (Tricuspid/Bicuspid)', marksAwarded: 0, maxMarks: 1, comment: 'No valves named' }
      ]
    }
  },
  {
    id: 'q5',
    questionNumber: '5',
    text: 'Draw a labelled diagram of an alveolus showing capillaries and air space (label alveolar sac, capillary, and direction of gas exchange).',
    maxMarks: 2,
    scoredMarks: 2,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q5',
      detectedQuestionId: '5',
      pageIndex: 1,
      confidenceScore: 0.94,
      matched: true,
      boundingBox: { ymin: 185, xmin: 30, ymax: 420, xmax: 960 },
      extractedAnswerText: '[Diagram of Alveolus & Blood Capillaries showing Air Space (O2) and Capillary Gas Exchange (O2 in, CO2 out)]',
      aiFeedback: 'Neat alveolar diagram with accurate gas diffusion direction arrows (O2 in, CO2 out).',
      rubricBreakdown: [
        { criterion: 'Diagram Clarity & Labelling', marksAwarded: 2, maxMarks: 2, comment: 'Clear labels and arrows' }
      ]
    }
  },
  {
    id: 'q6',
    questionNumber: '6',
    text: 'Draw a neat labelled diagram of the human digestive system (stomach, small intestine, large intestine, liver, pancreas) and label the site where most absorption occurs.',
    maxMarks: 5,
    scoredMarks: 4,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q6',
      detectedQuestionId: '6',
      pageIndex: 1,
      confidenceScore: 0.91,
      matched: true,
      boundingBox: { ymin: 435, xmin: 30, ymax: 680, xmax: 960 },
      extractedAnswerText: '[Human Digestive System Diagram showing Stomach and Small Intestine labelled as site of absorption]',
      aiFeedback: 'Accurate digestive system diagram. Correctly identified small intestine (villi) as the primary site of nutrient absorption.',
      rubricBreakdown: [
        { criterion: 'Organ Anatomical Positioning', marksAwarded: 3, maxMarks: 3, comment: 'All organs placed accurately' },
        { criterion: 'Absorption Site Labelling (Small Intestine)', marksAwarded: 1, maxMarks: 2, comment: 'Small intestine indicated' }
      ]
    }
  },
  {
    id: 'q7',
    questionNumber: '7',
    text: 'Draw and label a nephron (Bowman\'s capsule, glomerulus, proximal tubule, loop of Henle, distal tubule, collecting duct).',
    maxMarks: 5,
    scoredMarks: 5,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q7',
      detectedQuestionId: '7',
      pageIndex: 1,
      confidenceScore: 0.97,
      matched: true,
      boundingBox: { ymin: 695, xmin: 30, ymax: 910, xmax: 960 },
      extractedAnswerText: '[Nephron Diagram with Bowman\'s capsule, Glomerulus, Loop of Henle & Collecting Duct]',
      aiFeedback: 'Full marks awarded! Excellent nephron structure diagram with precise labels.',
      rubricBreakdown: [
        { criterion: 'Renal Corpuscle (Glomerulus & Bowman\'s)', marksAwarded: 2, maxMarks: 2, comment: 'Perfect' },
        { criterion: 'Tubular System (PCT, Henle, DCT, Collecting)', marksAwarded: 3, maxMarks: 3, comment: 'Complete' }
      ]
    }
  },
  {
    id: 'q8',
    questionNumber: '8',
    text: 'Explain the structural differences between palisade mesophyll and spongy mesophyll and state how each structure aids its function in the leaf.',
    maxMarks: 5,
    scoredMarks: 4,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q8',
      detectedQuestionId: '8',
      pageIndex: 2,
      confidenceScore: 0.89,
      matched: true,
      boundingBox: { ymin: 80, xmin: 30, ymax: 210, xmax: 960 },
      extractedAnswerText: 'Palisade layer has tightly packed columnar cells rich in chloroplasts to absorb maximum sunlight. Spongy layer has loose cells with large air spaces for gas diffusion.',
      aiFeedback: 'Good distinction of cell packing density, chloroplast abundance, and air spaces.',
      rubricBreakdown: [
        { criterion: 'Palisade Mesophyll structure', marksAwarded: 2, maxMarks: 2.5, comment: 'Stated cell packing and sunlight absorption' },
        { criterion: 'Spongy Mesophyll gas spaces', marksAwarded: 2, maxMarks: 2.5, comment: 'Air spaces and diffusion explained' }
      ]
    }
  },
  {
    id: 'q9',
    questionNumber: '9',
    text: 'Describe the process of transpiration in plants in two to three sentences and name two environmental factors that increase its rate.',
    maxMarks: 5,
    scoredMarks: 5,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q9',
      detectedQuestionId: '9',
      pageIndex: 2,
      confidenceScore: 0.95,
      matched: true,
      boundingBox: { ymin: 225, xmin: 30, ymax: 375, xmax: 960 },
      extractedAnswerText: 'Transpiration is the evaporation of water vapor from stomata in leaves. Factors: 1. Higher Temperature. 2. Increased Wind Speed.',
      aiFeedback: 'Comprehensive definition and correct environmental factors (higher temperature & wind speed).',
      rubricBreakdown: [
        { criterion: 'Transpiration Definition', marksAwarded: 3, maxMarks: 3, comment: 'Stomatal loss of water' },
        { criterion: 'Environmental Factors (Temp/Wind)', marksAwarded: 2, maxMarks: 2, comment: 'Both factors correct' }
      ]
    }
  },
  {
    id: 'q10',
    questionNumber: '10',
    text: 'Explain how the structure of xylem vessels facilitates water transport in plants (mention one structural feature and its role).',
    maxMarks: 5,
    scoredMarks: 4.5,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q10',
      detectedQuestionId: '10',
      pageIndex: 2,
      confidenceScore: 0.93,
      matched: true,
      boundingBox: { ymin: 390, xmin: 30, ymax: 480, xmax: 960 },
      extractedAnswerText: 'Xylem vessels are hollow, continuous dead tubes without end walls. Cell walls are thick and reinforced with lignin, which prevents collapse under suction tension.',
      aiFeedback: 'Correctly highlighted lignified walls preventing collapse under negative tension.',
      rubricBreakdown: [
        { criterion: 'Structural Feature (Lignin)', marksAwarded: 2, maxMarks: 2, comment: 'Lignin stated' },
        { criterion: 'Role in Water Transport', marksAwarded: 2.5, maxMarks: 3, comment: 'Pressure resistance explained' }
      ]
    }
  },
  {
    id: 'q11a',
    questionNumber: '11(a)',
    text: 'A diagram shows two potted plants — Plant A in bright light with broad green leaves, Plant B kept in dim light with pale, elongated leaves.',
    maxMarks: 2,
    scoredMarks: 2,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q11a',
      detectedQuestionId: '11(a)',
      pageIndex: 3,
      confidenceScore: 0.96,
      matched: true,
      boundingBox: { ymin: 260, xmin: 30, ymax: 350, xmax: 960 },
      extractedAnswerText: 'Plant B undergoes etiolation due to lack of sunlight, causing pale stems, reduced chlorophyll synthesis, and weak elongation.',
      aiFeedback: 'Correctly diagnosed etiolation condition caused by light deprivation.',
      rubricBreakdown: [
        { criterion: 'Etiolation Identification', marksAwarded: 2, maxMarks: 2, comment: 'Accurate biological diagnosis' }
      ]
    }
  },
  {
    id: 'q11b',
    questionNumber: '11(b)',
    text: 'Suggest one practical measure to help Plant B recover.',
    maxMarks: 3,
    scoredMarks: 2,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q11b',
      detectedQuestionId: '11(b)',
      pageIndex: 3,
      confidenceScore: 0.85,
      matched: true,
      boundingBox: { ymin: 360, xmin: 30, ymax: 420, xmax: 960 },
      extractedAnswerText: 'Give water and move Plant B to bright sunlight.',
      aiFeedback: 'Correct measure provided! Highlighted sunlight relocation as key recovery action.',
      rubricBreakdown: [
        { criterion: 'Sunlight Relocation Solution', marksAwarded: 2, maxMarks: 3, comment: 'Light source relocation identified' }
      ]
    }
  },
  {
    id: 'q12',
    questionNumber: '12',
    text: 'A resting person has tidal volume (air per breath) of 0.5 L and breathes 12 times per minute.',
    maxMarks: 5,
    scoredMarks: 5,
    status: 'Answered',
    mapping: {
      answerId: 'ans_q12',
      detectedQuestionId: '12',
      pageIndex: 3,
      confidenceScore: 0.92,
      matched: true,
      boundingBox: { ymin: 430, xmin: 30, ymax: 500, xmax: 960 },
      extractedAnswerText: 'Total minute ventilation = Tidal volume x Breathing rate = 0.5 L x 12 = 6.0 L/min.',
      aiFeedback: 'Correct calculation of pulmonary minute ventilation (6.0 Litres/min).',
      rubricBreakdown: [
        { criterion: 'Minute Ventilation Calculation', marksAwarded: 5, maxMarks: 5, comment: 'Formula and calculation correct' }
      ]
    }
  },
  {
    id: 'q13',
    questionNumber: '13',
    text: 'If dead space is 0.15 L per breath, calculate the alveolar ventilation per minute. Show working.',
    maxMarks: 5,
    scoredMarks: 5,
    status: 'Out of Order',
    mapping: {
      answerId: 'ans_q13',
      detectedQuestionId: '13',
      pageIndex: 3,
      confidenceScore: 0.94,
      matched: true,
      boundingBox: { ymin: 70, xmin: 90, ymax: 230, xmax: 960 },
      extractedAnswerText: 'Ans Q13 (Attempted out of numerical order): Dead space = 0.15 L. Fresh air per breath = 0.5 - 0.15 = 0.35 L. Alveolar Ventilation = 0.35 L x 12 breaths/min = 4.2 L/min.',
      aiFeedback: 'Accurate alveolar ventilation calculation subtracting anatomical dead space volume. Successfully detected out-of-order student attempt on Page 4.',
      outOfOrderSequenceNote: 'Attempted on Page 4 out of numerical order at top of page before Q11(a).',
      rubricBreakdown: [
        { criterion: 'Dead Space Subtraction', marksAwarded: 2, maxMarks: 2, comment: 'Correct formula' },
        { criterion: 'Final Alveolar Rate (4.2 L/min)', marksAwarded: 3, maxMarks: 3, comment: 'Calculation verified' }
      ]
    }
  }
];

export function getSampleQuestionPaperFile(): FileItem {
  return {
    id: 'sample-qp-1',
    name: 'Class_10_biology_midterm.pdf',
    size: 2000000,
    type: 'application/pdf',
    pageCount: 1,
    pages: [createSampleQuestionPaperSvg()],
    isPdf: true
  };
}

export function getSampleAnswerSheetFile(): FileItem {
  return {
    id: 'sample-ans-1',
    name: 'student_1_answer_sheet.pdf',
    size: 5000000,
    type: 'application/pdf',
    pageCount: 4,
    pages: [
      createSampleAnswerSheetPage1Svg(),
      createSampleAnswerSheetPage2Svg(),
      createSampleAnswerSheetPage3Svg(),
      createSampleAnswerSheetPage4Svg(),
    ],
    isPdf: true
  };
}
