import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Store } from "../Store";
import { cloneStorageUnit, replaceArrayElement, saveLocalData } from "../utils";

import { Item } from "./Item";

import { defaultStyles } from "../Styles/defaultStyles";
import { storageUnitPageStyles } from "../Styles/storageUnitPageStyles";

export const StorageUnitPage = ({ navigation }) => {
  const { currentUnit, setCurrentUnit, storageUnits, setStorageUnits } =
    useContext(Store);
  const [items, setItems] = useState(currentUnit.items);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    setItems(currentUnit.items);
  }, [currentUnit]);

  const handleOption = (option) => {
    switch (option) {
      case "back":
        navigation.navigate("HomePage");
        break;
      case "add":
        navigation.navigate("ItemPage");
        break;
      case "delete":
        setDeleteMode(!deleteMode);
        break;
      default:
        break;
    }
  };

  const handleDelete = async (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    const updatedUnit = cloneStorageUnit(currentUnit);
    updatedUnit.items = updatedItems;
    const updatedStorageUnits = replaceArrayElement(storageUnits, updatedUnit);
    setCurrentUnit(updatedUnit);
    setStorageUnits(updatedStorageUnits);
    await saveLocalData(updatedStorageUnits);
  };
  
  const handleSelected = (itemData) => {
    navigation.navigate("ItemPage", {
      itemData, exists: true
    })
  }

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style={defaultStyles.appTitle}>INVENTORY</Text>
      <Text style={defaultStyles.pageTitle}>{currentUnit.name}</Text>
      <View style={defaultStyles.toolbar}>
        <Pressable
          style={defaultStyles.toolbarOption}
          onPress={() => handleOption("back")}
        >
          <SimpleLineIcons name="arrow-left-circle" size={30} color="black" />
        </Pressable>
        <Pressable
          style={defaultStyles.toolbarOption}
          onPress={() => handleOption("add")}
        >
          <SimpleLineIcons name="plus" size={30} color="black" />
        </Pressable>
        <Pressable
          style={defaultStyles.toolbarOption}
          onPress={() => handleOption("delete")}
        >
          <SimpleLineIcons name="minus" size={30} color="black" />
        </Pressable>
      </View>

      <View style={defaultStyles.contentContainer}>
        {items.length ? (
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <Item
                data={item}
                deleteMode={deleteMode}
                onDelete={handleDelete}
                onSelected={handleSelected}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={storageUnitPageStyles.flatListContainer}
          />
        ) : (
          <Text style={storageUnitPageStyles.noItems}>No items...</Text>
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
