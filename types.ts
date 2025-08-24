
export enum CategoryId {
  RISK_FACTORS = 'risk-factors',
  INITIAL_INJURY = 'initial-injury',
  PATHOPHYSIOLOGY = 'pathophysiology',
  COMPENSATORY_MECHANISM = 'compensatory-mechanism',
  COUNTER_REGULATORY = 'counter-regulatory',
  MALADAPTIVE_OUTCOME = 'maladaptive-outcome',
  SYMPTOMS = 'symptoms'
}

export interface Intervention {
  title: string;
  description: string;
}

export interface DiagramNode {
  id: string;
  label: string[];
  examples?: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  category: CategoryId;
  explanation: string;
  interventions: {
    pharmacological: Intervention[];
    nonPharmacological: Intervention[];
  };
}

export interface DiagramConnection {
  from: string;
  to: string;
  lineStyle?: 'solid' | 'dashed';
  type?: 'primary' | 'feedback';
}

export interface Category {
  id: CategoryId;
  name: string;
  color: string;
  textColor: string;
}