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
} from "react-native";
import { addNewStorageModalStyles } from "../Styles/addNewStorageModalStyles";
import { defaultModalStyles } from '../Styles/defaultModalStyles';

export const AddNewStorageModal = ({ isVisible, submitName, closeModal }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name) {
      submitName(name);
      setName("");
    } else alert("Name cannot be empty");
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={defaultModalStyles.overlay} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={addNewStorageModalStyles.content}>
          <Text style={addNewStorageModalStyles.title}>New Storage Unit</Text>
          <Text style={addNewStorageModalStyles.inputLabel}>Storage Unit Name</Text>
          <TextInput
            style={addNewStorageModalStyles.input}
            onChangeText={setName}
            value={name}
            placeholder="Enter a name here..."
            placeholderTextColor="#000"
          />
          <View style={addNewStorageModalStyles.buttonContainer}>
            <Pressable style={addNewStorageModalStyles.button} onPress={closeModal}>
              <Text style={addNewStorageModalStyles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable style={addNewStorageModalStyles.button} onPress={handleSubmit}>
              <Text style={addNewStorageModalStyles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};