import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, StatusBar, View, Text, Pressable, FlatList } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Store } from "../Store";

import {StorageUnitItem} from './StorageUnitItem';

import { defaultStyles } from "../Styles/defaultStyles";
import { storageUnitPageStyles } from "../Styles/storageUnitPageStyles";

export const StorageUnitPage = ({ navigation }) => {
  const { currentUnit } = useContext(Store);
  const [items, setItems] = useState(currentUnit.items);
  const [showAddModal, setShowAddModal] = useState(false);

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
        break;
      default:
        break;
    }
  };

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
          <View style={storageUnitPageStyles.flatListContainer}>
            <FlatList
              data={items}
              renderItem={StorageUnitItem}
              keyExtractor={item => item.id}
            />
          </View>
        ) : (
          <Text style={storageUnitPageStyles.noItems}>No items...</Text>
          //<StorageUnitItem item={{name: 'n', desc: 'd', expiryDate: 'today'}} />
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