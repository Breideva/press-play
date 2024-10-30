import { act, useEffect, useState } from "react";
import { createContext } from "react";

export const Context = createContext(null);


export const GamesContext = (props) => {


  const contextValue = {};

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
