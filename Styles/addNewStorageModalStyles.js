import { StyleSheet } from "react-native";

export const addNewStorageModalStyles = StyleSheet.create({
  content: {
    padding: 20,
    top: "30%",
    alignSelf: "center",
    width: 300,
    height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    marginBottom: 40,
    alignSelf: "flex-start",
    fontSize: 24,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    padding: 5,
    width: "100%",
    height: 40,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "gainsboro",
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
});
