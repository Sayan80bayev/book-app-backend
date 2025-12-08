export interface User {
  id: string;
  username: string;
  password: string;
  bio: string;
  birthDate: Date;
  nationality: string;
  isDeleted: boolean;
}