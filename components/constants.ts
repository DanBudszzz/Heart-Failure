import { CategoryId, DiagramNode, DiagramConnection, Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: CategoryId.RISK_FACTORS, name: 'Risk Factors', color: 'bg-gray-500', textColor: 'text-white' },
  { id: CategoryId.INITIAL_INJURY, name: 'Initial Injury / Cause', color: 'bg-red-600', textColor: 'text-white' },
  { id: CategoryId.PATHOPHYSIOLOGY, name: 'Core Pathophysiology', color: 'bg-orange-500', textColor: 'text-white' },
  { id: CategoryId.COMPENSATORY_MECHANISM, name: 'Compensatory Mechanisms', color: 'bg-blue-600', textColor: 'text-white' },
  { id: CategoryId.COUNTER_REGULATORY, name: 'Counter-Regulatory', color: 'bg-green-500', textColor: 'text-white' },
  { id: CategoryId.MALADAPTIVE_OUTCOME, name: 'Maladaptive Outcomes', color: 'bg-purple-700', textColor: 'text-white' },
  { id: CategoryId.SYMPTOMS, name: 'Clinical Manifestations', color: 'bg-teal-600', textColor: 'text-white' },
];

export const DIAGRAM_NODES: DiagramNode[] = [
  // ROW 1: Risk Factors
  {
    id: 'non-modifiable-rf',
    label: ['Non-Modifiable', 'Risk Factors'],
    examples: ['Advancing Age', 'Male Sex', 'Genetics/Family Hx'],
    x: 400, y: 10, width: 170, height: 135,
    category: CategoryId.RISK_FACTORS,
    explanation: 'These are intrinsic risk factors that cannot be altered, establishing a baseline susceptibility. Key examples include advancing age, associated with increased cardiac stiffness and reduced physiological reserve; male sex (though post-menopausal women have a similar risk); and a direct family history of cardiomyopathy, which may indicate a genetic predisposition (e.g., mutations in titin, myosin heavy chain).',
    interventions: { pharmacological: [], nonPharmacological: [{ title: 'Genetic Counseling & Family Screening', description: 'For patients with suspected inherited cardiomyopathy (e.g., hypertrophic cardiomyopathy, arrhythmogenic right ventricular cardiomyopathy), genetic testing can confirm the diagnosis, identify at-risk family members, and guide management decisions, such as implantable defibrillator placement.' }] }
  },
  {
    id: 'modifiable-rf',
    label: ['Modifiable', 'Risk Factors'],
    examples: ['Hypertension', 'Coronary Artery Disease', 'Diabetes Mellitus', 'Obesity, Smoking'],
    x: 1000, y: 10, width: 170, height: 135,
    category: CategoryId.RISK_FACTORS,
    explanation: 'These factors represent the primary opportunity for heart failure prevention. Chronic hypertension exerts excessive pressure load, leading to left ventricular hypertrophy. Coronary artery disease (CAD) leads to ischemia and infarction. Diabetes mellitus accelerates atherosclerosis and can cause a specific diabetic cardiomyopathy. Obesity, smoking, and a sedentary lifestyle contribute through inflammation, metabolic stress, and direct cardiac strain. Aggressive management is paramount.',
    interventions: {
      pharmacological: [
        { title: 'Antihypertensives (e.g., ACEi, ARBs)', description: 'Controlling blood pressure to a target of <130/80 mmHg is crucial to reduce the chronic strain that leads to left ventricular hypertrophy and eventual failure.' },
        { title: 'Statins & Antiplatelets', description: 'For CAD, statins lower LDL cholesterol to stabilize atherosclerotic plaques, while antiplatelets like aspirin prevent thrombotic events.' },
        { title: 'Glycemic Control (e.g., SGLT2i, GLP-1 RA)', description: 'Modern diabetes drugs not only control blood sugar but have demonstrated direct cardiovascular benefits, reducing the risk of heart failure hospitalizations.' },
      ],
      nonPharmacological: [{ title: 'Therapeutic Lifestyle Changes (TLC)', description: 'A cornerstone of prevention involving a heart-healthy diet (DASH, Mediterranean), achieving a healthy weight (BMI <25), smoking cessation, and engaging in at least 150 minutes of moderate-intensity exercise per week.' }]
    }
  },
  // ROW 2: Initial Injury
  {
    id: 'initial-injury',
    label: ['Initial Myocardial', 'Injury'],
    examples: ['Myocardial Infarction', 'Valvular Disease', 'Toxins (e.g., Alcohol)', 'Myocarditis'],
    x: 700, y: 175, width: 170, height: 135,
    category: CategoryId.INITIAL_INJURY,
    explanation: 'This is the precipitating event that impairs the heart\'s structure or function. It can be an acute event, like a myocardial infarction (heart attack) causing abrupt death of cardiomyocytes, or a chronic insult, like valvular disease causing persistent volume/pressure overload. Other causes include direct toxins (e.g., excessive alcohol, certain chemotherapy agents like doxorubicin), viral myocarditis, or the manifestation of a genetic cardiomyopathy.',
    interventions: {
      pharmacological: [
        { title: 'Reperfusion Therapy (MI)', description: 'In an acute heart attack, the immediate goal is to restore blood flow to the ischemic myocardium. This is done via percutaneous coronary intervention (PCI) with stenting or, if unavailable, thrombolytic (clot-busting) drugs. Time is muscle; the faster reperfusion occurs, the more heart muscle is salvaged.' },
      ],
      nonPharmacological: [
        { title: 'Surgical/Transcatheter Valve Repair/Replacement', description: 'Correcting a severely stenotic (narrowed) or regurgitant (leaky) valve eliminates the hemodynamic stressor, allowing the heart to potentially recover or preventing further deterioration.' },
      ],
    },
  },
  // ROW 3: Core Pathophysiology
  {
    id: 'decreased-co',
    label: ['Decreased', 'Cardiac Output'],
    x: 700, y: 340, width: 170, height: 60,
    category: CategoryId.PATHOPHYSIOLOGY,
    explanation: 'The immediate hemodynamic consequence of myocardial injury. Cardiac output (Heart Rate x Stroke Volume) falls because the damaged ventricle cannot pump effectively (reduced stroke volume). The body\'s organ systems, particularly the kidneys and brain, sense this reduction in blood flow (hypoperfusion). This is interpreted as a critical threat, triggering a cascade of powerful, evolutionarily ancient compensatory mechanisms designed to maintain blood pressure and perfusion in the short term.',
    interventions: {
      pharmacological: [
        { title: 'Positive Inotropes (Dobutamine, Milrinone)', description: 'Used only in acute, severe situations like cardiogenic shock. They directly increase myocardial contractility to boost cardiac output. **Scenario where they are harmful:** Long-term use increases mortality. They significantly raise myocardial oxygen consumption and can provoke life-threatening arrhythmias. They are a temporary bridge, not a chronic solution.' },
      ],
      nonPharmacological: [
        { title: 'Cardiac Resynchronization Therapy (CRT)', description: 'In patients with a wide QRS (e.g., Left Bundle Branch Block), dyssynchronous contraction wastes energy and worsens output. A CRT (biventricular) pacemaker paces both ventricles simultaneously, improving coordination and efficiency, thereby increasing cardiac output.' },
      ],
    },
  },
  // ROW 4: Compensatory and Counter-Regulatory
  {
    id: 'sns-activation',
    label: ['Sympathetic Nervous', 'System (SNS) Activation'],
    x: 100, y: 430, width: 180, height: 60,
    category: CategoryId.COMPENSATORY_MECHANISM,
    explanation: 'Baroreceptors in the aortic arch and carotid sinuses detect low blood pressure, triggering a massive release of catecholamines (norepinephrine, epinephrine). This increases heart rate, enhances contractility, and causes potent peripheral vasoconstriction to divert blood to core organs. While life-saving in acute blood loss, chronic activation is highly toxic, increasing myocardial oxygen demand, promoting arrhythmias, and directly damaging cardiomyocytes.',
    interventions: {
      pharmacological: [
        { title: 'Guideline-Directed Beta-Blockers (e.g., Metoprolol Succinate, Carvedilol, Bisoprolol)', description: 'A cornerstone of HFrEF therapy. They block beta-adrenergic receptors on the heart, protecting it from chronic catecholamine toxicity, slowing the heart rate to improve diastolic filling time, and helping reverse remodeling. **Scenario where they may not work or be harmful:** They must be initiated "low and slow" in stable, euvolemic patients. Giving them to a patient in acute decompensated heart failure with severe fluid overload and low output can precipitate cardiogenic shock due to their negative inotropic effects. They are contraindicated in symptomatic bradycardia or high-degree AV block.' },
      ],
      nonPharmacological: []
    }
  },
  {
    id: 'natriuretic-peptides',
    label: ['Natriuretic Peptide', 'Release (ANP, BNP)'],
    x: 700, y: 430, width: 180, height: 60,
    category: CategoryId.COUNTER_REGULATORY,
    explanation: 'This is the body\'s "braking" system. In response to ventricular stretch from high volume and pressure, the heart releases B-type Natriuretic Peptide (BNP) and Atrial Natriuretic Peptide (ANP). These beneficial hormones promote vasodilation and natriuresis/diuresis (excretion of salt and water by the kidneys), directly counteracting the harmful effects of the RAAS and SNS. In chronic HF, this protective system is overwhelmed by the compensatory mechanisms.',
    interventions: {
      pharmacological: [
        { title: 'ARNI (Angiotensin Receptor-Neprilysin Inhibitor - Sacubitril/Valsartan)', description: 'A breakthrough therapy. The valsartan blocks the RAAS, while sacubitril inhibits neprilysin, the enzyme that degrades natriuretic peptides. This "dual-mechanism" approach simultaneously blocks the bad system and boosts the good system, proving superior to RAAS inhibition alone in reducing mortality and hospitalization.' },
      ],
      nonPharmacological: []
    }
  },
  {
    id: 'raas-adh-activation',
    label: ['RAAS & Vasopressin', '(ADH) Activation'],
    x: 1300, y: 430, width: 180, height: 60,
    category: CategoryId.COMPENSATORY_MECHANISM,
    explanation: 'Decreased blood flow to the kidneys is a powerful stimulus for the Renin-Angiotensin-Aldosterone System (RAAS). Angiotensin II is a potent vasoconstrictor and stimulates the release of aldosterone, which causes the kidneys to retain sodium and water. Concurrently, non-osmotic stimuli trigger vasopressin (ADH) release, promoting free water retention. The net effect is an increase in blood volume and pressure, which severely exacerbates cardiac workload.',
    interventions: {
      pharmacological: [
        { title: 'ACE Inhibitors / ARBs / ARNIs', description: 'These classes are fundamental to blocking the RAAS cascade. They reduce vasoconstriction (afterload) and sodium/water retention (preload), leading to profound mortality benefits.' },
        { title: 'Mineralocorticoid Receptor Antagonists (MRA - Spironolactone/Eplerenone)', description: 'Specifically blocks aldosterone\'s effects in the kidney, promoting diuresis and preventing cardiac fibrosis. **Scenario where they are harmful:** They can cause life-threatening hyperkalemia (high potassium). They are contraindicated in patients with significant renal impairment (e.g., eGFR < 30) or baseline high potassium (>5.0 mEq/L), and potassium levels must be monitored closely, especially when used with an ACEi/ARB.' },
      ],
      nonPharmacological: []
    }
  },
  // ROW 5: Downstream consequences
  {
    id: 'inflammation',
    label: ['Inflammation &', 'Oxidative Stress'],
    x: 400, y: 520, width: 180, height: 60,
    category: CategoryId.MALADAPTIVE_OUTCOME,
    explanation: 'Neurohormonal activation is not just a hemodynamic issue. Angiotensin II and catecholamines are pro-inflammatory, stimulating the production of cytokines like TNF-alpha and IL-6. This, combined with tissue hypoperfusion, creates a state of systemic inflammation and oxidative stress, which further damages endothelial cells and cardiomyocytes, accelerating the process of adverse remodeling.',
    interventions: {
      pharmacological: [
        { title: 'Statins', description: 'Beyond their lipid-lowering effects, statins have pleiotropic anti-inflammatory properties that may contribute to their benefit in patients with ischemic cardiomyopathy.' },
        { title: 'SGLT2 Inhibitors', description: 'Part of their profound benefit is thought to stem from reducing oxidative stress and inflammation within the myocardium, in addition to their metabolic and hemodynamic effects.' }
      ],
      nonPharmacological: []
    }
  },
   {
    id: 'endothelial-dysfunction',
    label: ['Endothelial', 'Dysfunction'],
    x: 950, y: 520, width: 180, height: 60,
    category: CategoryId.MALADAPTIVE_OUTCOME,
    explanation: 'The endothelium, the inner lining of blood vessels, is an active organ. In heart failure, the combination of low flow states and high levels of angiotensin II and norepinephrine impairs its function. This leads to reduced production of the vasodilator nitric oxide and increased production of vasoconstrictors like endothelin-1, contributing to elevated systemic vascular resistance (afterload).',
    interventions: {
      pharmacological: [
        { title: 'ACE Inhibitors / ARBs', description: 'By blocking Angiotensin II, these drugs improve endothelial function, helping to restore a more favorable balance of vasodilators and vasoconstrictors.' },
      ],
      nonPharmacological: [
        { title: 'Exercise Training', description: 'Regular aerobic exercise is one of the most potent stimuli for improving endothelial function by increasing nitric oxide bioavailability.' },
      ]
    }
  },

  // ROW 6: Remodeling & Vicious Cycles
  {
    id: 'remodeling-fibrosis',
    label: ['Myocardial Fibrosis', '& Hypertrophy'],
    x: 100, y: 700, width: 180, height: 60,
    category: CategoryId.MALADAPTIVE_OUTCOME,
    explanation: 'In response to chronic pressure overload and neurohormonal stimulation, individual cardiomyocytes enlarge (hypertrophy) and fibroblasts deposit excess collagen (fibrosis). This makes the ventricular wall thick and stiff, impairing its ability to relax and fill (diastolic dysfunction). While initially a compensatory mechanism to normalize wall stress, it eventually becomes maladaptive, leading to a less compliant and inefficient heart.',
    interventions: {
      pharmacological: [
        { title: 'MRAs (Spironolactone/Eplerenone)', description: 'Have a specific, well-documented effect on reducing myocardial fibrosis, which is a key part of their mortality benefit beyond their diuretic action.' },
      ],
      nonPharmacological: []
    }
  },
  {
    id: 'energy-starvation',
    label: ['Myocardial Energy', 'Starvation'],
    x: 700, y: 610, width: 180, height: 60,
    category: CategoryId.MALADAPTIVE_OUTCOME,
    explanation: 'The failing heart is metabolically inefficient. It shifts from using efficient fatty acids for fuel to less efficient glucose oxidation. Mitochondrial function is impaired, and the production of ATP (the cell\'s energy currency) cannot keep up with the demands of the chronically stressed myocardium. This energy deficit further weakens contractility and perpetuates a vicious cycle of pump failure.',
     interventions: {
      pharmacological: [
        { title: 'SGLT2 inhibitors (Dapagliflozin/Empagliflozin)', description: 'A cornerstone therapy. Their benefit is multi-factorial, but one proposed mechanism is that they improve cardiac energetics by promoting a shift to more efficient fuel sources like ketone bodies, helping to alleviate the energy-starved state of the failing heart.' },
      ],
      nonPharmacological: []
    }
  },
  {
    id: 'remodeling-dilation',
    label: ['Ventricular Dilation', '& Arrhythmias'],
    x: 1300, y: 700, width: 180, height: 60,
    category: CategoryId.MALADAPTIVE_OUTCOME,
    explanation: 'In response to chronic volume overload, the ventricle enlarges and becomes more spherical (dilation). This increases wall stress (Laplace\'s law), further impairing contractility. The stretched, fibrotic myocardium also becomes electrically unstable, creating circuits for re-entrant ventricular tachycardia and fibrillation, which are the primary causes of sudden cardiac death in this population.',
     interventions: {
      pharmacological: [
         { title: 'Amiodarone', description: 'An antiarrhythmic drug used to suppress ventricular arrhythmias. It is often used in HF patients because it does not have the negative inotropic effects of many other antiarrhythmics. However, it has significant long-term toxicities (thyroid, lung, liver).' },
      ],
      nonPharmacological: [
        { title: 'Implantable Cardioverter-Defibrillator (ICD)', description: 'A life-saving device for primary prevention of sudden cardiac death in patients with low ejection fraction (<35%). It does not treat heart failure but monitors the heart rhythm and delivers a shock to terminate a lethal arrhythmia.' },
      ]
    }
  },

  // ROW 7: Worsening HF
  {
    id: 'worsening-hf',
    label: ['Progressive', 'Worsening of HF'],
    x: 700, y: 790, width: 170, height: 60,
    category: CategoryId.PATHOPHYSIOLOGY,
    explanation: 'This represents the culmination of all the maladaptive processes. The self-perpetuating cycles of decreased output, neurohormonal activation, and adverse remodeling lead to an inexorable decline in cardiac function. The heart becomes progressively weaker and less responsive to standard therapies, marking the transition to advanced or end-stage heart failure.',
    interventions: {
      pharmacological: [
        { title: 'Palliative Care Consultation', description: 'Focuses on improving quality of life by managing symptoms like pain, dyspnea, and anxiety, and facilitating discussions about goals of care and end-of-life planning.' }
      ],
      nonPharmacological: [
        { title: 'LVAD / Heart Transplant', description: 'In eligible patients with end-stage disease, these are the definitive therapies. A Left Ventricular Assist Device (LVAD) is a mechanical pump that takes over the work of the left ventricle. A heart transplant replaces the failing heart. Both are major interventions reserved for the most severe cases.' },
      ]
    }
  },
  // ROW 8: Symptoms
  {
    id: 'congestion',
    label: ['Pulmonary &', 'Systemic Congestion'],
    x: 450, y: 880, width: 170, height: 60,
    category: CategoryId.SYMPTOMS,
    explanation: 'This "backward failure" is caused by elevated filling pressures from volume overload. When the left ventricle fails, pressure backs up into the lungs (pulmonary congestion), causing fluid to leak into the alveoli. This leads to dyspnea (shortness of breath), orthopnea (breathlessness when lying flat), and paroxysmal nocturnal dyspnea. When the right ventricle fails, pressure backs up into the systemic circulation, causing peripheral edema (swollen legs), ascites (abdominal fluid), and hepatomegaly.',
    interventions: {
      pharmacological: [
        { title: 'Loop Diuretics (Furosemide, Torsemide)', description: 'Essential for managing congestive symptoms by promoting renal excretion of salt and water, thereby reducing preload. They provide symptom relief but do not improve long-term mortality. **Scenario where they won\'t work:** In advanced HF, patients can develop "diuretic resistance" due to renal dysfunction and gut edema impairing oral absorption. This may require IV diuretics or combination therapy (e.g., adding a thiazide diuretic for sequential nephron blockade). Over-diuresis can cause dehydration and renal injury, paradoxically worsening RAAS activation.' },
      ],
      nonPharmacological: [
        { title: 'Sodium & Fluid Restriction', description: 'A crucial self-management strategy. A low sodium diet (<2g/day) is fundamental. Fluid restriction (<1.5-2L/day) is often necessary in severe or hyponatremic HF. **Scenario where interventions fail:** If a patient is non-adherent to diet, diuretic efficacy will be severely blunted, leading to a cycle of dose escalation and potential side effects without symptom improvement.' },
         { title: 'Daily Weight Monitoring', description: 'The single most important self-monitoring tool. A rapid gain of >3 lbs/1.5 kg in a day or >5 lbs/2.5 kg in a week signifies fluid retention and should prompt a call to their clinician, often for a pre-emptive diuretic dose adjustment.' },
      ]
    }
  },
  {
    id: 'low-output',
    label: ['Low Output', 'Symptoms'],
    x: 950, y: 880, width: 170, height: 60,
    category: CategoryId.SYMPTOMS,
    explanation: 'This "forward failure" results directly from the heart\'s inability to pump an adequate amount of oxygenated blood to the tissues. This leads to hypoperfusion of muscles and organs, causing profound fatigue, generalized weakness, and reduced exercise tolerance. In severe cases, it can lead to confusion or delirium (from poor brain perfusion) and cool, clammy extremities. These symptoms reflect a critical lack of metabolic supply to the body.',
    interventions: {
      pharmacological: [
        { title: 'Optimizing Guideline-Directed Medical Therapy (GDMT)', description: 'There is no single "low output" drug for chronic HF. The goal is to maximize doses of the foundational four pillars (ARNI/ACEi/ARB, Beta-Blocker, MRA, SGLT2i) as tolerated. Over time, these drugs improve cardiac function and therefore cardiac output.' },
      ],
      nonPharmacological: [
        { title: 'Cardiac Rehabilitation', description: 'A supervised exercise program helps improve peripheral muscle function and oxygen extraction, which can significantly improve exercise tolerance and quality of life even if central cardiac output doesn\'t change dramatically.' }
      ]
    }
  }
];

