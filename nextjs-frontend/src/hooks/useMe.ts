import { Me } from "../api/Me";
import React, { useContext } from "react";

export const AuthContext = React.createContext<Me | undefined>(undefined);

export interface Auth {
  me?: Me;
  isLoggedIn: boolean;
}

export const useMe = (): Auth => {
  let me = useContext(AuthContext);

  return {
    isLoggedIn: me !== undefined,
    me: me,
  };
};
