import React from 'react';
import { Pressable, View, StyleSheet, Text, Alert } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colorWithAlpha } from "@/helpers";
import { Category, Task } from "@/realm";
import {useQuery, useRealm} from "@realm/react";

interface CategoryItemProps {
  category: Category;
  selected?: boolean;
  selectCategory: (category: Category) => void
}

export const CategoryItem = ({ category, selected, selectCategory }: CategoryItemProps) => {
  const { color, title, icon, tasks } = category
  
  const realm = useRealm();
  
  const getTasksCountLabel = () => {
    if (!tasks || tasks.length === 0) {
      return `+0 tasks`
    }
    
    if (tasks.length < 10) {
      return `+0${tasks.length} task`
    }
    
    return `+${tasks.length} task`
  }
  
  const deleteCategory = () => {
    realm.write(() => {
      realm.delete(tasks)
      realm.delete(category)
    })
  }
  
  const confirmDeleteCategory = () => {
    Alert.alert('Deleting category', 'Do you really want to delete this category?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: deleteCategory
      }
    ])
  }
  
  return (
    <Pressable
      style={[styles.container, selected && styles.shadow, { shadowColor: color }]}
      onPress={() => selectCategory(category)}
      onLongPress={confirmDeleteCategory}
    >
      <View style={[styles.innerContainer, { backgroundColor: colorWithAlpha(color, 0.2) }]}>
        <View style={[styles.iconContainer, styles.shadowIcon, { borderColor: color, shadowColor: color }]}>
          <FontAwesome name={icon} size={24} color={color} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.tasksCount}>{getTasksCountLabel()}</Text>
        {selected && (
          <View style={[styles.bar, { backgroundColor: color } ]} />
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderTopRightRadius: 63,
    backgroundColor: 'white',
  },
  innerContainer: {
    width: 112,
    height: 136,
    borderRadius: 20,
    borderTopRightRadius: 63,
    borderWidth: 2,
    borderColor: '#ffffff',
    paddingHorizontal: 9,
    paddingTop: 11,
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    
    elevation: 14,
  },
  shadowIcon: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 10,
  },
  iconContainer: {
    width: 51,
    height: 51,
    borderRadius: 51,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Helvetica',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 5,
  },
  tasksCount: {
    fontFamily: 'Helvetica',
    fontWeight: '400',
    fontSize: 13,
    color: '#757575',
  },
  bar: {
    width: 71,
    height: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignSelf: 'center',
    marginTop: 'auto',
    bottom: -2,
  },
})