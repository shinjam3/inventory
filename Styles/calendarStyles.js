import { StyleSheet } from "react-native";

export const calendarStyles = {
  calendar: {
    width: 330,
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
    flexDirection: 'row',
  },
  day: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
    height: 35
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 40
  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },
  todaysDate: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    margin: 5
  },
  expiryDate: {
    width: 20,
    height: 20,
    backgroundColor: '#AFEEEE',
    margin: 5
  }
}