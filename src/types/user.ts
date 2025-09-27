export interface User {
  id: number;
  name: string;
  email: string;
  password: string | null;
  image: string;
  type: string;
  role: string;
  books: any[];
}
