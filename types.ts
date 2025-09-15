export enum AppView {
  WELCOME,
  HOME,
  STEPS,
  TRADITIONS,
  SERVICES,
  LITERATURE,
  VIRTUAL_SPONSOR,
  COMMUNITY,
  PROGRESS,
  GRATITUDE_JOURNAL,
}

export interface User {
  id: string;
  name: string;
  isAnonymous: boolean;
}

export interface Step {
  id: number;
  number: string;
  title: string;
  text: string;
  commentary: string;
}

export interface Tradition {
  id: number;
  number: string;
  title: string;
  text: string;
  application: string;
}

export interface Service {
  id: number;
  name: string;
  contact: string;
  location: string;
  link: string;
}

export interface Book {
  id: number;
  title: string;
  type: string;
  link: string;
  author: string;
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'model';
  text: string;
}

export interface JournalEntry {
  id: number;
  date: string;
  text: string;
}

export interface CommunityPost {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}