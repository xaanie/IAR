
export enum AppSection {
  LANDING = 'LANDING',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  MY_PORTAL = 'MY_PORTAL',
  GLOBAL_DISCOVERY = 'GLOBAL_DISCOVERY',
  OPPORTUNITIES = 'OPPORTUNITIES',
  VOLUNTEERING = 'VOLUNTEERING',
  DONATIONS = 'DONATIONS',
  STORE = 'STORE',
  CHECKOUT = 'CHECKOUT',
  FAQ = 'FAQ',
  EVENTS = 'EVENTS'
}

export interface CareerStory {
  id: string;
  name: string;
  major: string;
  graduationYear: string;
  role: string;
  company: string;
  storyPreview: string;
  fullStory: string;
  videoUrl?: string;
  avatar: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  hasHelpBadge: boolean;
  alumniContact?: {
    name: string;
    role: string;
  };
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'Apparel' | 'Stationery' | 'Tech';
  isExclusive?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface MSUEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Cultural' | 'Academic' | 'Networking' | 'Social';
  description: string;
  image: string;
}

// Badge interface for global competency tracking and credentials
export interface Badge {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  earnedDate?: string;
}

// User and Authentication interfaces
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  campus?: 'Gweru Main' | 'Harare' | 'Zvishavane';
  major?: string;
  graduationYear?: string;
  phoneNumber?: string;
  bio?: string;
  profileComplete: boolean;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
