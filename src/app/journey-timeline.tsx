import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/bottom-nav';
import { INITIAL_MOMENTS, momentType } from '@/constants/journey';

export default function JourneyTimelineScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.heading}>Every moment, in one place</Text>
            <Text style={styles.subheading}>This is the full story of your journey so far.</Text>

            <View>
              {INITIAL_MOMENTS.map((moment, index) => {
                const type = momentType(moment.typeId);
                const isLast = index === INITIAL_MOMENTS.length - 1;
                return (
                  <View key={moment.id} style={styles.row}>
                    <View style={styles.railColumn}>
                      <View style={[styles.dot, { backgroundColor: type.color }]} />
                      {!isLast && <View style={styles.rail} />}
                    </View>
                    <View style={styles.card}>
                      <View style={[styles.badge, { backgroundColor: `${type.color}26` }]}>
                        {type.Icon ? (
                          <type.Icon color={type.color} size={18} />
                        ) : (
                          <Text style={[styles.badgeGlyph, { color: type.color }]}>{type.glyph}</Text>
                        )}
                      </View>
                      <View style={styles.cardCopy}>
                        <Text style={[styles.date, { color: type.color }]}>{moment.date}</Text>
                        <Text style={styles.title}>{moment.title}</Text>
                        {!!moment.note && <Text style={styles.note}>{moment.note}</Text>}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>

            <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
              <Text style={styles.backText}>← Back to My Journey</Text>
            </Pressable>
          </View>
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF5F2' },
  page: { flex: 1 },
  scrollContent: { alignItems: 'center', paddingBottom: 28 },
  content: { width: '100%', maxWidth: 640, paddingHorizontal: 20, paddingTop: 16 },
  heading: { color: '#302B41', fontSize: 24, lineHeight: 30, fontWeight: '800' },
  subheading: { color: '#665E68', fontSize: 14, lineHeight: 20, marginTop: 6, marginBottom: 20 },
  row: { flexDirection: 'row' },
  railColumn: { width: 28, alignItems: 'center' },
  dot: { width: 14, height: 14, borderRadius: 7, marginTop: 6 },
  rail: { flex: 1, width: 2, backgroundColor: '#E9DFDB', marginVertical: 4, minHeight: 20 },
  card: { flex: 1, flexDirection: 'row', gap: 12, backgroundColor: '#FFFCFA', borderColor: '#E9DFDB', borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 18, alignItems: 'flex-start' },
  badge: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  badgeGlyph: { fontSize: 17, fontWeight: '700' },
  cardCopy: { flex: 1 },
  date: { fontSize: 12, fontWeight: '800' },
  title: { color: '#302B41', fontSize: 15, fontWeight: '700', marginTop: 3, lineHeight: 20 },
  note: { color: '#7B7177', fontSize: 13, lineHeight: 18, marginTop: 4 },
  backButton: { alignSelf: 'center', marginTop: 8 },
  pressed: { opacity: 0.7 },
  backText: { color: '#9A6E7D', fontSize: 14, fontWeight: '800' },
});
