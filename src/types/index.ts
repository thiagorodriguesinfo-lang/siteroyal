export type ProductCategory = 'bovinos' | 'aves' | 'suinos' | 'embutidos' | 'congelados' | 'pescados';

export type BovinoSubcategory =
  | 'carne-sem-osso'
  | 'cortes-nobres'
  | 'carne-com-osso'
  | 'miudos'
  | 'charques'
  | 'cortes-especiais';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  description: string;
  uses: string[];
  image: string;
  featured?: boolean;
}

export interface BBQProfile {
  label: string;
  value: 'basico' | 'completo' | 'premium';
  gramsPerAdult: number;
}

export interface Segment {
  label: string;
  value: string;
}
