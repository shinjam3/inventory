import React, { useState, useContext, useMemo } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
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
  const [focused, setFocused] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MMM-DD"));

  const handleDayPress = (pressedDay) => {
    setSelectedDay(pressedDay.format("YYYY-MMM-DD"));
  };

  const handleInputBlur = () => {
    setFocused("");
    Keyboard.dismiss();
  };

  const handleFocus = (type) => {
    setFocused(type);
  };

  const handleShowButtonPress = () => {
    setShowCalendar(!showCalendar);
  };

  const renderInputStyle = (type) => {
    return focused === type ? newStorageItemPageStyles.focusedInput : newStorageItemPageStyles.input;
  };

  const renderSelectedDay = () => {
    const momentDate = moment(selectedDay, "YYYY-MMM-DD");
    return momentDate.format("MMMM Do, YYYY");
  };

  const RenderedCalendar = useMemo(() => {
    const calendar = generateCalendar(selectedDay);
    return <Calendar selectedDay={selectedDay} calendarMatrix={calendar} handleDayPress={handleDayPress} />;
  }, [selectedDay]);

  return (
    <TouchableWithoutFeedback onPress={handleInputBlur} accessible={false}>
      <SafeAreaView style={defaultStyles.container}>
        <Text style={defaultStyles.pageTitle}>New Item</Text>
        <View style={newStorageItemPageStyles.content}>
          <View style={newStorageItemPageStyles.inputContainer}>
            <Text style={newStorageItemPageStyles.inputLabel}>Item Name</Text>
            <TextInput
              style={renderInputStyle("name")}
              onFocus={() => handleFocus("name")}
              onBlur={handleInputBlur}
              onChangeText={setNameValue}
              value={nameValue}
              placeholder="Enter a name here..."
            />
          </View>
          <View style={newStorageItemPageStyles.inputContainer}>
            <Text style={newStorageItemPageStyles.inputLabel}>Item Description</Text>
            <TextInput
              style={renderInputStyle("desc")}
              onFocus={() => handleFocus("desc")}
              onBlur={handleInputBlur}
              onChangeText={setDesc}
              value={desc}
              placeholder="Enter a description..."
            />
          </View>
          <View style={newStorageItemPageStyles.expiryDateContainer}>
            <View>
              <Text style={newStorageItemPageStyles.inputLabel}>Expiry Date</Text>
              <Text style={defaultStyles.text}>{renderSelectedDay()}</Text>
            </View>
            <Pressable style={newStorageItemPageStyles.button} onPress={handleShowButtonPress}>
              <Text style={defaultStyles.text}>{showCalendar ? "Hide Calendar" : "Show Calendar"}</Text>
            </Pressable>
          </View>
          {showCalendar && RenderedCalendar}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
