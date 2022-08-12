export const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORAGE_UNITS':
      return {
        ...state,
        storageUnits: action.payload
      }
    case 'SET_CURRENT_UNIT':
      return {
        ...state,
        currentUnit: action.payload
      }
    case 'ADD_NEW_ITEM':
      // todo: make this more efficient
      const updatedUnit = JSON.parse(JSON.stringify(state.currentUnit));
      updatedUnit.items.push(action.payload);
      const updatedItems = state.storageUnits.map(unit => {
        return unit.id === updatedUnit.id ? updatedUnit : unit
      });
      return {
        ...state,
        storageUnits: updatedItems
      }
    case 'SET_BARCODE_SCANNED':
      return {
        ...state,
        barcodeScanned: action.payload
      }
    case 'SET_SHOW_SCANNER':
      return {
        ...state,
        showScanner: action.payload
      }
    default:
      return state;
  }
}