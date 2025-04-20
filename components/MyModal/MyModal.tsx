import React from 'react';
import Modal, { ModalProps } from 'react-native-modal';
import { View, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign'

export interface MyModalProps extends Partial<ModalProps> {
  setIsVisible: (visible: boolean) => void;
}

export const MyModal = ({ children, setIsVisible, ...props }: MyModalProps) => {
  const closeModal = () => {
    setIsVisible(false);
  }
  
  return (
    <Modal onBackdropPress={closeModal} {...props}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign name='close' size={24} color='#242424' style={styles.closeButton} onPress={closeModal} />
        </View>
        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
  },
  header: {
    height: 30,
  },
  closeButton: {
    marginLeft: 'auto',
  }
})