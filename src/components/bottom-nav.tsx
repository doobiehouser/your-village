import { Link, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FlowerIcon, HeartIcon, HouseIcon, PeopleOutlineIcon, PlusIcon } from '@/components/bottom-nav-icons';

const NAV_BG = '#FFFDFC';
const LABEL_COLOR = '#948C96';
const ACTIVE_LABEL_COLOR = '#4F4785';
const SUBTITLE_COLOR = '#948C96';

const items = [
  { href: '/', label: 'Home', subtitle: 'Your daily hub', kind: 'house' },
  { href: '/community', label: 'Community', subtitle: 'Connect & belong', kind: 'people' },
  { href: '/ask-question', label: 'Ask / Create', subtitle: 'Ask a question or get help', kind: 'plus' },
  { href: '/need-help', label: 'Help', subtitle: 'I need help', kind: 'heart-help' },
  { href: '/journey', label: 'My Journey', subtitle: 'Track your journey', kind: 'flower' },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  return (
    <View style={styles.shell}>
      <View style={styles.nav}>
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} asChild>
              <Pressable accessibilityLabel={item.label} style={styles.item}>
                <View style={[styles.iconSlot, active && styles.iconSlotActive]}>
                  {item.kind === 'house' && <HouseIcon size={26} color={active ? ACTIVE_LABEL_COLOR : undefined} />}
                  {item.kind === 'people' && <PeopleOutlineIcon size={26} color={active ? ACTIVE_LABEL_COLOR : undefined} />}
                  {item.kind === 'plus' && <PlusIcon size={30} color={active ? ACTIVE_LABEL_COLOR : undefined} />}
                  {item.kind === 'heart-help' && <HeartIcon size={24} color={active ? ACTIVE_LABEL_COLOR : undefined} />}
                  {item.kind === 'flower' && <FlowerIcon size={24} color={active ? ACTIVE_LABEL_COLOR : undefined} />}
                </View>
                <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
                <Text style={styles.subtitle} numberOfLines={2}>
                  {item.subtitle}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { backgroundColor: NAV_BG, borderTopWidth: 1, borderTopColor: '#E9DEDA' },
  nav: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    maxWidth: 640,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 8,
  },
  item: { flex: 1, alignItems: 'center', gap: 3, paddingHorizontal: 2 },
  iconSlot: { height: 30, alignItems: 'center', justifyContent: 'center', opacity: 0.72 },
  iconSlotActive: { opacity: 1 },
  label: { color: LABEL_COLOR, fontSize: 11, fontWeight: '800', textAlign: 'center' },
  labelActive: { color: ACTIVE_LABEL_COLOR },
  subtitle: { color: SUBTITLE_COLOR, fontSize: 8.5, lineHeight: 11, fontWeight: '600', textAlign: 'center' },
});
