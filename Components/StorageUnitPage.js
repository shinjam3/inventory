import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, StatusBar, View, Text, Pressable } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Store } from "../Store";

import { defaultStyles } from "../Styles/defaultStyles";
import { storageUnitPageStyles } from "../Styles/storageUnitPageStyles";

export const StorageUnitPage = ({ navigation }) => {
  const { currentUnit } = useContext(Store);
  const [items, setItems] = useState(currentUnit.items);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // todo: fix unit page not rendering new item immediately
  useEffect(() => {
    setItems(currentUnit.items);
  }, [currentUnit])

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
          items.map(item => (
            <View key={item.id}>
              <Text>{item.name}</Text>
              <Text>{item.desc}</Text>
              <Text>{item.expiryDate}</Text>
            </View>
          ))
        ) : (
          <Text style={storageUnitPageStyles.noItems}>No items...</Text>
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
