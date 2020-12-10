//Setting up the datalayer

import React, { createContext, useContext, useReducer } from 'react';

//This code below represents the DataLayer 
export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)} >
        {children}
    </StateContext.Provider>
); 

export const useDataLayerValues = () => useContext(StateContext);