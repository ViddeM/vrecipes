import { Me } from "../api/Me";
import React, { useContext } from "react";
import { Api } from "../api/Api";

export interface AuthContext {
  me: Me | undefined;
}

export const AuthContext = React.createContext<AuthContext>({
  me: undefined,
});

export interface Auth {
  me?: Me;
  isLoggedIn: boolean;
  logout: () => void;
}

export const useMe = (): Auth => {
  let { me } = useContext(AuthContext);

  return {
    isLoggedIn: me !== undefined,
    me: me,
    logout: logout,
  };
};

function logout() {
  Api.user.logout().finally(() => {
    console.log("Should be logged out?");
    window.location.assign("/");
  });
}
