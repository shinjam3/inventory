import React, { useState, useContext, useMemo } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import moment from "moment";
import { calendarStyles } from "../Styles/calendarStyles";

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

export const Calendar = ({ calendarMatrix, handleDayPress }) => {
  return (
    <View style={calendarStyles.calendar}>
      {calendarMatrix.map((calendarWeek, weekIdx) => (
        <View key={weekIdx} style={calendarStyles.week}>
          {calendarWeek.map((calendarDay) => (
            <Pressable
              key={calendarDay.format("YYYY-MMM-DD")}
              style={calendarStyles.day}
              onPress={() => handleDayPress(calendarDay)}
            >
              <Text>{calendarDay.format("D")}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};
