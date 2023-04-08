import React, { useReducer, createContext } from 'react';
import { Reducer } from './Reducers/Reducer';

const initialState = {
  storageUnits: [],
  currentUnit: undefined,
};

export const Store = createContext(initialState);

export const Provider = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  
  //actions
  const setStorageUnits = (storageUnits) => {
    dispatch({type: 'SET_STORAGE_UNITS', payload: storageUnits})
  }
  
  const setCurrentUnit = (currentUnit) => {
    dispatch({type: 'SET_CURRENT_UNIT', payload: currentUnit})
  }
  
  return (
    <Store.Provider
      value={{
        storageUnits: state.storageUnits,
        currentUnit: state.currentUnit,
        setStorageUnits,
        setCurrentUnit,
      }}
    >
      {children}
    </Store.Provider>
  )
};