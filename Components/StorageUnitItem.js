import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { storageUnitItemStyles } from "../Styles/storageUnitItemStyles";
import {defaultStyles} from '../Styles/defaultStyles';

export const StorageUnitItem = ({ item }) => {
  
  return (
    <View style={storageUnitItemStyles.container}>
      <Text style={storageUnitItemStyles.name}>{item.name}</Text>
      <Text style={defaultStyles.text}>{item.desc}</Text>
      <Text style={defaultStyles.text}>Expiry date: {item.expiryDate}</Text>
    </View>
  );
};
