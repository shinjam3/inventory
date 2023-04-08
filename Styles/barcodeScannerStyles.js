import { StyleSheet } from "react-native";

export const barcodeScannerStyles = StyleSheet.create({
  content: {
    width: 320,
    height: 320,
    alignItems: 'center'
  },
  barCodeScanner: {
    width: 300,
    height: 300,
  },
  placeholder: {
    width: 300,
    height: 300,
    backgroundColor: 'gainsboro',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    fontSize: 30
  }
});