import React, { useState, useContext, useMemo, useEffect, useRef } from "react";
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
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Store } from "../Store";
import moment from "moment";
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  generateCalendar,
  cloneStorageUnit,
  replaceArrayElement
} from "../utils";

import { Calendar } from "./Calendar";
import { CustomModal } from "./CustomModal";
import { BarcodeScanner } from "./BarcodeScanner";

import { defaultStyles } from "../Styles/defaultStyles";
import { itemPageStyles } from "../Styles/itemPageStyles";

export const ItemPage = ({ route, navigation }) => {
  const { storageUnits, setStorageUnits, currentUnit, setCurrentUnit } =
    useContext(Store);
  const [itemExists, setItemExists] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [focused, setFocused] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [expDate, setExpDate] = useState('');
  const [referenceDay, setReferenceDay] = useState('');
  const quantityInput = useRef(null);
  
  useEffect(() => {
    if (route.params) {
      const setDate = moment(route.params.itemData.expiryDate, "MMMM Do, YYYY");
      setName(route.params.itemData.name);
      setQuantity(route.params.itemData.quantity);
      setExpDate(setDate.isValid() ? setDate : '');
      setItemExists(route.params.exists || false);
    }
  }, [route]);

  const handleOption = (option) => {
    switch (option) {
      case "back":
        navigation.navigate("StorageUnitPage");
        break;
      case "scan":
        setShowScanner(true);
        break;
      case "options":
        break;
      default:
        break;
    }
  };

  const handleDayPress = (pressedDay, daySelected) => {
    if (daySelected) setExpDate(pressedDay.format("YYYY-MMM-DD"));
    setReferenceDay(pressedDay.format("YYYY-MMM-DD"));
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

  const handleScannedData = (itemName) => {
    setName(itemName);
  };

  const renderInputStyle = (type) => {
    return focused === type
      ? itemPageStyles.focusedInput
      : itemPageStyles.input;
  };

  const handleSave = async () => {
    const newItem = {
      id: itemExists ? route.params.itemData.id : Crypto.randomUUID(),
      name,
      quantity,
      expiryDate: expDate ? moment(expDate, "YYYY-MMM-DD").format("MMM. Do, YYYY") : "Not Set",
    };
    const updatedUnit = cloneStorageUnit(currentUnit);
    if (itemExists) {
      const updatedItems = replaceArrayElement(updatedUnit.items, newItem);
      updatedUnit.items = updatedItems;
    } else {
      updatedUnit.items.push(newItem);
    }
    const updatedUnits = replaceArrayElement(storageUnits, updatedUnit);
    setCurrentUnit(updatedUnit);
    setStorageUnits(updatedUnits);
    try {
      await AsyncStorage.setItem('@InventoryApp_storageUnits', JSON.stringify(updatedUnits));
      navigation.goBack();
    } catch (e) {
      alert('Error: could not save to device storage');
    }
  };

  const handleReset = () => {
    setName("");
    setQuantity("1");
    setExpDate('');
    setReferenceDay('');
  };
  
  const renderSelectedDay = () => {
    if (expDate) {
      const momentDate = moment(expDate, "YYYY-MMM-DD");
      return momentDate.format("MMM. Do, YYYY");
    } else return "Not Set";
  };

  const renderButtonDisabled = () => {
    return !(name || quantity > 1 || expDate);
  };

  const renderButtonTextStyles = () => {
    return !(name || quantity > 1 || expDate) ? itemPageStyles.disabledText : defaultStyles.text;
  };

  const RenderedCalendar = useMemo(() => {
    const calendar = generateCalendar(referenceDay);
    return (
      <Calendar
        expDate={expDate}
        referenceDay={referenceDay}
        calendarMatrix={calendar}
        handleDayPress={handleDayPress}
      />
    );
  }, [referenceDay]);

  return (
    <TouchableWithoutFeedback onPress={handleInputBlur} accessible={false}>
      <SafeAreaView style={defaultStyles.contentContainer}>
        <Text style={defaultStyles.pageTitle}>New Item</Text>
        <View style={itemPageStyles.toolbar}>
          <Pressable
            style={itemPageStyles.toolbarOption}
            onPress={() => handleOption("back")}
          >
            <SimpleLineIcons name="arrow-left-circle" size={30} color="black" />
          </Pressable>
          <Pressable
            style={itemPageStyles.toolbarOption}
            onPress={() => handleOption("scan")}
          >
            <MaterialCommunityIcons
              name="barcode-scan"
              size={34}
              color="black"
            />
          </Pressable>
          <Pressable
            style={itemPageStyles.toolbarOption}
            onPress={() => handleOption("delete")}
          >
            <SimpleLineIcons name="settings" size={30} color="black" />
          </Pressable>
        </View>
        <View style={itemPageStyles.content}>
          <View style={itemPageStyles.inputContainer}>
            <Text style={itemPageStyles.inputLabel}>Item Name *</Text>
            <TextInput
              style={renderInputStyle("name")}
              onFocus={() => handleFocus("name")}
              onBlur={handleInputBlur}
              onChangeText={setName}
              value={name}
              placeholder="Enter a name here..."
              blurOnSubmit={false}
              onSubmitEditing={() => {console.log(quantityInput.current.value); quantityInput.current.focus()}}
            />
          </View>
          <View style={itemPageStyles.inputContainer}>
            <Text style={itemPageStyles.inputLabel}>
              Item Quantity
            </Text>
            <TextInput
              style={renderInputStyle("quantity")}
              onFocus={() => handleFocus("quantity")}
              onBlur={handleInputBlur}
              onChangeText={setQuantity}
              value={quantity}
              placeholder="Enter a quantity..."
              keyboardType='number-pad'
              blurOnSubmit={false}
              ref={quantityInput}
            />
          </View>
          <View style={itemPageStyles.expiryDateContainer}>
            <View>
              <Text style={itemPageStyles.inputLabel}>
                Expiry Date
              </Text>
              <Text style={defaultStyles.text}>{renderSelectedDay()}</Text>
            </View>
            <Pressable
              style={itemPageStyles.button}
              onPress={handleShowButtonPress}
            >
              <Text style={defaultStyles.text}>Show Calendar</Text>
            </Pressable>
          </View>
          <View style={itemPageStyles.actionsContainer}>
            <Pressable
              disabled={renderButtonDisabled()}
              style={itemPageStyles.actionButton}
              onPress={handleSave}
            >
              <Text style={renderButtonTextStyles()}>Save</Text>
            </Pressable>
            <Pressable
              disabled={renderButtonDisabled()}
              style={itemPageStyles.actionButton}
              onPress={handleReset}
            >
              <Text style={renderButtonTextStyles()}>Reset</Text>
            </Pressable>
          </View>
          <CustomModal
            isVisible={showCalendar}
            closeModal={() => setShowCalendar(false)}
          >
            {RenderedCalendar}
          </CustomModal>
          <CustomModal
            isVisible={showScanner}
            closeModal={() => setShowScanner(false)}
          >
            <BarcodeScanner setScannedData={handleScannedData} closeModal={() => setShowScanner(false)} />
          </CustomModal>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
