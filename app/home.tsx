import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useRealm } from "@realm/react";
import { Category, Task } from "@/realm";
import { AddCategoryModal, AddTaskModal, Button, CategoryItem, TaskItem } from "@/components";

export default function HomeScreen() {
  const [isVisibleAddTaskModal, setVisibleAddTaskModal] = useState(false);
  const [isVisibleAddCategoryModal, setIsVisibleAddCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const realm = useRealm();
  const tasks = useQuery(Task);
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
    setSelectedCategoryId(category.id.toString())
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.avatar} />
      </View>
      <View style={styles.tabSection}>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Task List</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Completed</Text>
        </Pressable>
      </View>
      <View>
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <Button title="Add" size="small" onPress={() => setIsVisibleAddCategoryModal(true)} />
        </View>
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
              selected={selectedCategoryId === category.id.toString()}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.taskListSection}>
        <View style={styles.taskListHeader}>
          <Text style={styles.taskListTitle}>Task List</Text>
          <Button title="Add Task" size="medium" onPress={() => setVisibleAddTaskModal(true)} />
        </View>
        <View style={styles.divider} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
        >
          {tasks.map((task) => (
            <TaskItem task={task} key={task.id.toString()} handleTaskComplete={handleTaskComplete} />
          ))}
        </ScrollView>
        {!tasks.isEmpty() && (
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
    alignSelf: 'center',
    marginHorizontal: 24,
    height: 60,
    backgroundColor: '#242424',
    borderRadius: 100,
    padding: 8,
    gap: 20,
    color: '#FFFFFF',
    marginBottom: 21,
  },
  tab: {
    width: 145,
    height: 43,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
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
  }
})
