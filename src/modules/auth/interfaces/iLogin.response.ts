export interface ILoginResponse {
  accessToken: string;
  user: IUserResponse;
}

export interface IUserResponse {
  id: string;
  name: string;
  lastName: string;
  email: string;
  type: 'admin' | 'client';
}
