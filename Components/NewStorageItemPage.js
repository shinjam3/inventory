import React, { useState, useContext, useMemo } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { Store } from "../Store";
import { Calendar, generateCalendar } from "./Calendar";
import moment from "moment";
import { defaultStyles } from "../Styles/defaultStyles";
import { newStorageItemPageStyles } from "../Styles/newStorageItemPageStyles";

export const NewStorageItemPage = ({ navigation }) => {
  const { storageUnit, setStorageUnit } = useContext(Store);
  const { name } = storageUnit;
  const [nameValue, setNameValue] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MMM-DD"));

  const calendar = useMemo(() => {
    return generateCalendar(selectedDay);
  }, [selectedDay]);

  const handleDayPress = (pressedDay) => {
    setSelectedDay(pressedDay.format("YYYY-MMM-DD"));
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style={defaultStyles.pageTitle}>New Item</Text>
      <View style={newStorageItemPageStyles.content}>
        <Text>Item Name</Text>
        <TextInput onChangeText={setNameValue} value={nameValue} placeholder="Enter a name here..." />
        <Text>Item Description</Text>
        <TextInput onChangeText={setDesc} value={desc} placeholder="Enter a description..." />
        <Text>Expiry Date</Text>
        <Calendar calendarMatrix={calendar} handleDayPress={handleDayPress} />
      </View>
    </SafeAreaView>
  );
};
