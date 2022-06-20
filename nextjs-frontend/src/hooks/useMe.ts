import React, { useContext } from "react";

import { Api } from "../api/Api";
import { ROOT_ENDPOINT } from "../api/Endpoints";
import { Me } from "../api/Me";

export interface AuthContext {
  me: Me | undefined;
  initialized: boolean;
}

export const AuthContext = React.createContext<AuthContext>({
  me: undefined,
  initialized: false,
});

export interface Auth {
  me?: Me;
  isLoggedIn: boolean;
  initialized: boolean;
  logout: () => void;
}

export const useMe = (): Auth => {
  const { me, initialized } = useContext(AuthContext);

  return {
    isLoggedIn: me !== undefined,
    me: me,
    initialized: initialized,
    logout: logout,
  };
};

function logout() {
  Api.user.logout().finally(() => {
    window.location.assign(ROOT_ENDPOINT);
  });
}
