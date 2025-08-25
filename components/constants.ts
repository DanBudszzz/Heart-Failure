
import { CategoryId, DiagramNode, DiagramConnection, Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: CategoryId.FACTORS, name: 'Risk Factors', color: 'bg-orange-200', textColor: 'text-slate-800' },
  { id: CategoryId.PROCESS, name: 'Pathophysiological Process', color: 'bg-white', textColor: 'text-slate-800' },
  { id: CategoryId.SIGNS_SYMPTOMS, name: 'Clinical Signs & Symptoms', color: 'bg-red-500', textColor: 'text-white' },
  { id: CategoryId.MANAGEMENT, name: 'Pharmacological Mgt.', color: 'bg-amber-400', textColor: 'text-slate-800' },
  { id: CategoryId.NON_PHARM_MANAGEMENT, name: 'Non-Pharmacological Mgt.', color: 'bg-cyan-400', textColor: 'text-slate-800' },
  { id: CategoryId.POSITIVE_OUTCOMES, name: 'Positive Outcomes', color: 'bg-emerald-200', textColor: 'text-slate-800' },
  { id: CategoryId.NEGATIVE_OUTCOMES, name: 'Disease Progression', color: 'bg-slate-300', textColor: 'text-slate-800' },
];

export const DIAGRAM_NODES: DiagramNode[] = [
  // Factors
  {
    id: 'predisposing-factors',
    label: ['Predisposing Factors', '(Chronic Conditions)', '• Coronary Artery Disease', '• Hypertension', '• Valvular Disease', '• Diabetes Mellitus'],
    x: 20, y: 20, width: 380, height: 160,
    category: CategoryId.FACTORS,
    explanation: 'Long-term conditions that structurally or functionally impair the heart over time, setting the stage for heart failure. These factors weaken the heart muscle or increase its chronic workload.'
  },
  {
    id: 'precipitating-factors',
    label: ['Precipitating Factors', '(Acute Triggers - "FAILURE")', '• Forgot Meds / Non-compliance', '• Arrhythmia / Anemia', '• Ischemia / Infection', '• Lifestyle (↑ Salt/Fluid)', '• Uncontrolled Hypertension', '• Renal Failure / Embolism'],
    x: 560, y: 20, width: 380, height: 180,
    category: CategoryId.FACTORS,
    explanation: 'Acute events or conditions that place new, sudden stress on an already compromised heart, often leading to a rapid worsening of symptoms (acute decompensation). The "FAILURE" mnemonic is often used to remember these.'
  },

  // Core Pathophysiology
  {
    id: 'myocardial-injury',
    label: ['Initial Myocardial Injury', 'or Stress'],
    x: 280, y: 240, width: 380, height: 70,
    category: CategoryId.PROCESS,
    explanation: 'An event or chronic condition that impairs the heart\'s ability to pump blood effectively. This can be a direct injury (e.g., heart attack) or the cumulative effect of chronic factors (e.g., hypertension). This leads to **systolic dysfunction** (impaired contraction, causing HFrEF) or **diastolic dysfunction** (impaired relaxation/filling, causing HFpEF). This diagram primarily illustrates the HFrEF pathway.'
  },
  {
    id: 'decreased-co',
    label: ['Decreased Cardiac Output', '& Blood Pressure'],
    x: 280, y: 340, width: 380, height: 70,
    category: CategoryId.PROCESS,
    explanation: 'The weakened heart pumps less blood out to the body, leading to a drop in cardiac output and systemic blood pressure. The body perceives this as a state of circulatory collapse and activates compensatory mechanisms.'
  },
  {
    id: 'sns-activation',
    label: ['Sympathetic Nervous System', '(SNS) Activation', '• ↑ Heart Rate & Contractility', '• Vasoconstriction'],
    x: 20, y: 450, width: 280, height: 110,
    category: CategoryId.PROCESS,
    explanation: 'The body\'s "fight or flight" response is triggered to maintain blood pressure. It increases heart rate and the force of contraction, and constricts peripheral blood vessels. While helpful initially, this significantly increases the heart\'s workload and oxygen demand long-term. This harmful effect is targeted by **Beta-blocker** medications.'
  },
  {
    id: 'frank-starling-mechanism',
    label: ['Frank-Starling', 'Mechanism'],
    x: 330, y: 450, width: 280, height: 110,
    category: CategoryId.PROCESS,
    explanation: 'Increased filling volumes dilate the heart, enhancing contractility and stroke volume. Initially, this helps maintain cardiac output. However, this dilation comes at the expense of increased wall tension and higher oxygen demand on an already compromised myocardium, eventually contributing to worsening failure.'
  },
  {
    id: 'raas-activation',
    label: ['Renin-Angiotensin-Aldosterone', 'System (RAAS) Activation', '• Angiotensin II → Vaso.', '• Aldosterone → Na+ & H₂O'],
    x: 640, y: 450, width: 280, height: 110,
    category: CategoryId.PROCESS,
    explanation: 'The kidneys respond to low blood flow by activating the RAAS cascade. This leads to potent vasoconstriction and hormonal signals (aldosterone) that cause the body to retain salt and water, increasing blood volume. This maladaptive system is a primary target for medications like **ACE Inhibitors, ARBs, and Aldosterone Antagonists**.'
  },
  {
    id: 'increased-workload',
    label: ['Increased Cardiac Workload,', 'Preload, and Afterload'],
    x: 280, y: 600, width: 380, height: 70,
    category: CategoryId.PROCESS,
    explanation: 'The compensatory mechanisms lead to a vicious cycle. The heart must pump more blood (increased preload), against higher pressure (increased afterload), and at a faster rate (increased workload), causing further stress and damage.'
  },
  {
    id: 'cardiac-remodeling',
    label: ['Maladaptive Cardiac Remodeling', '(e.g., Hypertrophy, Dilation)'],
    x: 280, y: 700, width: 380, height: 80,
    category: CategoryId.PROCESS,
    explanation: 'Over time, the chronic stress causes the heart muscle to change its size and shape in an attempt to compensate. This remodeling (e.g., thickening of walls, enlargement of chambers) ultimately disrupts normal function, stiffens the heart, and further impairs its pumping ability.'
  },
  {
    id: 'worsening-hf',
    label: ['Progressive Worsening', 'of Pump Function'],
    x: 280, y: 810, width: 380, height: 70,
    category: CategoryId.PROCESS,
    explanation: 'The ongoing cycle of injury, harmful compensation, and maladaptive remodeling leads to a steady decline in the heart\'s ability to function as an effective pump, leading to the clinical syndrome of heart failure.'
  },

  // Clinical Syndromes
  {
    id: 'pulmonary-congestion',
    label: ['Pulmonary Congestion', '(Left-Sided Failure)'],
    x: 20, y: 920, width: 380, height: 70,
    category: CategoryId.PROCESS,
    explanation: 'When the left ventricle fails to pump blood forward to the body, it backs up into the pulmonary circulation. This increases pressure in the lung\'s blood vessels, causing fluid to leak into lung tissue and airspaces.'
  },
  {
    id: 'systemic-congestion',
    label: ['Systemic Venous Congestion', '(Right-Sided Failure)'],
    x: 560, y: 920, width: 380, height: 70,
    category: CategoryId.PROCESS,
    explanation: 'When the right ventricle fails to pump blood forward to the lungs, it backs up in the systemic venous circulation. This is most commonly a consequence of chronic left-sided failure creating high pressure in the pulmonary circuit. Isolated right-sided failure, often due to lung disease, is termed *cor pulmonale*. The increased venous pressure leads to fluid accumulation in the body\'s tissues and organs.'
  },

  // Manifestations and Symptoms
  {
    id: 'left-sided-symptoms',
    label: ['Left-Sided Manifestations:', '• Dyspnea & Crackles', '• Orthopnea', '• Paroxysmal Nocturnal Dyspnea'],
    x: 20, y: 1050, width: 300, height: 120,
    category: CategoryId.SIGNS_SYMPTOMS,
    explanation: 'Classic symptoms resulting from pulmonary congestion. Includes shortness of breath (dyspnea), difficulty breathing when lying flat (orthopnea), and waking up at night gasping for air (PND).'
  },
  {
    id: 'low-output-symptoms',
    label: ['Low Output Symptoms:', '• Fatigue & Weakness', '• Cool Extremities'],
    x: 340, y: 1050, width: 300, height: 120,
    category: CategoryId.SIGNS_SYMPTOMS,
    explanation: 'These symptoms are caused by the heart\'s inability to deliver adequate oxygenated blood to the muscles and other tissues, leading to a general feeling of tiredness and poor perfusion.'
  },
  {
    id: 'right-sided-symptoms',
    label: ['Right-Sided Manifestations:', '• Peripheral Edema', '• Jugular Venous Distension (JVD)', '• Hepatomegaly, Ascites'],
    x: 660, y: 1050, width: 300, height: 120,
    category: CategoryId.SIGNS_SYMPTOMS,
    explanation: 'Hallmark signs of systemic fluid overload. Includes swelling in the legs/ankles (edema), visible bulging of neck veins (JVD), and fluid accumulation in the liver and abdomen.'
  },
  
  {
    id: 'clinical-syndrome',
    label: ['Clinical Syndrome of', 'Heart Failure'],
    x: 280, y: 1210, width: 380, height: 70,
    category: CategoryId.PROCESS,
    explanation: 'The combination of left-sided, right-sided, and low-output signs and symptoms constitutes the clinical presentation of heart failure, which prompts therapeutic intervention.'
  },

  // Management
  {
    id: 'non-pharmacological-management',
    label: ['Non-Pharmacological Mgt.', '• Dietary Modification', '• Activity and Exercise', '• Weight Management', '• Lifestyle / Risk Control', '• Patient Education'],
    x: 280, y: 1320, width: 380, height: 160,
    category: CategoryId.NON_PHARM_MANAGEMENT,
    explanation: 'Cornerstone interventions that empower the patient and are essential for long-term success. They work in tandem with medications to reduce symptoms and prevent progression.\n\n**• Dietary Modification:** A low-sodium diet reduces water retention, which decreases blood volume (preload) and eases symptoms of congestion. Fluid restriction may be needed in severe cases.\n\n**• Activity and Exercise:** Graded, regular exercise improves cardiovascular efficiency and functional capacity. Rest periods are crucial to conserve energy and prevent overexertion.\n\n**• Weight Management:** Daily weight monitoring is vital to detect early signs of fluid retention. Maintaining an ideal body weight reduces the overall workload on the heart.\n\n**• Lifestyle Control:** Smoking cessation improves oxygenation and reduces vasoconstriction. Limiting alcohol prevents further heart muscle damage.\n\n**• Education:** Teaching patients and families to monitor symptoms, adhere to treatments, and recognize when to seek help is critical for self-management and reducing hospitalizations.'
  },
  {
    id: 'pharmacological-management',
    label: ['Pharmacological Management', '• Reduce Preload/Symptoms', '• Block RAAS & SNS Activation', '• Address Comorbidities'],
    x: 280, y: 1510, width: 380, height: 160,
    category: CategoryId.MANAGEMENT,
    explanation: 'Treatment targets the vicious cycle of heart failure. Each medication class interrupts a specific step:\n\n**1. Reduce Fluid Overload (Preload):**\n• **Diuretics (e.g., Furosemide/Lasix):** Remove excess salt and water to decrease blood volume, relieving congestion (pulmonary & systemic edema).\n\n**2. Block Neurohormonal Activation:**\n• **ACE Inhibitors (e.g., Enalapril) & ARBs (e.g., Losartan):** Cornerstones of therapy that block the RAAS system. This relaxes blood vessels (reducing afterload) and prevents fluid retention, helping to reverse harmful cardiac remodeling.\n• **Beta-blockers (e.g., Metoprolol):** Block the SNS, slowing the heart rate, lowering blood pressure, and reducing the heart\'s workload and oxygen demand.\n• **Aldosterone Antagonists (e.g., Spironolactone):** Blocks aldosterone (part of RAAS) to reduce fluid retention and prevent cardiac fibrosis.\n\n**3. Other Key Medications:**\n• **SGLT2 Inhibitors (e.g., Dapagliflozin):** Help remove glucose and fluid via urine, reducing preload and having protective effects on the heart and kidneys.\n• **Inotropes (e.g., Digoxin):** Used in select cases to increase the heart\'s pumping strength.'
  },
  // Outcomes
  {
    id: 'positive-outcomes',
    label: ['Positive Outcomes', '(Goals of Therapy)', '• Symptom Control', '• Improved Quality of Life', '• Reduced Hospitalizations'],
    x: 280, y: 1720, width: 380, height: 120,
    category: CategoryId.POSITIVE_OUTCOMES,
    explanation: 'Effective management aims to halt the progression of heart failure. By targeting the underlying mechanisms, treatments can significantly reduce symptoms, decrease the frequency of hospital admissions for acute decompensation, improve the patient\'s ability to perform daily activities, and ultimately prolong survival.'
  },
  {
    id: 'end-stage-hf',
    label: ['Progression to', 'End-Stage HF', '• Refractory Symptoms', '• Palliative Care', '• Advanced Therapies'],
    x: 280, y: 1900, width: 380, height: 120,
    category: CategoryId.NEGATIVE_OUTCOMES,
    explanation: 'Despite optimal medical therapy, heart failure can progress to an advanced stage where symptoms are severe and persistent at rest. At this point, the focus of care may shift towards palliative measures to manage symptoms and improve comfort, or considering advanced therapies such as heart transplantation or mechanical circulatory support (e.g., LVAD) for eligible candidates.'
  }
];

