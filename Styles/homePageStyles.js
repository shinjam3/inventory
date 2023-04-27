import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const homePageStyles = StyleSheet.create({
  noUnitsText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  flatListContainer: {
    padding: 10,
    flex: 1,
  },
  addButton: {
    marginBottom: 40,
  },
  subtitleContainer: {
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitleFiller: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  notificationBell: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  notificationsModalTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  }
});