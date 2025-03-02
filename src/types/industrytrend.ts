export interface SupportLink {
  label: string;
  url: string;
}

export interface TrendDetails {
  overview: string;
  keyPoints: string[];
  supportLinks: SupportLink[];
}

export interface IndustryTrend {
  id: string;
  title: string;
  description: string;
  impact: string;
  imageUrl: string;
  details: TrendDetails;
}

export interface IndustryTrendCategory {
  category: string;
  trends: IndustryTrend[];
}
