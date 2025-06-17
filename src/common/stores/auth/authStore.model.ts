export interface IUser {
  id: string;
  nome: string;
  matricula: string;
  token: string;
}

export interface AuthState {
  user: IUser | null;
  login: (data: { user: IUser }) => void;
  logout: () => void;
  loadUser: () => void;
}
