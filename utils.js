import moment from "moment";

export const generateCalendar = (selectedDay) => {
  const momentDay = moment(selectedDay, "YYYY-MMM-DD");
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

export const replaceStorageUnit = (storageUnits, updatedUnit) => {
  const updatedUnits = storageUnits.map(unit => unit.id === updatedUnit.id ? updatedUnit : unit);
  return updatedUnits;
}