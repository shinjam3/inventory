import moment from "moment";

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