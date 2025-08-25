export enum CategoryId {
  FACTORS = 'factors',
  PROCESS = 'process',
  SIGNS_SYMPTOMS = 'signs-symptoms',
  MANAGEMENT = 'management',
  NON_PHARM_MANAGEMENT = 'non-pharm-management',
  POSITIVE_OUTCOMES = 'positive-outcomes',
  NEGATIVE_OUTCOMES = 'negative-outcomes',
}

export interface DiagramNode {
  id: string;
  label: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  category: CategoryId;
  explanation: string;
}

export interface DiagramConnection {
  from: string;
  to: string;
  lineStyle?: 'solid' | 'dashed';
}

export interface Category {
  id: CategoryId;
  name: string;
  color: string;
  textColor: string;
}
