import { StyleSheet, Text, View } from 'react-native';

export function QuestionIcon({ bubbleColor, markColor = '#FFFFFF' }: { bubbleColor: string; markColor?: string }) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.tail, { backgroundColor: bubbleColor }]} />
      <View style={[styles.bubble, { backgroundColor: bubbleColor }]}>
        <Text style={[styles.mark, { color: markColor }]}>?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 28, height: 24, justifyContent: 'flex-start' },
  bubble: { width: 28, height: 20, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  tail: { position: 'absolute', width: 9, height: 9, borderRadius: 2, left: 7, top: 14, transform: [{ rotate: '45deg' }] },
  mark: { fontSize: 13, fontWeight: '800', lineHeight: 15 },
});
