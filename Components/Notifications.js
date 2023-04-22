import React from "react";
import { Text, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { notificationStyles } from "../Styles/notificationStyles";

export const Notifications = ({ notifs, closeNotif }) => {
  return notifs.map((notif, idx) => (
    <View key={idx} style={notificationStyles.notificationContainer}>
      <Text style={notificationStyles.text}>{notif}</Text>
      <SimpleLineIcons
        name="close"
        size={30}
        color="black"
        onPress={() => closeNotif(idx)}
      />
    </View>
  ));
};
