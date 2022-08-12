import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
import { calendarStyles } from "../Styles/calendarStyles";
import { defaultStyles } from '../Styles/defaultStyles';

export const Calendar = ({ selectedDay, calendarMatrix, handleDayPress }) => {
  const newDate = moment(selectedDay, "YYYY-MMM-DD");
  
  const renderDayStyle = (currentDay) => {
    return newDate.isSame(currentDay, "day") ? calendarStyles.selectedDay : calendarStyles.day;
  };

  const handleMonthChange = (type) => {
    switch (type) {
      case 'prev':
        handleDayPress(newDate.clone().subtract(1, 'months'));
        break;
      case 'next':
        handleDayPress(newDate.clone().add(1, 'months'));
        break;
      default:
        break;
    }
  }

  return (
    <View style={calendarStyles.calendar}>
      <View style={calendarStyles.monthContainer}>
        <AntDesign name="left" size={24} color="black" onPress={() => handleMonthChange('prev')} />
        <Text style={calendarStyles.month}>{newDate.format("MMMM YYYY")}</Text>
        <AntDesign name="right" size={24} color="black" onPress={() => handleMonthChange('next')} />
      </View>
      <View style={calendarStyles.weekNames}>
        <View style={calendarStyles.weekNameContainer}>
          <Text style={defaultStyles.boldedText}>Sun</Text>
        </View>
        <View style={calendarStyles.weekNameContainer}>
          <Text style={defaultStyles.boldedText}>Mon</Text>
        </View>
        <View style={calendarStyles.weekNameContainer}>
          <Text style={defaultStyles.boldedText}>Tue</Text>
        </View>
        <View style={calendarStyles.weekNameContainer}>
          <Text style={defaultStyles.boldedText}>Wed</Text>
        </View>
        <View style={calendarStyles.weekNameContainer}>
          <Text style={defaultStyles.boldedText}>Thur</Text>
        </View>
        <View style={calendarStyles.weekNameContainer}>
          <Text style={defaultStyles.boldedText}>Fri</Text>
        </View>
        <View style={calendarStyles.weekNameContainer}>
          <Text style={defaultStyles.boldedText}>Sat</Text>
        </View>
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