export const DIAGRAM_CONNECTIONS: DiagramConnection[] = [
  // Risk -> Injury
  { from: 'non-modifiable-rf', to: 'initial-injury' },
  { from: 'modifiable-rf', to: 'initial-injury' },
  
  // Injury -> CO
  { from: 'initial-injury', to: 'decreased-co' },
  
  // CO -> Compensatory Systems
  { from: 'decreased-co', to: 'sns-activation' },
  { from: 'decreased-co', to: 'raas-adh-activation' },
  { from: 'decreased-co', to: 'natriuretic-peptides' },
  
  // Counter-regulatory dashed lines
  { from: 'natriuretic-peptides', to: 'sns-activation', lineStyle: 'dashed' },
  { from: 'natriuretic-peptides', to: 'raas-adh-activation', lineStyle: 'dashed' },

  // Compensatory -> Downstream Consequences
  { from: 'sns-activation', to: 'inflammation' },
  { from: 'raas-adh-activation', to: 'inflammation' },
  { from: 'raas-adh-activation', to: 'endothelial-dysfunction' },
  { from: 'sns-activation', to: 'endothelial-dysfunction' },
  
  // Downstream Consequences & Direct Neurohormonal -> Remodeling
  { from: 'inflammation', to: 'remodeling-fibrosis' },
  { from: 'sns-activation', to: 'remodeling-fibrosis' },
  { from: 'raas-adh-activation', to: 'remodeling-fibrosis' },
  
  { from: 'endothelial-dysfunction', to: 'remodeling-dilation' },
  { from: 'raas-adh-activation', to: 'remodeling-dilation' },

  // Vicious Cycles (Remodeling -> Worsening CO)
  { from: 'remodeling-fibrosis', to: 'decreased-co', type: 'feedback' },
  { from: 'remodeling-dilation', to: 'decreased-co', type: 'feedback' },
  { from: 'energy-starvation', to: 'decreased-co', type: 'feedback' },

  // Remodeling -> Other outcomes
  { from: 'remodeling-fibrosis', to: 'energy-starvation' },
  { from: 'remodeling-dilation', to: 'energy-starvation' },
  
  { from: 'remodeling-dilation', to: 'worsening-hf' }, // Dilation and arrhythmia is a late-stage event
  { from: 'remodeling-fibrosis', to: 'remodeling-dilation' }, // Fibrosis leads to stiffer but eventually dilating heart
  
  // Worsening HF -> Symptoms
  { from: 'worsening-hf', to: 'congestion' },
  { from: 'worsening-hf', to: 'low-output' },

];