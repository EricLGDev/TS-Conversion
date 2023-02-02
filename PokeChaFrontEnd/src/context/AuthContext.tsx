import React, { createContext, useReducer, useEffect } from 'react';

interface State {
  user: object | null;
}

interface Action {
  type: string;
  payload: object;
}

interface AuthContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '');
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


