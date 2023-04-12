import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const generateCalendar = (selectedDay) => {
  const referenceDay = selectedDay || moment();
  const momentDay = moment(referenceDay, "YYYY-MMM-DD");
  const startDay = momentDay.clone().startOf("month").startOf("week");
  const endDay = momentDay.clone().endOf("month").endOf("week");
  const day = startDay.clone().subtract(1, "day");
  const calendarArray = [];
  while (day.isBefore(endDay, "day")) {
    calendarArray.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }
  return calendarArray;
};

export const cloneStorageUnit = (storageUnit) => {
  return JSON.parse(JSON.stringify(storageUnit));
}

export const replaceArrayElement = (arr, updatedElement) => {
  const updatedArray = arr.map(element => element.id === updatedElement.id ? updatedElement : element);
  return updatedArray;
}

export const saveLocalData = async (data) => {
  try {
    await AsyncStorage.setItem('@InventoryApp_storageUnits', JSON.stringify(data));
  } catch (e) {
    alert('Error: could not save to device storage');
  }
}

export const getLocalData = async () => {
  try {
    const data = await AsyncStorage.getItem('@InventoryApp_storageUnits');
    return JSON.parse(data);
  } catch (e) {
    alert('Error: could not retrieve saved data from device storage');
  }
}

