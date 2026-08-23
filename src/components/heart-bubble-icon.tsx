import { StyleSheet, Text, View } from 'react-native';

export function HeartBubbleIcon({
  size = 52,
  bubbleColor = '#FBECEF',
  markColor = '#C97388',
}: {
  size?: number;
  bubbleColor?: string;
  markColor?: string;
}) {
  const height = Math.round(size * 0.7);
  const tailSize = Math.round(size * 0.27);

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <View
        style={[
          styles.tail,
          {
            backgroundColor: bubbleColor,
            width: tailSize,
            height: tailSize,
            left: size * 0.32,
            top: height - tailSize * 0.6,
          },
        ]}
      />
      <View style={[styles.bubble, { backgroundColor: bubbleColor, width: size, height, borderRadius: height / 2.2 }]}>
        <Text style={[styles.mark, { color: markColor, fontSize: size * 0.42 }]}>♥</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { justifyContent: 'flex-start' },
  bubble: { alignItems: 'center', justifyContent: 'center' },
  tail: { position: 'absolute', borderRadius: 3, transform: [{ rotate: '45deg' }] },
  mark: { fontWeight: '700' },
});
