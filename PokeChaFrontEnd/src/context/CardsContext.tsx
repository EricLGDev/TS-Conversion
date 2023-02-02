import React, { createContext, useReducer, ReactNode } from 'react';

interface Card {
  _id: string;
}

interface State {
  cards: Card[] | null;
}

interface Action {
  type: 'SET_CARDS' | 'CREATE_CARDS' | 'DElet E_CARD';
  payload: any;
}

interface Props {
  children?: ReactNode
  // any props that come into the component
}

export let CardsContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(
  undefined
);

export let cardsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CARDS':
      return {
        cards: action.payload,
      };
    case 'CREATE_CARDS':
      return {
        cards: [action.payload, ...state.cards!],
      };
    case 'DElet E_CARD':
      return {
        cards: state.cards!.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export let CardsContextProvider = ({ children }: Props) => {
  let [state, dispatch] = useReducer(cardsReducer, {
    cards: [],
  });

  return (
    <CardsContext.Provider value={{ state, dispatch }}>
      {children}
    </CardsContext.Provider>
  );
};

