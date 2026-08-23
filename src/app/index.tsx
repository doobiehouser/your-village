import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/bottom-nav';

const actions = [
  { href: '/ask-question', icon: '•••', title: 'Ask a Question', color: '#8799B8', shape: 'bubble' },
  { href: '/need-help', icon: '♥', title: 'I Need Help', color: '#D98D98', shape: 'heart' },
  { href: '/journey', icon: '▦', title: 'My Journey', color: '#8A88B8', shape: 'calendar' },
  { href: '/community', icon: '●', title: 'Local Community', color: '#9A8FC4', shape: 'people' },
] as const;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const compact = width < 380;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.greeting}>
              <Text style={[styles.title, compact && styles.compactTitle]}>Good morning, Mama! <Text style={styles.titleHeart}>♥</Text></Text>
              <Text style={styles.subtitle}>How can we support you today?</Text>
            </View>
            <View style={styles.grid}>
              {actions.map((action) => (
                <View key={action.title} style={styles.cardWrapper}>
                  <Link href={action.href} asChild>
                    <Pressable style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}>
                      <View style={styles.artwork}>
                        {action.shape === 'bubble' && <View style={[styles.bubble, { backgroundColor: action.color }]}><Text style={styles.bubbleDots}>{action.icon}</Text></View>}
                        {action.shape === 'heart' && <><Text style={[styles.largeIcon, { color: action.color }]}>{action.icon}</Text><Text style={[styles.hand, { color: action.color }]}>⌣</Text></>}
                        {action.shape === 'calendar' && <View style={[styles.calendar, { borderColor: action.color }]}><Text style={[styles.calendarIcon, { color: action.color }]}>{action.icon}</Text></View>}
                        {action.shape === 'people' && <View style={styles.people}><Text style={[styles.peopleBack, { color: action.color }]}>● ●</Text><Text style={[styles.peopleFront, { color: action.color }]}>●</Text></View>}
                      </View>
                      <Text style={[styles.actionTitle, compact && styles.compactActionTitle]}>{action.title}</Text>
                    </Pressable>
                  </Link>
                </View>
              ))}
            </View>
            <View style={styles.encouragement}>
              <View style={styles.encouragementCopy}>
                <Text style={styles.encouragementTitle}>Daily Encouragement</Text>
                <Text style={styles.encouragementText}>You are doing an amazing job. Your baby is lucky to have you.</Text>
              </View>
              <Text style={styles.outlineHeart}>♡</Text>
            </View>
          </View>
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF5F2' },
  page: { flex: 1, backgroundColor: '#FBF5F2' },
  scrollContent: { alignItems: 'center', paddingBottom: 20 },
  content: { width: '100%', maxWidth: 640, paddingHorizontal: 20 },
  greeting: { paddingTop: 24, paddingBottom: 20 },
  title: { color: '#302B41', fontSize: 26, lineHeight: 34, fontWeight: '800' },
  compactTitle: { fontSize: 23 },
  titleHeart: { color: '#684D69' },
  subtitle: { color: '#403A4C', fontSize: 16, marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  cardWrapper: { width: '48.2%' },
  actionCard: { width: '100%', aspectRatio: 1.02, minHeight: 154, backgroundColor: '#FFFCFA', borderRadius: 20, borderWidth: 1, borderColor: '#E9DFDB', alignItems: 'center', justifyContent: 'center', padding: 12, shadowColor: '#BCA7A0', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  artwork: { height: 86, alignItems: 'center', justifyContent: 'center' },
  bubble: { width: 72, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' },
  bubbleDots: { color: '#FFFFFF', fontSize: 23, letterSpacing: 4, marginLeft: 4, marginTop: -8 },
  largeIcon: { fontSize: 66, lineHeight: 66 },
  hand: { fontSize: 62, lineHeight: 30, transform: [{ rotate: '-8deg' }], marginTop: -8 },
  calendar: { width: 62, height: 66, borderWidth: 6, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  calendarIcon: { fontSize: 35, fontWeight: '700' },
  people: { width: 94, height: 74, alignItems: 'center', justifyContent: 'center' },
  peopleBack: { fontSize: 27, letterSpacing: 14, marginLeft: 13 },
  peopleFront: { fontSize: 44, marginTop: -27 },
  actionTitle: { color: '#292639', fontSize: 16, lineHeight: 21, fontWeight: '700', textAlign: 'center', marginTop: 4 },
  compactActionTitle: { fontSize: 14 },
  encouragement: { minHeight: 172, backgroundColor: '#FFFCFA', borderRadius: 20, borderWidth: 1, borderColor: '#E9DFDB', marginTop: 20, padding: 24, flexDirection: 'row', alignItems: 'flex-end' },
  encouragementCopy: { flex: 1, alignSelf: 'flex-start' },
  encouragementTitle: { color: '#303047', fontSize: 19, fontWeight: '800', marginBottom: 14 },
  encouragementText: { color: '#474154', fontSize: 15, lineHeight: 22, maxWidth: 260 },
  outlineHeart: { color: '#AA667D', fontSize: 48, lineHeight: 50, marginLeft: 12 },
});
