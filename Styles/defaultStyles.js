import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pageTitle: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    height: 40,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  barCodeScanner: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 16
  },
  boldedText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
});
