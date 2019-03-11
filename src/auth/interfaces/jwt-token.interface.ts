export interface JwtToken {
  accessToken: string;
  expiresIn: number;
  userName: string;
  email?: string;
}
