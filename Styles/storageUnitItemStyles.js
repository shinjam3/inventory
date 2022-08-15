import { StyleSheet } from "react-native";

export const storageUnitItemStyles = StyleSheet.create({
  container: {
    width: 320,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  details: {
    flex: 3
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  delete: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});