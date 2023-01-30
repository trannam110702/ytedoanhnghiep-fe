import React, { createContext, useReducer } from "react";

const initialState = { user_id: "", role: "" };
const Store = createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    let newState = state;
    switch (action.type) {
      case "login":
        newState = {
          ...state,
          user_id: action.user_id,
          role: action.role,
        };
        console.table({
          old_State: state,
          new_State: newState,
        });
        return newState;
      case "logout":
        newState = {
          ...state,
          user_id: "",
          role: "",
        };
        console.table({
          old_State: state,
          new_State: newState,
        });
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export { Store, StateProvider };