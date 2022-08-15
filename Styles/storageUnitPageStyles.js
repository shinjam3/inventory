import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const fullWidth = Dimensions.get('window').width; //full width
var fullHeight = Dimensions.get('window').height; //full height

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
