import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useRealm } from "@realm/react";
import { Category, Task } from "@/realm";
import { AddCategoryModal, AddTaskModal, Button, CategoryItem, TaskItem } from "@/components";
import { Realm } from "realm";
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const TAB_SECTION_WIDTH = width - 40;
const TAB_BUTTON_WIDTH = 145;
const VALUE_TO_TRANSLATE = TAB_SECTION_WIDTH - TAB_BUTTON_WIDTH - 8;

export default function HomeScreen() {
  const translateX = useSharedValue(8);
  const [isVisibleAddTaskModal, setVisibleAddTaskModal] = useState(false);
  const [isVisibleAddCategoryModal, setIsVisibleAddCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<Realm.BSON.UUID>();
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  const realm = useRealm();
  const tasks = useQuery({
    type: Task,
    query: (collection) => {
      if (showOnlyCompleted) {
        return collection.filtered('category.id == $0 && isCompleted == true', selectedCategoryId)
      } else {
        return collection.filtered('category.id == $0', selectedCategoryId)
      }
    },
  }, [selectedCategoryId, showOnlyCompleted]);
  const categories = useQuery(Category);
  
  const handleTaskComplete = (task: Task) => {
    realm.write(() => {
      task.isCompleted = !task.isCompleted
    })
  }
  
  const completeAllTasks = () => {
    realm.write(() => {
      for (const task of tasks) {
        task.isCompleted = true
      }
    })
  }
  
  const selectCategory = (category: Category) => {
    if (selectedCategoryId?.toString() === category.id.toString()) {
      setSelectedCategoryId(undefined);
    } else {
      setSelectedCategoryId(category.id)
    }
  }
  
  const showAllTasks = () => {
    setShowOnlyCompleted(false);
    translateX.value = 8
  }
  
  const showOnlyCompletedTasks = () => {
    setShowOnlyCompleted(true);
    translateX.value = VALUE_TO_TRANSLATE
  }
  
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(translateX.value) }]
  }))
  
  const taskTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      translateX.value,
      [8, VALUE_TO_TRANSLATE],
      ['#242424', '#FFFFFF']
    );
    return { color: withTiming(color) };
  });

  const completedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      translateX.value,
      [8, VALUE_TO_TRANSLATE],
      ['#FFFFFF', '#242424']
    );
    return { color: withTiming(color) };
  });
  
  
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.avatar} />
      </View>
      <View style={styles.tabSection}>
        <Animated.View style={[styles.tab, animatedStyles]} />
        <Pressable style={styles.switchBtn} onPress={showAllTasks}>
          <Animated.Text style={[styles.tabText, taskTextStyle]}>Task List</Animated.Text>
        </Pressable>
        <Pressable style={styles.switchBtn} onPress={showOnlyCompletedTasks}>
          <Animated.Text style={[styles.tabText, completedTextStyle]}>Completed</Animated.Text>
        </Pressable>
      </View>
      <View>
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <Button title="Add" size="small" onPress={() => setIsVisibleAddCategoryModal(true)} />
        </View>
        {categories.isEmpty() ? (
          <View style={styles.categoriesPlaceholder}>
            <Text>There will be categories here</Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
          >
            {categories.map((category) => (
              <CategoryItem
                key={category.id.toString()}
                category={category}
                selectCategory={selectCategory}
                selected={selectedCategoryId?.toString() === category.id.toString()}
              />
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.taskListSection}>
        <View style={styles.taskListHeader}>
          <Text style={styles.taskListTitle}>Task List</Text>
          <Button title="Add Task" size="medium" onPress={() => setVisibleAddTaskModal(true)} />
        </View>
        <View style={styles.divider} />
        {tasks.isEmpty()
          ? <Text style={{ textAlign: 'center' }}>There will be tasks here</Text>
          : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ paddingHorizontal: 20 }}
              contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
            >
              {tasks.map((task) => (
                <TaskItem task={task} key={task.id.toString()} handleTaskComplete={handleTaskComplete} />
              ))}
            </ScrollView>
          )}
        {!showOnlyCompleted && !tasks.isEmpty() && (
          <Button title='Select All Task' size='medium' onPress={completeAllTasks} style={styles.selectAllBtn} />
        )}
      </View>
      <AddTaskModal isVisible={isVisibleAddTaskModal} setIsVisible={setVisibleAddTaskModal} />
      <AddCategoryModal isVisible={isVisibleAddCategoryModal} setIsVisible={setIsVisibleAddCategoryModal} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  headerTitle: {
    fontFamily: 'Helvetica',
    fontWeight: '700',
    fontSize: 20,
  },
  avatar: {
    width: 31,
    height: 31,
    borderRadius: 30,
    backgroundColor: '#E3E6FF'
  },
  tabSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    width: TAB_SECTION_WIDTH,
    height: 60,
    backgroundColor: '#242424',
    borderRadius: 100,
    padding: 8,
    gap: 20,
    color: '#FFFFFF',
    marginBottom: 21,
  },
  tab: {
    width: TAB_BUTTON_WIDTH,
    height: 43,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    position: 'absolute',
  },
  switchBtn: {
    width: 145,
    height: 43,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    zIndex: 1,
  },
  tabText: {
    fontFamily: 'Helvetica',
    fontWeight: '700',
    fontSize: 16,
  },
  categoriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoriesTitle: {
    fontFamily: 'Helvetica',
    fontWeight: '700',
    fontSize: 18,
  },
  contentContainerStyle: {
    gap: 16,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  taskListSection: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingTop: 18,
  },
  taskListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  taskListTitle: {
    fontFamily: 'Helvetica',
    fontWeight: '700',
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginTop: 16,
    marginBottom: 24,
  },
  selectAllBtn: {
    marginTop: 10,
    marginBottom: 16,
    alignSelf: 'center',
  },
  categoriesPlaceholder: {
    height: 136,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
