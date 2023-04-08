import React from "react";
import {
  Modal,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { defaultModalStyles } from '../Styles/defaultModalStyles';

export const CustomModal = ({ isVisible, closeModal, children }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={defaultModalStyles.overlay} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={defaultModalStyles.content}>
          <View style={defaultModalStyles.closeModalButton}>
            <SimpleLineIcons name="close" size={30} color="black" onPress={closeModal} />
          </View>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};