export const DIAGRAM_CONNECTIONS: DiagramConnection[] = [
  { from: 'predisposing-factors', to: 'myocardial-injury' },
  { from: 'precipitating-factors', to: 'myocardial-injury' },
  { from: 'myocardial-injury', to: 'decreased-co' },
  { from: 'decreased-co', to: 'sns-activation' },
  { from: 'decreased-co', to: 'raas-activation' },
  { from: 'decreased-co', to: 'frank-starling-mechanism' },
  { from: 'sns-activation', to: 'increased-workload' },
  { from: 'raas-activation', to: 'increased-workload' },
  { from: 'frank-starling-mechanism', to: 'increased-workload' },
  { from: 'increased-workload', to: 'cardiac-remodeling' },
  { from: 'cardiac-remodeling', to: 'worsening-hf' },
  { from: 'cardiac-remodeling', to: 'decreased-co', lineStyle: 'dashed' },
  { from: 'worsening-hf', to: 'pulmonary-congestion' },
  { from: 'worsening-hf', to: 'low-output-symptoms' },
  { from: 'pulmonary-congestion', to: 'left-sided-symptoms' },
  { from: 'pulmonary-congestion', to: 'systemic-congestion' },
  { from: 'systemic-congestion', to: 'right-sided-symptoms' },
  { from: 'left-sided-symptoms', to: 'clinical-syndrome' },
  { from: 'right-sided-symptoms', to: 'clinical-syndrome' },
  { from: 'low-output-symptoms', to: 'clinical-syndrome' },
  { from: 'clinical-syndrome', to: 'non-pharmacological-management' },
  { from: 'clinical-syndrome', to: 'pharmacological-management' },
  { from: 'pharmacological-management', to: 'positive-outcomes' },
  { from: 'non-pharmacological-management', to: 'positive-outcomes' },
  { from: 'worsening-hf', to: 'end-stage-hf', lineStyle: 'dashed' },
];