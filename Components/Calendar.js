import React, { useState, useContext, useMemo } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import moment from "moment";
import { calendarStyles } from "../Styles/calendarStyles";

export const Calendar = ({ selectedDay, calendarMatrix, handleDayPress }) => {
  const momentDay = moment(selectedDay, 'YYYY-MMM-DD');
  
  const renderDayStyle = (currentDay) => {
    return momentDay.isSame(currentDay, 'day') ? calendarStyles.selectedDay : calendarStyles.day
  }
  
  return (
    <View style={calendarStyles.calendar}>
      <View style={calendarStyles.weekNames}>
        <View style={calendarStyles.weekNameContainer}><Text style={calendarStyles.weekName}>Sun</Text></View>
        <View style={calendarStyles.weekNameContainer}><Text style={calendarStyles.weekName}>Mon</Text></View>
        <View style={calendarStyles.weekNameContainer}><Text style={calendarStyles.weekName}>Tue</Text></View>
        <View style={calendarStyles.weekNameContainer}><Text style={calendarStyles.weekName}>Wed</Text></View>
        <View style={calendarStyles.weekNameContainer}><Text style={calendarStyles.weekName}>Thur</Text></View>
        <View style={calendarStyles.weekNameContainer}><Text style={calendarStyles.weekName}>Fri</Text></View>
        <View style={calendarStyles.weekNameContainer}><Text style={calendarStyles.weekName}>Sat</Text></View>
      </View>
      {calendarMatrix.map((calendarWeek, weekIdx) => (
        <View key={weekIdx} style={calendarStyles.week}>
          {calendarWeek.map((calendarDay) => (
            <Pressable
              key={calendarDay.format("YYYY-MMM-DD")}
              style={renderDayStyle(calendarDay)}
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