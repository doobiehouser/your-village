import { Image } from 'expo-image';
import { View } from 'react-native';

// Illustration supplied by the user for the home screen hero.
const welcomeArt = require('@/assets/images/home/welcome-illustration.png');

/** Mother-and-baby hero illustration shown next to the "Welcome, Mama" greeting. */
export function WelcomeIllustration({ size = 132 }: { size?: number }) {
  // Source art is 415x452 (~0.918 aspect ratio).
  const height = size * (452 / 415);

  return (
    <View style={{ width: size, height }}>
      <Image source={welcomeArt} contentFit="contain" style={{ width: size, height }} />
    </View>
  );
}
