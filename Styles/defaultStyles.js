import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

const fullWidth = Dimensions.get("window").width; //full width

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "lightseagreen",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    color: "#fff",
    marginTop: 20,
    marginBottom: -20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  pageTitle: {
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  contentContainer: {
    paddingTop: 10,
    flex: 1,
    width: fullWidth,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gainsboro",
  },
  text: {
    fontSize: 16,
  },
  boldedText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  toolbar: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    backgroundColor: "darkgray",
  },
  toolbarOption: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    padding: 10,
    flex: 1,
  },
});
