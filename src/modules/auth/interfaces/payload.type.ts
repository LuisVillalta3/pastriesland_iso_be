export interface iPayload {
  sub: string; // User ID
  email: string; // User email
  type: 'admin' | 'client'; // User type
}
