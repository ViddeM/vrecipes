import React, { useContext } from "react";

import { Api } from "../api/Api";
import { ROOT_ENDPOINT } from "../api/Endpoints";
import { Me } from "../api/Me";

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
  const { me } = useContext(AuthContext);

  return {
    isLoggedIn: me !== undefined,
    me: me,
    logout: logout,
  };
};

function logout() {
  Api.user.logout().finally(() => {
    window.location.assign(ROOT_ENDPOINT);
  });
}
