import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

type IconProps = {
  color: string;
  size?: number;
};

// Full-color icon art (sourced from unblast.com, personal & commercial use).
const sproutArt = require('@/assets/images/journey/sprout.png');
const heartArt = require('@/assets/images/journey/heart.png');
const stethoscopeArt = require('@/assets/images/journey/stethoscope.png');

/** A seedling growing out of a small mound of soil — used for "Trying to Conceive" moments. */
export function SproutIcon({ size = 18 }: IconProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image source={sproutArt} contentFit="contain" style={{ width: size, height: size * (240 / 221) }} />
    </View>
  );
}

/** Two overlapping hearts — used for "Big Moment" entries. */
export function HeartIcon({ size = 18 }: IconProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image source={heartArt} contentFit="contain" style={{ width: size, height: size * (175 / 240) }} />
    </View>
  );
}

/** A stethoscope — used for "Appointment" moments. */
export function StethoscopeIcon({ size = 18 }: IconProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image source={stethoscopeArt} contentFit="contain" style={{ width: size, height: size * (75 / 73) }} />
    </View>
  );
}

/** A four-point twinkle — used for positive test results. */
export function SparkleIcon({ color, size = 18 }: IconProps) {
  const barThickness = size * 0.16;
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <View style={[styles.sparkleBar, { width: barThickness, height: size * 0.82, borderRadius: barThickness / 2, backgroundColor: color }]} />
      <View style={[styles.sparkleBar, { width: size * 0.82, height: barThickness, borderRadius: barThickness / 2, backgroundColor: color }]} />
      <View style={[styles.sparkleDot, { width: size * 0.22, height: size * 0.22, backgroundColor: color }]} />
    </View>
  );
}

/** A crescent moon (solid circle with an offset cutout) — used for pregnancy milestones. */
export function MoonIcon({ color, size = 18, cutoutColor = '#FFFCFA' }: IconProps & { cutoutColor?: string }) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <View style={[styles.moonFull, { width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4, backgroundColor: color }]} />
      <View
        style={[
          styles.moonCutout,
          {
            width: size * 0.66,
            height: size * 0.66,
            borderRadius: size * 0.33,
            backgroundColor: cutoutColor,
            top: size * 0.02,
            right: -size * 0.1,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },

  sparkleBar: { position: 'absolute' },
  sparkleDot: { position: 'absolute', top: 0, right: 0, borderRadius: 2, transform: [{ rotate: '45deg' }] },

  moonFull: { position: 'absolute' },
  moonCutout: { position: 'absolute' },
});
