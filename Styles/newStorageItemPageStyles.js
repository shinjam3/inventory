import { StyleSheet } from "react-native";

export const newStorageItemPageStyles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  inputContainer: {
    marginBottom: 30
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    padding: 5,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'whitesmoke'
  },
  focusedInput: {
    fontSize: 16,
    padding: 5,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'dodgerblue',
    borderRadius: 5,
    backgroundColor: 'whitesmoke',
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  expiryDateContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gainsboro',
    width: 140,
    height: 50,
    borderRadius: 10,
  },
  closeModalButton: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledText: {
    fontSize: 16,
    color: 'gray'
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gainsboro',
    width: 100,
    height: 50,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20
  },
});