export interface Incident {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'investigating' | 'resolved';
  created_at: string;
  updated_at: string;
  assigned_to: string | null;
  description: string;
  source_ip: string | null;
  affected_assets: string[];
  response_time: number | null;
}

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

export interface DashboardMetrics {
  cgScore: number;
  cgTrend: 'up' | 'down' | 'stable';
  incidentsBySevertiy: {
    low: number;
    medium: number;
    high: number;
  };
  automationRate: number;
  monitoredAssets: number;
  mttr: number;
  mttrTrend: number;
  totalInvestigated: number;
  totalEscalated: number;
  truePositives: number;
}