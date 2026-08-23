import { StyleSheet, View } from 'react-native';

export function PeopleIcon({ color }: { color: string }) {
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

const styles = StyleSheet.create({
  people: { width: 28, height: 24, alignItems: 'center', justifyContent: 'center' },
  personHeadSide: { position: 'absolute', width: 8, height: 8, borderRadius: 4, top: 2 },
  personBodySide: { position: 'absolute', width: 12, height: 7, borderTopLeftRadius: 6, borderTopRightRadius: 6, top: 10 },
  personLeft: { left: 0 },
  personRight: { right: 0 },
  personHeadFront: { position: 'absolute', width: 11, height: 11, borderRadius: 5.5, top: 0, left: 8.5 },
  personBodyFront: { position: 'absolute', width: 17, height: 10, borderTopLeftRadius: 8.5, borderTopRightRadius: 8.5, top: 10, left: 5.5 },
});
