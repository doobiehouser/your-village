import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    // This app is light-themed only. On web, some mobile browsers (e.g. Chrome's
    // "Dark mode for web contents") will auto-invert pages that never declare a
    // color scheme, which breaks our colors. Declaring "light" opts us out.
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      let meta = document.querySelector('meta[name="color-scheme"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'color-scheme');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', 'light');
    }
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#FBF5F2' },
          headerShadowVisible: false,
          headerTintColor: '#493B43',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#FBF5F2' },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="ask-question" options={{ title: 'Ask a Question' }} />
        <Stack.Screen name="need-help" options={{ title: 'I Need Help' }} />
        <Stack.Screen name="community" options={{ title: 'Community' }} />
        <Stack.Screen name="journey" options={{ title: 'My Journey', headerTitleAlign: 'center' }} />
        <Stack.Screen name="journey-timeline" options={{ title: 'Your Timeline' }} />
        <Stack.Screen name="professionals" options={{ title: 'My Professionals' }} />
        <Stack.Screen name="messages" options={{ title: 'Messages' }} />
        <Stack.Screen name="profile" options={{ title: 'My Profile' }} />
      </Stack>
    </>
  );
}
