export interface IAuth {
    username?: string;
    email?: string;
    password?: string;
    accessToken?: string
}

export type AuthContextType = {
  auth: IAuth | null;
  setAuth: React.Dispatch<React.SetStateAction<IAuth | null>>;
}