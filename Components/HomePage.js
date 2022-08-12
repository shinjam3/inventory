import React, { useState, useContext } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { Store } from "../Store";

import { StorageUnitItem, RenderStorageUnits } from "./StorageUnitItem";
import { AddNewStorageModal } from "./AddNewStorageModal";
import { StorageUnitOptions } from "./StorageUnitOptions";

import { defaultStyles } from "../Styles/defaultStyles";
import { homePageStyles, addModalStyles } from "../Styles/homePageStyles";

export const HomePage = ({ navigation }) => {
  const {storageUnits, setStorageUnits} = useContext(Store);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(undefined);
  
  console.log(storageUnits);

  const handleSubmitName = (submittedName) => {
    setShowAddModal(false);
    const newUnit = {
      id: uuidv4(),
      name: submittedName,
      items: [],
    };
    const newUnits = [newUnit, ...storageUnits];
    setStorageUnits(newUnits);
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
      <Text style={defaultStyles.pageTitle}>Storage Units</Text>
      <View style={defaultStyles.contentContainer}>
        {storageUnits.length ? (
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
                  <StorageUnitItem
                    data={item}
                    toStorageUnitPage={handleToStorageUnitPage}
                    openOptions={handleOpenOptions}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          )
        ) : (
          <Text style={homePageStyles.noUnitsText}>No storage units</Text>
        )}
        <Pressable style={homePageStyles.button} onPress={() => setShowAddModal(true)}>
          <Text style={homePageStyles.buttonText}>Create New</Text>
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
