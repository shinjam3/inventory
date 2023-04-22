import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const notificationStyles = StyleSheet.create({
  notificationContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: 'whitesmoke',
    borderWidth: 1
  },
  text: {
    width: '80%',
  }
});