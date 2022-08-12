import { StyleSheet } from "react-native";

export const calendarStyles = {
  calendar: {
    width: 340,
    height: 300,
    borderWidth: 1,
    borderColor: 'black',
  },
  monthContainer: {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20
  },
  month: {
    fontSize: 22,
    fontWeight: 'bold',
    width: 180,
    textAlign: 'center',
  },
  weekNames: {
    flexDirection: 'row',
    width: '100%',
  },
  weekNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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