import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
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
        <Stack.Screen name="journey" options={{ title: 'My Journey' }} />
        <Stack.Screen name="journey-timeline" options={{ title: 'Your Timeline' }} />
        <Stack.Screen name="professionals" options={{ title: 'My Professionals' }} />
        <Stack.Screen name="profile" options={{ title: 'My Profile' }} />
      </Stack>
    </>
  );
}
