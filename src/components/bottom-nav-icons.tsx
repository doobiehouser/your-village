import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

type IconProps = {
  size?: number;
  /** Tints the outline art (e.g. for the active nav state). Ignored by PlusIcon, which bakes in its own fill. */
  color?: string;
};

// Icon art supplied by the user, background-trimmed to transparent PNGs.
const houseArt = require('@/assets/images/nav/house.png');
const peopleArt = require('@/assets/images/nav/people.png');
const heartArt = require('@/assets/images/nav/heart.png');
const plusArt = require('@/assets/images/nav/plus.png');
const flowerArt = require('@/assets/images/nav/flower.png');

/** A house silhouette — used for "Home". */
export function HouseIcon({ size = 24, color }: IconProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image source={houseArt} contentFit="contain" tintColor={color} style={{ width: size, height: size * (252 / 260) }} />
    </View>
  );
}

/** Three overlapping outlined heads over a shared shoulder line — used for "Community". */
export function PeopleOutlineIcon({ size = 24, color }: IconProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image source={peopleArt} contentFit="contain" tintColor={color} style={{ width: size, height: size * (160 / 260) }} />
    </View>
  );
}

/** A simple heart outline — used for "Help". */
export function HeartIcon({ size = 24, color }: IconProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image source={heartArt} contentFit="contain" tintColor={color} style={{ width: size, height: size * (223 / 256) }} />
    </View>
  );
}

/** A circled plus — used for the "Ask / Create" action button. Self-contained (its own circle + fill); `color` is ignored. */
export function PlusIcon({ size = 26 }: IconProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image source={plusArt} contentFit="contain" style={{ width: size, height: size * (260 / 250) }} />
    </View>
  );
}

/** A six-petal flower — used for "My Journey". */
export function FlowerIcon({ size = 24, color }: IconProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image source={flowerArt} contentFit="contain" tintColor={color} style={{ width: size, height: size * (253 / 260) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
});
