import { AuthContextType, IAuth } from "@/types/auth";
import { createContext, FC, ReactNode, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth | null>(null);
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
