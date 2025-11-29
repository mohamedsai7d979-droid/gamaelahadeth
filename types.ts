export interface Hadith {
  id: string;
  text: string;
  narrator: string;
  book: string;
  numberInBook?: string;
  grade: string; // Sahih, Hasan, Da'eef, etc.
  explanation: string;
  tags: string[];
}

export interface SearchState {
  query: string;
  results: Hadith[];
  loading: boolean;
  error: string | null;
}

export enum Page {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  BOOK = 'BOOK',
  ABOUT = 'ABOUT'
}