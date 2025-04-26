import React from 'react'
import { Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { Task } from "@/realm";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SwipeableProps } from "react-native-gesture-handler/src/components/ReanimatedSwipeable";
import { useRealm } from "@realm/react";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const { width } = Dimensions.get("window");

interface TaskItemProps {
  task: Task;
  handleTaskComplete: (task: Task) => void;
}

export const TaskItem = ({ task, handleTaskComplete }: TaskItemProps) => {
  const realm = useRealm();
  const translateX = useSharedValue(0)
  
  const deleteTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
  }
  
  const runDeletingAnimation = () => {
    translateX.value = withTiming(-width, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(deleteTask)();
      }
    });
  }
  
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))
  
  const renderRightActions: SwipeableProps['renderRightActions'] = () => (
    <AnimatedPressable
      style={[styles.iconContainer, animatedStyles]}
      onPress={runDeletingAnimation}
    >
      <FontAwesome name="trash-o" size={24} color="red" />
    </AnimatedPressable>
  )
  
  return (
    <Swipeable
      friction={2}
      renderRightActions={renderRightActions}
      containerStyle={{ overflow: 'visible' }}
    >
      <Animated.View style={[styles.container, animatedStyles]}>
        <Text style={styles.title}>{task.text}</Text>
        <Pressable
          style={[styles.checkbox, { backgroundColor: task.isCompleted ? '#bdefac' : '#eeeeee' }]}
          onPress={() => handleTaskComplete(task)}
        >
          {task.isCompleted && (
            <FontAwesome name="check" size={14} color="#52D22E" />
          )}
        </Pressable>
      </Animated.View>
    </Swipeable>
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
  iconContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
})