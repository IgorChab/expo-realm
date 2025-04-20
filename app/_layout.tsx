import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { RealmProvider } from '@realm/react';
import 'react-native-reanimated';
import { Task } from "@/realm";

export default function RootLayout() {
  return (
    <RealmProvider schema={[Task]} schemaVersion={5}>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </RealmProvider>
  );
}
