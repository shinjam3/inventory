import React from "react";
import {
  Modal,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { defaultModalStyles } from '../Styles/defaultModalStyles';

export const CustomModal = ({ isVisible, closeModal, children }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={defaultModalStyles.overlay} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={defaultModalStyles.content}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};