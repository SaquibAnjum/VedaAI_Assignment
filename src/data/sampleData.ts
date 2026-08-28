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
 * Creates SVG Data URL for Page 1 of Handwritten Answer Sheet (Biology Photosynthesis)
 */
function createSampleAnswerSheetPage1Svg(): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" style="background:#fcfbf7; font-family:'Caveat', 'Comic Sans MS', cursive, sans-serif;">
    <rect width="800" height="1100" fill="#fffdf9"/>
    <!-- Red margin line -->
    <line x1="80" y1="0" x2="80" y2="1100" stroke="#fca5a5" stroke-width="2"/>
    
    <!-- Notebook lines -->
    ${Array.from({ length: 33 }).map((_, i) => `<line x1="0" y1="${70 + i * 30}" x2="800" y2="${70 + i * 30}" stroke="#e2e8f0" stroke-width="1"/>`).join('')}

    <!-- Answer Q1 -->
    <g transform="translate(0, 0)">
      <text x="25" y="100" font-size="24" font-weight="bold" fill="#1d4ed8">Q1.</text>
      <text x="100" y="100" font-size="22" fill="#1e293b">Photosynthesis is the process used by green plants and some other</text>
      <text x="100" y="130" font-size="22" fill="#1e293b">organisms to convert light energy into chemical energy.</text>
      
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
      <text x="25" y="475" font-size="24" font-weight="bold" fill="#1d4ed8">Q2.</text>
      <text x="100" y="475" font-size="22" fill="#1e293b">The process mainly occurs in the chloroplast of the plant cell.</text>
      <text x="100" y="505" font-size="22" fill="#1e293b">It has two main stages:</text>
      <text x="120" y="535" font-size="22" fill="#1e293b">1. Light reaction — Captures light energy.</text>
      <text x="120" y="565" font-size="22" fill="#1e293b">2. Dark reaction — Uses energy to make glucose.</text>

      <line x1="100" y1="590" x2="750" y2="590" stroke="#cbd5e1" stroke-dasharray="4" stroke-width="1"/>
    </g>

    <!-- Answer Q3 duplicate layout -->
    <g transform="translate(0, 0)">
      <text x="25" y="625" font-size="24" font-weight="bold" fill="#1d4ed8">Q3.</text>
      <text x="100" y="625" font-size="22" fill="#1e293b">Chloroplasts contain chlorophyll pigment inside thylakoid membranes.</text>
      <text x="100" y="655" font-size="22" fill="#1e293b">Light dependent reactions produce ATP &amp; NADPH.</text>
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
      pageIndex: 0,
      confidenceScore: 0.98,
      boundingBox: { ymin: 75, xmin: 30, ymax: 135, xmax: 950 },
      extractedAnswerText: 'Arteries carry oxygenated blood away from the heart under high pressure.',
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
      pageIndex: 0,
      confidenceScore: 0.99,
      boundingBox: { ymin: 145, xmin: 30, ymax: 430, xmax: 950 },
      extractedAnswerText: 'The process mainly occurs in the chloroplast of the plant cell. It has two main stages: 1. Light reaction - Captures light energy. 2. Dark reaction - Uses energy to make glucose.',
      aiFeedback: 'Excellent work! You correctly identified the chloroplast as the organelle responsible for photosynthesis. Keep it up!',
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
      pageIndex: 0,
      confidenceScore: 0.96,
      boundingBox: { ymin: 445, xmin: 30, ymax: 580, xmax: 950 },
      extractedAnswerText: 'Chloroplasts contain chlorophyll pigment inside thylakoid membranes. Light dependent reactions produce ATP & NADPH.',
      aiFeedback: 'Well structured answer detailing thylakoid membranes and light-dependent energy carriers (ATP/NADPH).',
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
    scoredMarks: 0,
    status: 'Answered',
    mapping: {
      pageIndex: 0,
      confidenceScore: 0.88,
      boundingBox: { ymin: 595, xmin: 30, ymax: 660, xmax: 950 },
      extractedAnswerText: 'Blood enters heart from vena cava to atrium.',
      aiFeedback: 'Incomplete sequence. Missed tricuspid valve, right ventricle, pulmonary artery, bicuspid valve, and aortic valve.',
      rubricBreakdown: [
        { criterion: 'Heart Chamber Sequence', marksAwarded: 0, maxMarks: 1, comment: 'Incomplete chamber order' },
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
      pageIndex: 0,
      confidenceScore: 0.94,
      boundingBox: { ymin: 670, xmin: 30, ymax: 750, xmax: 950 },
      extractedAnswerText: '[Alveolus diagram drawn with capillary network and CO2/O2 exchange arrows]',
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
      pageIndex: 0,
      confidenceScore: 0.91,
      boundingBox: { ymin: 760, xmin: 30, ymax: 850, xmax: 950 },
      extractedAnswerText: '[Digestive system sketch with stomach, liver, pancreas, small & large intestine labelled]',
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
      pageIndex: 0,
      confidenceScore: 0.97,
      boundingBox: { ymin: 860, xmin: 30, ymax: 930, xmax: 950 },
      extractedAnswerText: '[Full Nephron diagram showing Bowman\'s capsule, glomerulus, loop of Henle]',
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
    scoredMarks: 3,
    status: 'Answered',
    mapping: {
      pageIndex: 0,
      confidenceScore: 0.89,
      boundingBox: { ymin: 940, xmin: 30, ymax: 990, xmax: 950 },
      extractedAnswerText: 'Palisade layer has tightly packed cells with chloroplasts. Spongy layer has air spaces for gas exchange.',
      aiFeedback: 'Good distinction of cell packing density and air spaces.',
      rubricBreakdown: [
        { criterion: 'Palisade Mesophyll structure', marksAwarded: 1.5, maxMarks: 2.5, comment: 'Stated cell packing' },
        { criterion: 'Spongy Mesophyll gas spaces', marksAwarded: 1.5, maxMarks: 2.5, comment: 'Air spaces mentioned' }
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
      pageIndex: 0,
      confidenceScore: 0.95,
      boundingBox: { ymin: 995, xmin: 30, ymax: 1040, xmax: 950 },
      extractedAnswerText: 'Transpiration is the evaporation of water from stomata. Temperature and wind speed increase the rate.',
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
    scoredMarks: 4,
    status: 'Answered',
    mapping: {
      pageIndex: 0,
      confidenceScore: 0.93,
      boundingBox: { ymin: 1045, xmin: 30, ymax: 1090, xmax: 950 },
      extractedAnswerText: 'Xylem vessels are hollow dead tubes with lignin walls to withstand suction pressure.',
      aiFeedback: 'Correctly highlighted lignified walls preventing collapse under negative tension.',
      rubricBreakdown: [
        { criterion: 'Structural Feature (Lignin)', marksAwarded: 2, maxMarks: 2, comment: 'Lignin stated' },
        { criterion: 'Role in Water Transport', marksAwarded: 2, maxMarks: 3, comment: 'Pressure resistance explained' }
      ]
    }
  },
  {
    id: 'q11a',
    questionNumber: '11 a.',
    text: 'A diagram shows two potted plants — Plant A in bright light with broad green leaves, Plant B kept in dim light with pale, elongated leaves.',
    maxMarks: 2,
    scoredMarks: 2,
    status: 'Answered',
    mapping: {
      pageIndex: 0,
      confidenceScore: 0.96,
      boundingBox: { ymin: 1095, xmin: 30, ymax: 1140, xmax: 950 },
      extractedAnswerText: 'Plant B undergoes etiolation due to lack of sunlight, causing pale stems and weak leaves.',
      aiFeedback: 'Correctly diagnosed etiolation condition caused by light deprivation.',
      rubricBreakdown: [
        { criterion: 'Etiolation Identification', marksAwarded: 2, maxMarks: 2, comment: 'Accurate biological diagnosis' }
      ]
    }
  },
  {
    id: 'q11b',
    questionNumber: '11 b.',
    text: 'Suggest one practical measure to help Plant B recover.',
    maxMarks: 3,
    scoredMarks: 1,
    status: 'Answered',
    mapping: {
      pageIndex: 0,
      confidenceScore: 0.85,
      boundingBox: { ymin: 1145, xmin: 30, ymax: 1180, xmax: 950 },
      extractedAnswerText: 'Give water.',
      aiFeedback: 'Partial mark. Water helps, but moving the plant to adequate sunlight is the required primary recovery measure.',
      rubricBreakdown: [
        { criterion: 'Sunlight Relocation Solution', marksAwarded: 1, maxMarks: 3, comment: 'Light source needed' }
      ]
    }
  },
  {
    id: 'q12',
    questionNumber: '12',
    text: 'A resting person has tidal volume (air per breath) of 0.5 L and breathes 12 times per minute.',
    maxMarks: 5,
    scoredMarks: 4,
    status: 'Answered',
    mapping: {
      pageIndex: 0,
      confidenceScore: 0.92,
      boundingBox: { ymin: 1185, xmin: 30, ymax: 1220, xmax: 950 },
      extractedAnswerText: 'Total minute ventilation = 0.5 L x 12 = 6.0 L/min.',
      aiFeedback: 'Correct calculation of pulmonary minute ventilation (6.0 Litres/min).',
      rubricBreakdown: [
        { criterion: 'Minute Ventilation Calculation', marksAwarded: 4, maxMarks: 5, comment: 'Formula and calculation correct' }
      ]
    }
  },
  {
    id: 'q13',
    questionNumber: '13',
    text: 'If dead space is 0.15 L per breath, calculate the alveolar ventilation per minute. Show working.',
    maxMarks: 5,
    scoredMarks: 4,
    status: 'Answered',
    mapping: {
      pageIndex: 0,
      confidenceScore: 0.94,
      boundingBox: { ymin: 1225, xmin: 30, ymax: 1280, xmax: 950 },
      extractedAnswerText: 'Alveolar ventilation = (0.5 - 0.15) x 12 = 0.35 x 12 = 4.2 L/min.',
      aiFeedback: 'Accurate alveolar ventilation calculation subtracting anatomical dead space volume.',
      rubricBreakdown: [
        { criterion: 'Dead Space Subtraction', marksAwarded: 2, maxMarks: 2, comment: 'Correct formula' },
        { criterion: 'Final Alveolar Rate (4.2 L/min)', marksAwarded: 2, maxMarks: 3, comment: 'Calculation verified' }
      ]
    }
  }
];

export function getSampleQuestionPaperFile(): FileItem {
  return {
    id: 'sample-qp-1',
    name: 'Class_10_maths_unit_test.pdf',
    size: 2000000,
    type: 'application/pdf',
    pageCount: 2,
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
    pages: [createSampleAnswerSheetPage1Svg()],
    isPdf: true
  };
}
