import React, { useReducer, createContext } from 'react';
import { Reducer } from './Reducers/Reducer';

const initialState = {
  storageUnits: [],
  currentUnit: undefined,
  barcodeScanned: true,
  showScanner: false
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
  
  const setBarcodeScanned = (bool) => {
    dispatch({type: 'SET_BARCODE_SCANNED', payload: bool});
  }
  
  const setShowScanner = (bool) => {
    dispatch({type: 'SET_SHOW_SCANNER', payload: bool});
  }
  
  return (
    <Store.Provider
      value={{
        storageUnits: state.storageUnits,
        currentUnit: state.currentUnit,
        barcodeScanned: state.barcodeScanned,
        showScanner: state.showScanner,
        setStorageUnits,
        setCurrentUnit,
        //addNewItem,
        setBarcodeScanned,
        setShowScanner
      }}
    >
      {children}
    </Store.Provider>
  )
};