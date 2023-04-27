import React, { useContext, useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { Store } from "../Store";
import { Entypo } from '@expo/vector-icons';
import { storageUnitListItemStyles } from "../Styles/storageUnitListItemStyles";

// TODO: GET STORAGE UNIT DATA FROM API BY CALLING WITH STORAGE UNIT ID

export const StorageUnitListItem = ({ data, toStorageUnitPage, openOptions }) => {
  const { setCurrentUnit } = useContext(Store);
  
  const handlePressIn = () => {
    // todo highlight selected item
  }
  
  const handlePress = () => {
    setCurrentUnit(data);
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
      <View style={storageUnitListItemStyles.container}>
        <View>
          <Text style={storageUnitListItemStyles.name}>{data.name}</Text>
          <Text style={storageUnitListItemStyles.amount}>{renderLength()}</Text>
        </View>
        <Entypo onPress={handleOpenOptions} name="dots-three-vertical" size={24} color="black" />
      </View>
    </Pressable>
  );
};

export const RenderStorageUnits = ({ data, toStorageUnitPage, openOptions }) => {
  return (
    <View style={storageUnitListItemStyles.renderStorageUnits}>
      {data.map((item) => (
        <StorageUnitListItem key={item.id} data={item} toStorageUnitPage={toStorageUnitPage} openOptions={openOptions} />
      ))}
    </View>
  );
};
