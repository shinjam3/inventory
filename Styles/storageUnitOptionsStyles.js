import { StyleSheet } from "react-native";

export const storageUnitOptionsStyles = StyleSheet.create({
  content: {
    padding: 20,
    top: "30%",
    alignSelf: "center",
    width: 350,
    height: 300,
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
  renameContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 20,
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
    marginTop: 20,
    alignSelf: "center",
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
  options: {
    flex: 1
  },
  name: {
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flex: 1,
  },
  option: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gainsboro',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 20
  }
});