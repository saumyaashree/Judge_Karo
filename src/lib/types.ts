// Product related types
export type Sector = "smartphones" | "earphones" | "laptops";

export type Product = {
  id: string;
  name: string;
  brand: string;
  sector: Sector;
  imageUrl: string;
  imageHint: string;
  price: number;
  goodFor: string[];
  notGoodFor: string[];
  commonRegrets: string[];
  specs: Record<string, string>;
  tags: string[]; // for use-case matching
  upcomingModel?: boolean;
  alternatives: string[]; // array of product IDs
};

export type ProductScores = {
  productId: string;
  comfort: number; // 1-10
  reliability: number; // 1-10
  repurchaseIntent: number; // %
  longevity: number; // years
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  scenario: string;
  durationOfUse: number; // months
  comfortRating: number; // 1-10
  text: string;
  upvotes: number;
  isFlagged: boolean;
  isApproved: boolean;
  createdAt: string; // ISO date string
  flagReason?: string;
};

// Questionnaire related types
export type Question = {
  id: string;
  text: string;
  type: "radio" | 'slider';
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  labels?: {min: string, max: string};
};

export type Questionnaire = {
  sector: Sector;
  questions: Question[];
};

export type UserAnswers = { [key: string]: string | number };

// Ranking related types
export type ScoreBreakdown = {
  useCaseMatch: number;
  realWorldExperience: number;
  longevity: number;
  budgetAlignment: number;
  buyTimingAdvisor: number;
  total: number;
};

export type RecommendedProduct = {
  product: Product;
  scores: ProductScores;
  rank: number;
  scoreBreakdown: ScoreBreakdown;
  fitReason: string;
  buyNowOrWait: "BUY NOW" | "WAIT";
};
