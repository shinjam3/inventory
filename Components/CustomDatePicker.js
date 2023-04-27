import React, { useState, useEffect } from "react";
import { View, Text, Platform, Pressable } from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CustomModal } from "./CustomModal";
import { itemPageStyles } from "../Styles/itemPageStyles";

export const CustomDatePicker = ({
  expiryDate,
  notificationDate,
  setNotificationDate,
  showDatePicker,
}) => {
  const [expDateNotif, setExpDateNotif] = useState("");

  useEffect(() => {
    if (notificationDate) setExpDateNotif(notificationDate);
  }, [notificationDate]);

  const onExpDateNotifChange = (event, selectedDate, save) => {
    if (event.type === "set") {
      const expDateMoment = moment(expiryDate, "YYYY-MMM-DD");
      const selectedDateMoment = moment(selectedDate);
      if (!expDateMoment.isValid()) {
        alert("Please select an expiry date.");
      } else if (
        selectedDateMoment.isSame(expDateMoment, "day") ||
        selectedDateMoment.isAfter(expDateMoment, "day")
      ) {
        alert("Cannot pick a later notification date than the expiry date.");
        setNotificationDate(null);
      } else {
        if ((Platform.OS === "ios" && save) || Platform.OS === "android")
          setNotificationDate(selectedDate);
      }
    } else {
      setNotificationDate(null);
    }
  };

  return Platform.OS === "ios" ? (
    <CustomModal isVisible={showDatePicker} closeModal={() => setNotificationDate(null)}>
      <View style={{ backgroundColor: "white" }}>
        <DateTimePicker
          display="spinner"
          value={expDateNotif || new Date()}
          mode={"date"}
          onChange={(event, day) => setExpDateNotif(day)}
          textColor="black"
        />
      </View>
      <View style={{ ...itemPageStyles.actionsContainer, marginTop: 20 }}>
        <Pressable
          style={{ ...itemPageStyles.actionButton, backgroundColor: "gainsboro" }}
          onPress={() => onExpDateNotifChange({ type: "set" }, expDateNotif, true)}
        >
          <Text>Save</Text>
        </Pressable>
        <Pressable
          style={{ ...itemPageStyles.actionButton, backgroundColor: "gainsboro" }}
          onPress={() => setNotificationDate(null)}
        >
          <Text>Cancel</Text>
        </Pressable>
      </View>
    </CustomModal>
  ) : (
    showDatePicker && (
      <DateTimePicker
        display="spinner"
        value={expDateNotif || new Date()}
        mode={"date"}
        onChange={onExpDateNotifChange}
      />
    )
  );
};
