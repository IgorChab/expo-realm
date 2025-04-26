import React, {useState} from 'react';
import { MyModal, MyModalProps } from "../MyModal/MyModal";
import {Text, TextInput, StyleSheet, View, Pressable} from "react-native";
import { Button } from "../Button/Button";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colorsList, iconsList } from "@/constants";
import { useRealm } from "@realm/react";
import { Realm } from "realm";

interface AddCategoryModalProps extends MyModalProps {}

export const AddCategoryModal = ({ setIsVisible, ...props }: AddCategoryModalProps) => {
  const realm = useRealm()
  const [categoryName, setCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  
  const isDisabled = !categoryName || !selectedColor || !selectedIcon;
  
  const createCategory = () => {
    if (isDisabled) return
    
    realm.write(() => {
      realm.create('Category', {
        id: new Realm.BSON.UUID(),
        color: selectedColor,
        icon: selectedIcon,
        title: categoryName,
      });
    })
    setIsVisible(false);
    setCategoryName('')
    setSelectedColor('')
    setSelectedIcon('')
  }
  
  return (
    <MyModal setIsVisible={setIsVisible} {...props}>
      <Text style={styles.title}>Add Category</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={categoryName}
        onChangeText={setCategoryName}
        style={styles.input}
        cursorColor='#757575'
        selectionColor='#757575'
      />
      <View style={styles.iconsContainer}>
        {iconsList.map((icon) => (
          <Pressable
            key={icon}
            style={[styles.iconWrapper, selectedIcon === icon && styles.selectedIcon]}
            onPress={() => setSelectedIcon(icon)}
          >
            <FontAwesome name={icon} size={24} color={selectedIcon === icon && styles.selectedIcon ? 'white' : "#242424"} />
          </Pressable>
        ))}
      </View>
      <View style={styles.colorsContainer}>
        {colorsList.map((color) => (
          <Pressable
            key={color}
            style={[styles.colorItem, selectedColor === color && styles.selectedColor, { backgroundColor: color }]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
      <Button
        title="Create Category"
        size="large"
        style={[styles.button, isDisabled && { opacity: 0.5 }]}
        onPress={createCategory}
        disabled={isDisabled}
      />
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
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  iconWrapper: {
    borderWidth: 1,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  selectedIcon: {
    borderWidth: 2,
    backgroundColor: '#242424',
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  colorItem: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  selectedColor: {
    borderWidth: 1.5,
    borderColor: '#242424',
  },
  button: {
    marginTop: 20,
  }
})