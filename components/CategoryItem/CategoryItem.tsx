import React from 'react';
import { Pressable, View, StyleSheet, Text } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { IconName } from "@/constants";
import {colorWithAlpha} from "@/helpers";

interface CategoryItemProps {
  title: string;
  icon: IconName;
  color: string;
}

export const CategoryItem = ({ title, icon, color }: CategoryItemProps) => {
  return (
    <Pressable style={[styles.container, styles.shadow, { backgroundColor: colorWithAlpha(color, 0.5), shadowColor: color }]}>
      <View style={[styles.iconContainer, { borderColor: color }]}>
        <FontAwesome name={icon} size={24} color={color} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.tasksCount}>+03 task</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
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
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    
    elevation: 14,
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
  }
})