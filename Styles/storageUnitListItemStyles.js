import { StyleSheet } from "react-native";

export const storageUnitListItemStyles = StyleSheet.create({
  renderStorageUnits: {
    minHeight: 80,
  },
  container: {
    width: 300,
    height: 80,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  amount: {
    fontSize: 16,
  },
  options: {
    position: "absolute",
    right: 50,
    width: 150,
    height: 150,
    borderColor: "blue",
    borderWidth: 1,
  },
});
