import React, {useState, useEffect} from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

import { itemStyles } from "../Styles/itemStyles";
import {defaultStyles} from '../Styles/defaultStyles';

export const Item = ({ data, deleteMode, onDelete, onSelected }) => {
  const [isDeleteMode, setIsDeleteMode] = useState(deleteMode);
  
  useEffect(() => {
    setIsDeleteMode(deleteMode);
  }, [deleteMode]);
  
  return (
    <Pressable style={itemStyles.container} onPress={() => onSelected(data)}>
      {isDeleteMode && <View style={itemStyles.delete}>
        <Ionicons onPress={() => onDelete(data.id)} name="md-trash-sharp" size={24} color="black" />
      </View>}
      <View style={itemStyles.details}>
        <Text style={itemStyles.name}>{data.name}</Text>
        <Text style={defaultStyles.text}>Quantity: {data.quantity}</Text>
        <Text style={defaultStyles.text}>Expiry date: {data.expiryDate}</Text>
      </View>
    </Pressable>
  );
};
