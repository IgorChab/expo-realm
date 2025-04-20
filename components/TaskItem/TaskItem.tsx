import React from 'react'
import { View, Text, Pressable, StyleSheet} from "react-native";
import { Task } from "@/realm";
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface TaskItemProps {
  task: Task;
  handleTaskComplete: (task: Task) => void;
}

export const TaskItem = ({ task, handleTaskComplete }: TaskItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.text}</Text>
      <Pressable
        style={[styles.checkbox, { backgroundColor: task.isCompleted ? '#bdefac' : '#eeeeee' }]}
        onPress={() => handleTaskComplete(task)}
      >
        {task.isCompleted && (
          <FontAwesome name="check" size={14} color="#52D22E" />
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 57,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    paddingVertical: 16,
    
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    
    elevation: 8,
  },
  title: {
    fontFamily: 'Helvetica',
    fontWeight: '400',
    fontSize: 16,
    flexShrink: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
})