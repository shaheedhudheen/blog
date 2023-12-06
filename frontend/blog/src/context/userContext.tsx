import { createContext, useState } from "react";

type AuthUser = {
  _id: string;
  username: string;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  userInfo: AuthUser | null;
  setUserInfo: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userInfo, setUserInfo] = useState<AuthUser | null>(null);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
