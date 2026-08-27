import { StyleSheet, Text, View } from 'react-native';

/**
 * Abstract, hand-built stand-in for a "mother holding baby" hero graphic — built from
 * View/Text primitives to match the app's existing icon system (no external images or
 * icon libraries), rather than a photorealistic illustration.
 */
export function WelcomeIllustration({ size = 132 }: { size?: number }) {
  const scale = size / 132;
  const center = (width: number) => size / 2 - width / 2;

  const motherHeadSize = 40 * scale;
  const motherBodyWidth = size * 0.62;
  const babyHeadSize = 22 * scale;
  const babyBodyWidth = size * 0.3;

  return (
    <View style={[styles.wrap, { width: size, height: size * 1.12 }]}>
      <View
        style={[
          styles.blobBack,
          { width: size * 0.78, height: size * 0.78, borderRadius: size * 0.39, top: 0, right: 0 },
        ]}
      />
      <View
        style={[
          styles.blobFront,
          { width: size, height: size, borderRadius: size / 2, top: size * 0.1, left: 0 },
        ]}
      />

      <Text style={[styles.floatHeart, { fontSize: 13 * scale, top: -2, left: 4 }]}>♡</Text>
      <Text style={[styles.floatHeart, { fontSize: 10 * scale, top: 6, right: 10 }]}>♡</Text>
      <Text style={[styles.floatFlower, { fontSize: 15 * scale, bottom: 2, left: -6 }]}>✿</Text>
      <Text style={[styles.floatFlower, { fontSize: 12 * scale, bottom: 18, right: -8 }]}>✿</Text>

      <View
        style={[
          styles.motherHead,
          { width: motherHeadSize, height: motherHeadSize, borderRadius: motherHeadSize / 2, top: size * 0.28, left: center(motherHeadSize) },
        ]}
      />
      <View
        style={[
          styles.motherBody,
          {
            width: motherBodyWidth,
            height: size * 0.5,
            borderTopLeftRadius: size * 0.31,
            borderTopRightRadius: size * 0.31,
            top: size * 0.52,
            left: center(motherBodyWidth),
          },
        ]}
      />
      <View
        style={[
          styles.babyHead,
          { width: babyHeadSize, height: babyHeadSize, borderRadius: babyHeadSize / 2, top: size * 0.58, left: center(babyHeadSize) },
        ]}
      />
      <View
        style={[
          styles.babyBody,
          {
            width: babyBodyWidth,
            height: size * 0.26,
            borderTopLeftRadius: size * 0.15,
            borderTopRightRadius: size * 0.15,
            top: size * 0.7,
            left: center(babyBodyWidth),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  blobBack: { position: 'absolute', backgroundColor: '#F6DCE0' },
  blobFront: { position: 'absolute', backgroundColor: '#FBEAE3' },
  floatHeart: { position: 'absolute', color: '#C97388' },
  floatFlower: { position: 'absolute', color: '#D99A6C' },
  motherHead: { position: 'absolute', backgroundColor: '#8C6B78' },
  motherBody: { position: 'absolute', backgroundColor: '#8C6B78' },
  babyHead: { position: 'absolute', backgroundColor: '#DCAAA0' },
  babyBody: { position: 'absolute', backgroundColor: '#DCAAA0' },
});
