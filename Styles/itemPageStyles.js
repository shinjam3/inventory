import { StyleSheet } from "react-native";

export const itemPageStyles = StyleSheet.create({
   content: {
    backgroundColor: "gainsboro",
    flex: 1,
    width: '100%',
    padding: 10,
    paddingTop: 20
  },
  inputContainer: {
    marginBottom: 30
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 160
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
    height: 170,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 140,
    height: 50,
    borderRadius: 10,
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
    backgroundColor: 'white',
    width: 100,
    height: 50,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20
  },
});