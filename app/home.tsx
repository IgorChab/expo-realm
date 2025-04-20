import React, { useState } from "react";
import {View, Text, StyleSheet, Pressable, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@realm/react";
import { Task } from "@/realm";
import {AddCategoryModal, AddTaskModal, Button, CategoryItem} from "@/components";

export default function HomeScreen() {
  const [isVisibleAddTaskModal, setVisibleAddTaskModal] = useState(false);
  const [isVisibleAddCategoryModal, setIsVisibleAddCategoryModal] = useState(false);
  const tasks = useQuery(Task);

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
        <ScrollView horizontal style={styles.categoriesContainer} contentContainerStyle={styles.contentContainerStyle}>
          <CategoryItem title='Work' icon='briefcase' color='#FFE600' />
          <CategoryItem title='Sport' icon='heart' color='#52D22E' />
          <CategoryItem title='Habits' icon='star' color='#6270F0' />
        </ScrollView>
      </View>
      <View style={styles.taskListSection}>
        <View style={styles.taskListHeader}>
          <Text style={styles.taskListTitle}>Task List</Text>
          <Button title="Add Task" size="medium" onPress={() => setVisibleAddTaskModal(true)} />
        </View>
        <View>
          {tasks.map((task) => (
            <Text key={task.id}>{JSON.stringify(task)}</Text>
          ))}
        </View>
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
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    gap: 16,
    paddingTop: 30,
    paddingBottom: 20
  },
  taskListSection: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  taskListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskListTitle: {
    fontFamily: 'Helvetica',
    fontWeight: '700',
    fontSize: 18,
  },
})
