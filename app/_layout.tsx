import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { RealmProvider } from '@realm/react';
import 'react-native-reanimated';
import { Task, Category } from "@/realm";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <RealmProvider schema={[Task, Category]} schemaVersion={7}>
      <ThemeProvider value={DefaultTheme}>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </ThemeProvider>
    </RealmProvider>
  );
}
