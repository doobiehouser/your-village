import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/bottom-nav';

type PlaceholderScreenProps = { icon: string; title: string; description: string };

export function PlaceholderScreen({ icon, title, description }: PlaceholderScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.page}>
        <View style={styles.content}>
          <View style={styles.iconCircle}><Text style={styles.icon}>{icon}</Text></View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>COMING SOON</Text></View>
        </View>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF5F2' },
  page: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingBottom: 64 },
  iconCircle: { width: 82, height: 82, borderRadius: 30, backgroundColor: '#F3E5E7', alignItems: 'center', justifyContent: 'center' },
  icon: { color: '#755866', fontSize: 38 },
  title: { color: '#3F3439', fontSize: 30, fontWeight: '700', marginTop: 24, textAlign: 'center' },
  description: { color: '#74666C', fontSize: 17, lineHeight: 25, textAlign: 'center', maxWidth: 430, marginTop: 12 },
  badge: { backgroundColor: '#EEE1E5', borderRadius: 999, paddingHorizontal: 15, paddingVertical: 8, marginTop: 26 },
  badgeText: { color: '#765964', fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
});
