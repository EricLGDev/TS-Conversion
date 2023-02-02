import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";
import { Action } from "@remix-run/router";

export const useAuthContext = (): { dispatch: React.Dispatch<Action>; user: object | null; } => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};