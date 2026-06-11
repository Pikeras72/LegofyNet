export type ClassCategory = 'jedi' | 'sith' | 'imperial' | 'resistance' | 'warrior' | 'species';

export interface CharacterClass {
  /** URL-safe identifier used in routes (/classes/:id) and ?class= params. */
  id: string;
  /** Exact training label — must equal CLASS_LABEL_ORDER[modelIndex]. */
  name: string;
  /** One-hot index in the model's 22-dim class vector. Encodes training order. */
  modelIndex: number;
  description: string;
  category: ClassCategory;
  /** Path under public/, resolved with asset(). */
  image: string;
}

export interface GalleryItem {
  id: string;
  /** Path under public/, resolved with asset(). */
  image: string;
  title: string;
  caption: string;
  /** Matching CharacterClass id, when the showcased class is known. */
  classId?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Path under public/, resolved with asset(). */
  photo: string;
  linkedin: string;
}
