import { Link, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const ICON_COLOR = '#8D6878';
const ACTIVE_COLOR = '#748BA9';

const items = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/community', label: 'Community', icon: 'people' },
  { href: '/need-help', label: 'Village', icon: '✿' },
  { href: '/ask-question', label: 'Messages', icon: '▣' },
  { href: '/profile', label: 'Profile', icon: '○' },
] as const;

function PeopleIcon({ color }: { color: string }) {
  return (
    <View style={styles.people}>
      <View style={[styles.personHeadSide, styles.personLeft, { backgroundColor: color }]} />
      <View style={[styles.personBodySide, styles.personLeft, { backgroundColor: color }]} />
      <View style={[styles.personHeadSide, styles.personRight, { backgroundColor: color }]} />
      <View style={[styles.personBodySide, styles.personRight, { backgroundColor: color }]} />
      <View style={[styles.personHeadFront, { backgroundColor: color }]} />
      <View style={[styles.personBodyFront, { backgroundColor: color }]} />
    </View>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  return (
    <View style={styles.shell}>
      <View style={styles.nav}>
        {items.map((item) => {
          const active = pathname === item.href;
          const color = active ? ACTIVE_COLOR : ICON_COLOR;
          return (
            <Link key={item.label} href={item.href} asChild>
              <Pressable accessibilityLabel={item.label} style={styles.item}>
                {item.icon === 'people' ? (
                  <PeopleIcon color={color} />
                ) : (
                  <Text style={[styles.icon, active && styles.active]}>{item.icon}</Text>
                )}
                <Text style={[styles.label, active && styles.active]}>{item.label}</Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { backgroundColor: '#FFFDFC', borderTopWidth: 1, borderTopColor: '#E9DEDA' },
  nav: { height: 76, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', maxWidth: 640, width: '100%', alignSelf: 'center', paddingHorizontal: 6 },
  item: { flex: 1, minHeight: 62, alignItems: 'center', justifyContent: 'center', gap: 3 },
  icon: { color: ICON_COLOR, fontSize: 25, lineHeight: 27 },
  label: { color: '#705966', fontSize: 10, fontWeight: '600' },
  active: { color: ACTIVE_COLOR, fontWeight: '800' },
  people: { width: 28, height: 24, alignItems: 'center', justifyContent: 'center' },
  personHeadSide: { position: 'absolute', width: 8, height: 8, borderRadius: 4, top: 2 },
  personBodySide: { position: 'absolute', width: 12, height: 7, borderTopLeftRadius: 6, borderTopRightRadius: 6, top: 10 },
  personLeft: { left: 0 },
  personRight: { right: 0 },
  personHeadFront: { position: 'absolute', width: 11, height: 11, borderRadius: 5.5, top: 0, left: 8.5 },
  personBodyFront: { position: 'absolute', width: 17, height: 10, borderTopLeftRadius: 8.5, borderTopRightRadius: 8.5, top: 10, left: 5.5 },
});
