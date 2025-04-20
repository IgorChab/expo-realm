import React from 'react';
import { MyModal, MyModalProps } from "../MyModal/MyModal";
import { Text, TextInput, StyleSheet } from "react-native";
import { Button } from "../Button/Button";
import {Realm} from "realm";
import {useRealm} from "@realm/react";

interface AddTaskModalProps extends MyModalProps {}

export const AddTaskModal = ({ setIsVisible, ...props }: AddTaskModalProps) => {
  const realm = useRealm();
  const [text, setText] = React.useState('');
  
  const handleAddTask = () => {
    realm.write(() => {
      realm.create('Task', { id: new Realm.BSON.UUID(), text: '', isCompleted: false });
    });
    setIsVisible(false);
  };
  
  return (
    <MyModal setIsVisible={setIsVisible} {...props}>
      <Text style={styles.title}>Add Task</Text>
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        cursorColor='#757575'
        selectionColor='#757575'
      />
      <Button title="Save" size="large" style={styles.button} onPress={handleAddTask} />
    </MyModal>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Helvetica',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 16,
  },
  label: {
    color: '#757575',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ececec',
    borderRadius: 12,
    padding: 16,
  },
  button: {
    marginTop: 20,
  }
})