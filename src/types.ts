export interface Incident {
  id: number;
  title: string;
  severity: string;
  status: string;
}

export interface Vulnerability {
  id: number;
  name: string;
  severity: string;
  status: string;
  system: string;
}

export interface Threat {
  id: number;
  type: string;
  severity: string;
  timestamp: string;
  details: string;
}