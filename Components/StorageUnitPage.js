import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, StatusBar, View, Text, Pressable, FlatList } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Store } from "../Store";
import {cloneStorageUnit, replaceStorageUnit} from '../utils';

import {StorageUnitItem} from './StorageUnitItem';

import { defaultStyles } from "../Styles/defaultStyles";
import { storageUnitPageStyles } from "../Styles/storageUnitPageStyles";

export const StorageUnitPage = ({ navigation }) => {
  const { currentUnit, setCurrentUnit, storageUnits, setStorageUnits } = useContext(Store);
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
        navigation.navigate("NewStorageItemPage");;
        break;
      case "delete":
        setDeleteMode(!deleteMode);
        break;
      default:
        break;
    }
  };
  
  const handleDelete = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    const updatedUnit = cloneStorageUnit(currentUnit);
    updatedUnit.items = updatedItems;
    const updatedStorageUnits = replaceStorageUnit(storageUnits, updatedUnit);
    setCurrentUnit(updatedUnit);
    setStorageUnits(updatedStorageUnits);
  }

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style={defaultStyles.pageTitle}>{currentUnit.name}</Text>
      <View style={storageUnitPageStyles.toolbar}>
        <Pressable
          style={storageUnitPageStyles.toolbarOption}
          onPress={() => handleOption("back")}
        >
          <SimpleLineIcons name="arrow-left-circle" size={30} color="black" />
        </Pressable>
        <Pressable
          style={storageUnitPageStyles.toolbarOption}
          onPress={() => handleOption("add")}
        >
          <SimpleLineIcons name="plus" size={30} color="black" />
        </Pressable>
        <Pressable
          style={storageUnitPageStyles.toolbarOption}
          onPress={() => handleOption("delete")}
        >
          <SimpleLineIcons name="minus" size={30} color="black" />
        </Pressable>
      </View>

      <View style={defaultStyles.contentContainer}>
        {items.length ? (
            <FlatList
              data={items}
              renderItem={({item}) => (
                <StorageUnitItem
                  data={item}
                  deleteMode={deleteMode}
                  onDelete={handleDelete}
                />
              )}
              keyExtractor={item => item.id}
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

/*
items.map(item => (
            <StorageUnitItem key={item.id} data={item} />
          ))
*/