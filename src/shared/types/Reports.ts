export interface StatCard {
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  suffix?: string;
  description?: string;
  icon?: 'doc' | 'check' | 'x';
}

export interface DailyDocumentStats {
  day: string;
  count: number;
}

export interface DigitalSignatureStatus {
  name: string;
  value: number;
  percentage: number;
  type: 'success' | 'failed';
}

export interface ReportsData {
  stats: {
    signedDocuments: StatCard;
    userSignatures: StatCard;
    dailySignatures: StatCard;
  };
  dailyStats: DailyDocumentStats[];
  signatureStatus: DigitalSignatureStatus[];
}
