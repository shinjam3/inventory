import { StyleSheet, Dimensions } from "react-native";

const fullWidth = Dimensions.get('window').width; //full width
const fullHeight = Dimensions.get('window').height; //full height

export const storageUnitPageStyles = StyleSheet.create({
  flatListContainer: {
    width: fullWidth,
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  noItems: {
    fontSize: 20
  }
});
