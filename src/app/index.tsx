import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/bottom-nav';
import { PeopleIcon } from '@/components/people-icon';
import { WelcomeIllustration } from '@/components/welcome-illustration';
import { JOURNEY_STAGES } from '@/constants/journey';
import { sizeReferenceForWeek } from '@/constants/pregnancy';

const actions = [
  {
    href: '/ask-question',
    title: 'Ask a Question',
    sub: 'Get advice from real moms',
    shape: 'bubble',
    circleColor: '#E4E1F0',
    tint: '#7C7AA8',
  },
  {
    href: '/need-help',
    title: 'I Need Help',
    sub: 'Request or offer real-world help',
    shape: 'heart',
    circleColor: '#F5DEE1',
    tint: '#D2748A',
  },
  {
    href: '/community',
    title: 'Local Community',
    sub: 'Connect with moms near you',
    shape: 'people',
    circleColor: '#E4E1F0',
    tint: '#8A88B8',
  },
  {
    href: '/journey',
    title: 'My Journey',
    sub: 'Track, reflect & celebrate milestones',
    shape: 'flower',
    circleColor: '#F3E3D3',
    tint: '#C98F55',
  },
] as const;

const AVATAR_COLORS = ['#D9A9A0', '#8A88B8', '#D2748A', '#7FA48B'];

// Prototype-only: stands in for the signed-in mom's current stage/week until the app
// has real accounts and lets "My Journey" data drive this card directly.
const CURRENT_WEEK = 24;

