import { StyleSheet } from "react-native";

export const calendarStyles = {
  weekNames: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
  weekNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  weekName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  calendar: {
    width: 340,
    height: 300,
    borderWidth: 1,
    borderColor: 'black',
  },
  week: {
    flex: 1,
    flexDirection: 'row',
  },
  selectedDay: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: '#AFEEEE'
  },
  day: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue'
  }
}