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
import { AntDesign } from '@expo/vector-icons';
import { Store } from "../Store";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { Calendar, generateCalendar } from "./Calendar";
import { CustomModal } from './CustomModal';

import { defaultStyles } from "../Styles/defaultStyles";
import { newStorageItemPageStyles } from "../Styles/newStorageItemPageStyles";

export const NewStorageItemPage = ({ navigation }) => {
  const { storageUnits, setStorageUnits, currentUnit, setCurrentUnit } = useContext(Store);
  const [name, setName] = useState("");
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
  
  const handleSave = () => {
    const newItem = {
      id: uuidv4(),
      name,
      desc,
      expiryDate: selectedDay
    };
    const updatedUnit = JSON.parse(JSON.stringify(currentUnit));
    updatedUnit.items.push(newItem);
    const updatedUnits = storageUnits.map(unit => {
      return unit.id === updatedUnit.id ? updatedUnit : unit
    });
    setCurrentUnit(updatedUnit);
    setStorageUnits(updatedUnits);
    navigation.goBack();
  }
  
  const handleReset = () => {
    setName('');
    setDesc('');
    setSelectedDay(moment().format("YYYY-MMM-DD"));
  }

  const renderSelectedDay = () => {
    const momentDate = moment(selectedDay, "YYYY-MMM-DD");
    return momentDate.format("MMMM Do, YYYY");
  };
  
  const renderButtonDisabled = () => {
    return !name ? true : false;
  }
  
  const renderButtonTextStyles = () => {
    return !name ? newStorageItemPageStyles.disabledText : defaultStyles.text;
  }
  
  const RenderedCalendar = useMemo(() => {
    const calendar = generateCalendar(selectedDay);
    return <Calendar selectedDay={selectedDay} calendarMatrix={calendar} handleDayPress={handleDayPress} />;
  }, [selectedDay]);

  return (
    <TouchableWithoutFeedback onPress={handleInputBlur} accessible={false}>
      <SafeAreaView style={defaultStyles.contentContainer}>
        <Text style={defaultStyles.pageTitle}>New Item</Text>
        <View style={newStorageItemPageStyles.content}>
          <View style={newStorageItemPageStyles.inputContainer}>
            <Text style={newStorageItemPageStyles.inputLabel}>Item Name *</Text>
            <TextInput
              style={renderInputStyle("name")}
              onFocus={() => handleFocus("name")}
              onBlur={handleInputBlur}
              onChangeText={setName}
              value={name}
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
                <Text style={defaultStyles.text}>Show Calendar</Text>
              </Pressable>
          </View>
          <View style={newStorageItemPageStyles.actionsContainer}>
              <Pressable disabled={renderButtonDisabled()} style={newStorageItemPageStyles.actionButton} onPress={handleSave}>
                <Text style={renderButtonTextStyles()}>Save</Text>
              </Pressable>
              <Pressable disabled={renderButtonDisabled()} style={newStorageItemPageStyles.actionButton} onPress={handleReset}>
                <Text style={renderButtonTextStyles()}>Reset</Text>
              </Pressable>
          </View>
          <CustomModal
            isVisible={showCalendar}
            closeModal={() => setShowCalendar(false)}
          >
            <View style={newStorageItemPageStyles.closeModalButton}>
              <AntDesign name="close" size={30} color="black" onPress={() => setShowCalendar(false)} />
            </View>
            {RenderedCalendar}
          </CustomModal>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
