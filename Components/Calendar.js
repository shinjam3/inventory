import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
import { calendarStyles } from "../Styles/calendarStyles";
import { defaultStyles } from '../Styles/defaultStyles';

export const Calendar = ({ expDate, referenceDay, calendarMatrix, handleDayPress }) => {
  const refDay = referenceDay ? moment(referenceDay, "YYYY-MMM-DD") : moment();
  const expiryDate = moment(expDate, "YYYY-MMM-DD");
  const today = moment();
  
  const renderDayStyle = (day) => {
    if (
      (expiryDate.isValid() && expiryDate.isSame(day, "day")) ||
      (today.isSame(expiryDate, "day") && today.isSame(day, "day"))
    ) return {...calendarStyles.day, backgroundColor: '#AFEEEE'};
    else if (today.isSame(day, "day")) return {...calendarStyles.day, backgroundColor: 'red'};
    else return calendarStyles.day;
  };

  const handleMonthChange = (type) => {
    switch (type) {
      case 'prev':
        handleDayPress(refDay.clone().subtract(1, 'months'), false);
        break;
      case 'next':
        handleDayPress(refDay.clone().add(1, 'months'), false);
        break;
      default:
        break;
    }
  }

  return (
    <View style={calendarStyles.calendar}>
      <View style={calendarStyles.monthContainer}>
        <AntDesign name="left" size={24} color="black" onPress={() => handleMonthChange('prev')} />
        <Text style={calendarStyles.month}>{refDay.format("MMMM YYYY")}</Text>
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
              onPress={() => handleDayPress(calendarDay, true)}
            >
              <Text>{calendarDay.format("D")}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      <View style={calendarStyles.legendContainer}>
        <View style={calendarStyles.legendItem}>
          <View style={calendarStyles.todaysDate}></View>
          <Text>{"Today's Date"}</Text>
        </View>
        <View style={calendarStyles.legendItem}>
          <View style={calendarStyles.expiryDate}></View>
          <Text>Selected Date</Text>
        </View>
      </View>
    </View>
  );
};
