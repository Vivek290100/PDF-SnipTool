export interface User {
  id: string;
  email: string;
  userName: string;
  joinedDate: string;
}

export interface AuthResponse {
  user: User;
}
