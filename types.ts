
export enum CauseArea {
  Children = "Children & Youth Services",
  Seniors = "Elderly Care",
  Disability = "Disability Services",
  Families = "Family Support",
  Health = "Healthcare",
  Community = "Community Development",
  Arts = "Arts & Heritage",
  Environment = "Environment & Sustainability",
}

export enum CommunicationChannel {
  Email = "Email",
  Push = "Push Notification",
  SMS = "SMS",
}

export interface DonorProfile {
  name: string;
  language: 'English' | 'Mandarin' | 'Malay' | 'Tamil';
  location: string; // e.g., "Central Singapore"
  interests: CauseArea[];
  donationCapacity: {
    min: number;
    max: number;
  };
  preferredChannels: CommunicationChannel[];
  consent: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  ngo: string;
  causeArea: CauseArea;
  location: string;
  description: string;
  fundingStatus: {
    current: number;
    goal: number;
  };
  targetAudience: string;
  imageUrl: string;
}

export interface RecommendedCampaign extends Campaign {
  matchRationale: string;
}

export interface DonationTier {
  level: 'Micro' | 'Small' | 'Medium' | 'Macro';
  amount: number;
  description: string;
  impact: string;
}

export interface JourneyStep {
  week: number;
  channel: CommunicationChannel;
  topic: string;
  contentSnippet: string;
}

export interface PersonalizedJourney {
  welcomeMessage: string;
  recommendedCampaigns: RecommendedCampaign[];
  suggestedDonationTiers: DonationTier[];
  engagementPlan: JourneyStep[];
}
