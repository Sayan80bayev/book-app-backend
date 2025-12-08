export interface Book {
  id: string;
  title: string;
  description: string;
  publishYear: number;
  authorId: string;        // (1:n)
  categories: string[];    // (m:n)
  isDeleted: boolean;
}