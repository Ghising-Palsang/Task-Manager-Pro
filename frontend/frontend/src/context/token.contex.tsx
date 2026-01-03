import { createContext, useContext, useEffect, useState } from "react";
import type { IAuthProvider } from "./auth.context";
import authSvc from "../service/auth.service";
import { setAccessToken } from "../config/axios.config";

interface ITokenContext {
  tokenReady: boolean;
  logout: () => void;
}

const TokenContext = createContext<ITokenContext | null>(null);

export const TokenProvider = ({ children }: IAuthProvider) => {
  const [tokenReady, setTokenReady] = useState(false);

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await authSvc.refreshAccessToken();
        setAccessToken(res.data.data.newAcessToken);
      } catch {
        setAccessToken(null);
      } finally {
        setTokenReady(true);
      }
    };
    refresh();
  }, []);

  const logout = async () => {
    await authSvc.logOutUser();
    setAccessToken(null);
  };

  return (
    <TokenContext.Provider value={{ tokenReady, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToken = () => {
  
  const tokenContext = useContext(TokenContext);
  
  if(!tokenContext){
    throw new Error("useToken must be used inside TokenProvider")
  }

  return tokenContext
};
