export interface User {
  email: string;
  userName: string;
  fullName: string;
  role: string;
  profileImage: string;
  problemsSolved: number;
  rank: number;
  joinedDate: string;
}

export interface AuthResponse {
  token: string; 
  user: User;
}
