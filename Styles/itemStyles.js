import { StyleSheet } from "react-native";

export const itemStyles = StyleSheet.create({
  container: {
    width: 320,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: "white",
  },
  details: {
    flex: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  delete: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