function AvatarGlyph({ color, size = 34 }: { color: string; size?: number }) {
  return <View style={[styles.avatarGlyph, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]} />;
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const currentStage = JOURNEY_STAGES.find((stage) => stage.id === 'pregnant') ?? JOURNEY_STAGES[0];
  const sizeReference = sizeReferenceForWeek(CURRENT_WEEK);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.heroRow}>
              <View style={styles.heroText}>
                <Text style={[styles.title, compact && styles.compactTitle]}>
                  Welcome, Mama <Text style={styles.titleHeart}>♥</Text>
                </Text>
                <Text style={styles.tagline}>You don&apos;t have to do this alone.</Text>
                <Text style={styles.heroBody}>
                  Your Village is a safe, supportive community of moms here to help you ask, share, connect, and
                  get through every stage of motherhood.
                </Text>
              </View>
              <WelcomeIllustration size={compact ? 100 : 128} />
            </View>

            <Link href="/journey" asChild>
              <Pressable style={({ pressed }) => [styles.stageCard, pressed && styles.pressed]}>
                <View style={styles.stageLeft}>
                  <Text style={styles.stageEyebrow}>You&apos;re in</Text>
                  <Text style={styles.stageLabel}>{currentStage.label}</Text>
                  <View style={styles.stageWeekRow}>
                    <Text style={styles.stageWeekText}>{CURRENT_WEEK} weeks today</Text>
                    <View style={styles.stageChevronCircle}>
                      <Text style={styles.stageChevron}>›</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.stageDivider} />
                <View style={styles.stageRight}>
                  <View style={styles.fruitSmallCircle}>
                    <Text style={styles.fruitSmallGlyph}>{sizeReference.glyph}</Text>
                  </View>
                  <Text style={styles.stageRightText}>
                    Baby is the size of a <Text style={styles.stageRightTextBold}>{sizeReference.name}</Text>
                  </Text>
                </View>
                <View style={styles.fruitBigCircle}>
                  <Text style={styles.fruitBigGlyph}>{sizeReference.glyph}</Text>
                </View>
              </Pressable>
            </Link>

            <Text style={styles.sectionTitle}>Ways we support you today</Text>
            <View style={styles.supportRow}>
              {actions.map((action) => (
                <Link key={action.title} href={action.href} asChild>
                  <Pressable style={({ pressed }) => [styles.supportItem, pressed && styles.pressed]}>
                    <View style={[styles.supportCircle, { backgroundColor: action.circleColor }]}>
                      {action.shape === 'bubble' && (
                        <Text style={[styles.supportBubbleDots, { color: action.tint }]}>•••</Text>
                      )}
                      {action.shape === 'heart' && (
                        <>
                          <Text style={[styles.supportHeart, { color: action.tint }]}>♥</Text>
                          <Text style={[styles.supportHand, { color: action.tint }]}>⌣</Text>
                        </>
                      )}
                      {action.shape === 'people' && <PeopleIcon color={action.tint} />}
                      {action.shape === 'flower' && <Text style={[styles.supportFlower, { color: action.tint }]}>✿</Text>}
                    </View>
                    <Text style={[styles.supportLabel, compact && styles.compactActionTitle]}>{action.title}</Text>
                    <Text style={styles.supportSub}>{action.sub}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>

            <View style={styles.communityCard}>
              <View style={styles.communityText}>
                <Text style={styles.communityTitle}>
                  You&apos;re not alone. <Text style={styles.communityHeart}>♡</Text>
                </Text>
                <Text style={styles.communityBody}>
                  Thousands of moms are here for you. Share, connect, and support one another — together we grow.
                </Text>
              </View>
              <View style={styles.communityStat}>
                <View style={styles.avatarRow}>
                  {AVATAR_COLORS.map((color, index) => (
                    <View
                      key={color}
                      style={[styles.avatarWrap, index > 0 && { marginLeft: -12, zIndex: AVATAR_COLORS.length - index }]}
                    >
                      <AvatarGlyph color={color} />
                    </View>
                  ))}
                </View>
                <Text style={styles.statNumber}>2,400+</Text>
                <Text style={styles.statCaption}>moms in our village</Text>
              </View>
            </View>

            <View style={styles.encouragement}>
              <View style={styles.quoteBadge}>
                <Text style={styles.quoteMark}>&#8221;</Text>
              </View>
              <View style={styles.encouragementCopy}>
                <Text style={styles.encouragementTitle}>Daily Encouragement</Text>
                <Text style={styles.encouragementText}>You are doing an amazing job. Your baby is lucky to have you.</Text>
              </View>
              <Text style={styles.encouragementFlower}>✿</Text>
            </View>

            <View style={styles.footerTagline}>
              <Text style={styles.footerHeart}>♡</Text>
              <Text style={styles.footerText}>Progress, not perfection.</Text>
              <Text style={styles.footerHeart}>♡</Text>
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

  heroRow: { flexDirection: 'row', alignItems: 'flex-start', paddingTop: 24, gap: 14 },
  heroText: { flex: 1 },
  title: { color: '#302B41', fontSize: 27, lineHeight: 34, fontWeight: '800' },
  compactTitle: { fontSize: 23 },
  titleHeart: { color: '#684D69' },
  tagline: { color: '#403A4C', fontSize: 16, fontWeight: '600', marginTop: 4 },
  heroBody: { color: '#5B5261', fontSize: 14, lineHeight: 20, marginTop: 10 },

  stageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFCFA',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9DFDB',
    marginTop: 22,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: '#BCA7A0',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
  stageLeft: { flex: 1.1 },
  stageEyebrow: { color: '#6B6072', fontSize: 13, fontWeight: '600' },
  stageLabel: { color: '#2E2A38', fontSize: 20, fontWeight: '800', marginTop: 1 },
  stageWeekRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 6 },
  stageWeekText: { color: '#C97388', fontSize: 13, fontWeight: '700' },
  stageChevronCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#D8A7B2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageChevron: { color: '#C97388', fontSize: 12, fontWeight: '800', marginLeft: 1 },
  stageDivider: { width: 1, alignSelf: 'stretch', backgroundColor: '#EDE2DE', marginHorizontal: 14 },
  stageRight: { flex: 1, alignItems: 'flex-start', paddingRight: 30 },
  fruitSmallCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FBEAE3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  fruitSmallGlyph: { fontSize: 15 },
  stageRightText: { color: '#4A4350', fontSize: 12.5, lineHeight: 17 },
  stageRightTextBold: { fontWeight: '800', color: '#2E2A38' },
  fruitBigCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EFE3DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fruitBigGlyph: { fontSize: 24 },

  sectionTitle: { color: '#2E2A38', fontSize: 18, fontWeight: '800', marginTop: 26, marginBottom: 14 },
  supportRow: { flexDirection: 'row', justifyContent: 'space-between' },
  supportItem: { flex: 1, alignItems: 'center', paddingHorizontal: 3 },
  supportCircle: { width: 62, height: 62, borderRadius: 31, alignItems: 'center', justifyContent: 'center' },
  supportBubbleDots: { fontSize: 18, fontWeight: '800', letterSpacing: 1, marginTop: -2 },
  supportHeart: { position: 'absolute', fontSize: 24, top: 12 },
  supportHand: { fontSize: 30, transform: [{ rotate: '-8deg' }], marginTop: 14 },
  supportFlower: { fontSize: 28 },
  supportLabel: { color: '#292639', fontSize: 12.5, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  compactActionTitle: { fontSize: 11.5 },
  supportSub: { color: '#7A6E76', fontSize: 10.5, lineHeight: 13, textAlign: 'center', marginTop: 3 },

  communityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAF5',
    borderRadius: 20,
    marginTop: 22,
    padding: 20,
    gap: 14,
  },
  communityText: { flex: 1.3 },
  communityTitle: { color: '#2E2A38', fontSize: 18, fontWeight: '800' },
  communityHeart: { color: '#C97388' },
  communityBody: { color: '#544D5C', fontSize: 13, lineHeight: 18, marginTop: 8 },
  communityStat: { alignItems: 'center' },
  avatarRow: { flexDirection: 'row' },
  avatarWrap: { borderWidth: 2, borderColor: '#EFEAF5', borderRadius: 20 },
  avatarGlyph: {},
  statNumber: { color: '#4F4785', fontSize: 22, fontWeight: '800', marginTop: 10 },
  statCaption: { color: '#5B5261', fontSize: 11.5, marginTop: 2 },

  encouragement: {
    minHeight: 130,
    backgroundColor: '#FFFCFA',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9DFDB',
    marginTop: 20,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  quoteBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F5DEE1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  quoteMark: { color: '#C97388', fontSize: 20, fontWeight: '800', marginTop: -4 },
  encouragementCopy: { flex: 1 },
  encouragementTitle: { color: '#303047', fontSize: 17, fontWeight: '800', marginBottom: 8 },
  encouragementText: { color: '#474154', fontSize: 14.5, lineHeight: 20 },
  encouragementFlower: { color: '#D99A6C', fontSize: 30, marginLeft: 10, marginTop: 2 },

  footerTagline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 22 },
  footerHeart: { color: '#D8A7B2', fontSize: 15 },
  footerText: { color: '#493B43', fontSize: 15, fontWeight: '700', fontStyle: 'italic' },
});
