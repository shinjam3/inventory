import React, {useState, useEffect} from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

import { storageUnitItemStyles } from "../Styles/storageUnitItemStyles";
import {defaultStyles} from '../Styles/defaultStyles';

export const StorageUnitItem = ({ data, deleteMode, onDelete }) => {
  const [isDeleteMode, setIsDeleteMode] = useState(deleteMode);
  
  useEffect(() => {
    setIsDeleteMode(deleteMode);
  }, [deleteMode]);
  
  return (
    <View style={storageUnitItemStyles.container}>
      {isDeleteMode && <View style={storageUnitItemStyles.delete}>
        <Ionicons onPress={() => onDelete(data.id)} name="md-trash-sharp" size={24} color="black" />
      </View>}
      <View style={storageUnitItemStyles.details}>
        <Text style={storageUnitItemStyles.name}>{data.name}</Text>
        <Text style={defaultStyles.text}>{data.desc}</Text>
        <Text style={defaultStyles.text}>Expiry date: {data.expiryDate}</Text>
      </View>
    </View>
  );
};
