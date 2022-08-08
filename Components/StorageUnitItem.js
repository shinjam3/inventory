import React, { useContext, useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Store } from "../Store";
import { Entypo } from '@expo/vector-icons';
import { storageUnitItemStyles } from "../Styles/storageUnitItemStyles";

// TODO: GET STORAGE UNIT DATA FROM API BY CALLING WITH STORAGE UNIT ID

export const StorageUnitItem = ({ data, toStorageUnitPage, openOptions }) => {
  const { setStorageUnit } = useContext(Store);
  
  const handlePressIn = () => {
    // todo highlight selected item
  }
  
  const handlePress = () => {
    setStorageUnit(data);
    toStorageUnitPage();
  };
  
  const renderLength = () => {
    if (data.items.length === 1) return '1 item';
    return `${data.items.length} items`;
  }
  
  const handleOpenOptions = () => {
    openOptions(data);
  }
  
  return (
    <Pressable onPressIn={handlePressIn} onPress={handlePress} onLongPress={handleOpenOptions}>
      <View style={storageUnitItemStyles.container}>
        <View>
          <Text style={storageUnitItemStyles.name}>{data.name}</Text>
          <Text style={storageUnitItemStyles.amount}>{renderLength()}</Text>
        </View>
        <Entypo onPress={handleOpenOptions} name="dots-three-vertical" size={24} color="black" />
      </View>
    </Pressable>
  );
};

export const RenderStorageUnits = ({ data, toStorageUnitPage, openOptions }) => {
  return (
    <View style={storageUnitItemStyles.renderStorageUnits}>
      {data.map((item) => (
        <StorageUnitItem key={item.id} data={item} toStorageUnitPage={toStorageUnitPage} openOptions={openOptions} />
      ))}
    </View>
  );
};
