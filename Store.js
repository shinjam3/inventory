import React, { useReducer, createContext } from 'react';
import { Reducer } from './Reducers/Reducer';

const initialState = {
  storageUnit: undefined,
  barcodeScanned: true,
  showScanner: false
};

export const Store = createContext(initialState);

export const Provider = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  
  //actions
  const setStorageUnit = (storageUnit) => {
    dispatch({type: 'SET_STORAGE_UNIT', payload: storageUnit})
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
        storageUnit: state.storageUnit,
        barcodeScanned: state.barcodeScanned,
        showScanner: state.showScanner,
        setStorageUnit,
        setBarcodeScanned,
        setShowScanner
      }}
    >
      {children}
    </Store.Provider>
  )
};