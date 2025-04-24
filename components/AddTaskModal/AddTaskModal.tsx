import React, { useRef, useState } from 'react';
import { MyModal, MyModalProps } from "../MyModal/MyModal";
import {Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions, View} from "react-native";
import Popover from 'react-native-popover-view';
import { Button } from "../Button/Button";
import { Realm } from "realm";
import { useQuery, useRealm } from "@realm/react";
import AntDesign from '@expo/vector-icons/AntDesign';
import {Category, Task} from "@/realm";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

interface AddTaskModalProps extends MyModalProps {}

export const AddTaskModal = ({ setIsVisible, ...props }: AddTaskModalProps) => {
  const realm = useRealm();
  const categories = useQuery(Category);
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>();
  const popoverRef = useRef<Popover>(null);
  
  const handleAddTask = () => {
    realm.write(() => {
      realm.create<Task>('Task', { id: new Realm.BSON.UUID(), text, isCompleted: false, category });
    });
    setIsVisible(false);
    setText('')
    setCategory(undefined)
  };
  
  const onSelectCategory = (category: Category) => {
    popoverRef.current?.requestClose()
    setCategory(category)
  }
  
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
      {!categories.isEmpty() && (
        <View style={{ marginTop: 16 }}>
          <Text style={styles.label}>Category</Text>
          <Popover
            ref={popoverRef}
            arrowSize={{ width: 0, height: 0 }}
            offset={10}
            popoverStyle={styles.popover}
            from={(
              <TouchableOpacity style={styles.categoryBtn} activeOpacity={0.8}>
                <Text>{category ? category.title : 'Optional'}</Text>
                <AntDesign name="down" size={14} color="#242424" />
              </TouchableOpacity>
            )}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {categories.map((item) => (
                <TouchableOpacity
                  style={[styles.categoryItem, {
                    backgroundColor: item.id.toString() === category?.id.toString()
                      ? '#c7c7c7'
                      : '#ececec'
                  }]}
                  activeOpacity={0.8}
                  key={item.id.toString()}
                  onPress={() => onSelectCategory(item)}
                >
                  <FontAwesome name={item.icon} size={16} color='#242424' />
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Popover>
        </View>
      )}
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
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ececec',
    borderRadius: 12,
    padding: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ececec',
    padding: 16,
  },
  popover: {
    width: width - 80,
    maxHeight: 200,
    borderRadius: 12,
  },
  button: {
    marginTop: 20,
  }
})