import React, { useState, useContext } from "react";
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
  Alert,
} from "react-native";
import { Store } from "../Store";
import { defaultModalStyles } from "../Styles/defaultModalStyles";
import { storageUnitOptionsStyles } from "../Styles/storageUnitOptionsStyles";

export const StorageUnitOptions = ({
  unitData,
  isVisible,
  toStorageUnitPage,
  renameStorageUnit,
  deleteStorageUnit,
  closeOptions,
}) => {
  const { setCurrentUnit } = useContext(Store);
  const { id, name, items } = unitData;
  const [renameSelected, setRenameSelected] = useState(false);
  const [newName, setNewName] = useState("");

  const handleRename = () => {
    setRenameSelected(false);
    renameStorageUnit(id, newName);
    closeOptions();
  };

  const handleDelete = () => {
    deleteStorageUnit(id);
    closeOptions();
  };

  const createRenameWarning = () => {
    Alert.alert(
      "Warning",
      `Renaming a storage unit cannot be undone. Are you sure you want to rename "${name}"?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "Rename", onPress: handleRename },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  const createDeleteWarning = () => {
    Alert.alert(
      "Warning",
      `Deleting a storage unit cannot be undone. Are you sure you want to delete "${name}"?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "Delete", onPress: handleDelete },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  const handleCloseOptions = () => {
    setRenameSelected(false);
    closeOptions();
  };

  const handleOptionSelect = (option) => {
    switch (option) {
      case "open":
        setCurrentUnit(unitData);
        handleCloseOptions();
        toStorageUnitPage();
        break;
      case "rename":
        setRenameSelected(true);
        break;
      case "delete":
        createDeleteWarning();
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCloseOptions}
    >
      <TouchableWithoutFeedback onPress={handleCloseOptions}>
        <View style={defaultModalStyles.overlay} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={storageUnitOptionsStyles.content}>
          {renameSelected ? (
            <View style={storageUnitOptionsStyles.renameContainer}>
              <Text style={storageUnitOptionsStyles.inputLabel}>
                Rename "{name}"
              </Text>
              <TextInput
                onChangeText={setNewName}
                value={newName}
                style={storageUnitOptionsStyles.input}
              />
              <View style={storageUnitOptionsStyles.buttonContainer}>
                <Pressable
                  style={storageUnitOptionsStyles.button}
                  onPress={() => setRenameSelected(false)}
                >
                  <Text style={storageUnitOptionsStyles.buttonText}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={storageUnitOptionsStyles.button}
                  onPress={createRenameWarning}
                >
                  <Text style={storageUnitOptionsStyles.buttonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={storageUnitOptionsStyles.options}>
              <Text style={storageUnitOptionsStyles.name}>{name}</Text>
              <View style={storageUnitOptionsStyles.optionsContainer}>
                <Pressable
                  style={storageUnitOptionsStyles.option}
                  onPress={() => handleOptionSelect("open")}
                >
                  <Text style={storageUnitOptionsStyles.optionText}>Open</Text>
                </Pressable>
                <Pressable
                  style={storageUnitOptionsStyles.option}
                  onPress={() => handleOptionSelect("rename")}
                >
                  <Text style={storageUnitOptionsStyles.optionText}>
                    Rename
                  </Text>
                </Pressable>
                <Pressable
                  style={storageUnitOptionsStyles.option}
                  onPress={() => handleOptionSelect("delete")}
                >
                  <Text style={storageUnitOptionsStyles.optionText}>
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
