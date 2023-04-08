import React, { useState, useContext, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  Modal,
  View,
  SafeAreaView,
  Button,
  TextInput,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Pressable,
} from "react-native";
import "react-native-get-random-values";
import * as Crypto from 'expo-crypto';
import { Store } from "../Store";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageUnitListItem, RenderStorageUnits } from "./StorageUnitListItem";
import { AddNewStorageModal } from "./AddNewStorageModal";
import { StorageUnitOptions } from "./StorageUnitOptions";

import { defaultStyles } from "../Styles/defaultStyles";
import { homePageStyles, addModalStyles } from "../Styles/homePageStyles";

export const HomePage = ({ navigation }) => {
  const {storageUnits, setStorageUnits} = useContext(Store);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(undefined);
  
  useEffect(() => {
    const getDataFromDevice = async () => {
      try {
        const jsonFromDevice = await AsyncStorage.getItem('@InventoryApp_storageUnits');
        const dataFromDevice = JSON.parse(jsonFromDevice);
        if (dataFromDevice !== null && Array.isArray(dataFromDevice)) {
          setStorageUnits(dataFromDevice);
        }
      } catch(e) {}
    };
    
    getDataFromDevice();
  }, []);

  const handleSubmitName = async (submittedName) => {
    setShowAddModal(false);
    const newUnit = {
      id: Crypto.randomUUID(),
      name: submittedName,
      items: [],
    };
    const newUnits = [newUnit, ...storageUnits];
    setStorageUnits(newUnits);
    try {
      await AsyncStorage.setItem('@InventoryApp_storageUnits', JSON.stringify(newUnits));
    } catch (e) {
      alert('Error: could not save to device storage');
    }
  };

  const handleToStorageUnitPage = () => navigation.navigate("StorageUnitPage");

  const handleOpenOptions = (unitData) => {
    setShowOptions(true);
    setSelectedUnit(unitData);
  };

  const handleRenameUnit = (unitId, newName) => {
    const renameUnit = storageUnits.find((unit) => unit.id === unitId);
    if (renameUnit) renameUnit.name = newName;
  };

  const handleDeleteUnit = (unitId) => {
    const filtered = storageUnits.filter((unit) => unit.id !== unitId);
    setStorageUnits(filtered);
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style={defaultStyles.appTitle}>INVENTORY</Text>
      <Text style={defaultStyles.pageTitle}>Storage Units</Text>
      <View style={defaultStyles.contentContainer}>
        {storageUnits.length ? (
          // have to put FlatList container styles in a View that wraps the list
          <View style={homePageStyles.flatListContainer}>
              <FlatList
                bounces={false}
                data={storageUnits}
                renderItem={({ item }) => (
                  <StorageUnitListItem
                    data={item}
                    toStorageUnitPage={handleToStorageUnitPage}
                    openOptions={handleOpenOptions}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          /*
          storageUnits.length < 4 ? (
            <RenderStorageUnits
              data={storageUnits}
              toStorageUnitPage={handleToStorageUnitPage}
              openOptions={handleOpenOptions}
            />
          ) : (
            <View style={homePageStyles.flatList}>
              <FlatList
                data={storageUnits}
                renderItem={({ item }) => (
                  <StorageUnitListItem
                    data={item}
                    toStorageUnitPage={handleToStorageUnitPage}
                    openOptions={handleOpenOptions}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          )
          */
        ) : (
          <Text style={homePageStyles.noUnitsText}>No storage units</Text>
        )}
        <Pressable
          style={homePageStyles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <SimpleLineIcons name="plus" size={40} color="black" />
        </Pressable>
        <AddNewStorageModal
          isVisible={showAddModal}
          submitName={handleSubmitName}
          closeModal={() => setShowAddModal(false)}
        />
        {selectedUnit && (
          <StorageUnitOptions
            unitData={selectedUnit}
            isVisible={showOptions}
            toStorageUnitPage={handleToStorageUnitPage}
            renameStorageUnit={handleRenameUnit}
            deleteStorageUnit={handleDeleteUnit}
            closeOptions={() => setShowOptions(false)}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
