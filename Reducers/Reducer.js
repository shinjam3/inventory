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