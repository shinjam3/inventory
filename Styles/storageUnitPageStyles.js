import { StyleSheet } from "react-native";

export const storageUnitPageStyles = StyleSheet.create({
  toolbar: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  toolbarOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItems: {
    fontSize: 20
  }
});
