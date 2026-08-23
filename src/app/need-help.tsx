import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/bottom-nav';
import {
  EMOTIONAL_SUPPORT,
  helpRequestStore,
  PRACTICAL_HELP,
  URGENCY_OPTIONS,
  WHO_CAN_HELP_OPTIONS,
  type HelpRequest,
} from '@/constants/help-requests';

export default function NeedHelpScreen() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [details, setDetails] = useState('');
  const [urgency, setUrgency] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [whoCanHelp, setWhoCanHelp] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(true);
  const [shareName, setShareName] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const toggleWho = (id: string) =>
    setWhoCanHelp((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const callForHelp = () => {
    Linking.openURL('tel:988').catch(() => {});
  };

  const resetForm = () => {
    setCategoryId(null);
    setDetails('');
    setUrgency(null);
    setLocation('');
    setWhoCanHelp([]);
    setAnonymous(true);
    setShareName(false);
  };

  const submitRequest = () => {
    if (!categoryId) {
      setError('Choose what kind of help you need.');
      setSuccess(false);
      return;
    }
    const cleanDetails = details.trim();
    if (cleanDetails.length < 10) {
      setError('Tell us a bit more about what would help.');
      setSuccess(false);
      return;
    }
    if (!urgency) {
      setError('Let us know when you need help by.');
      setSuccess(false);
      return;
    }

    const newRequest: HelpRequest = {
      id: Date.now(),
      categoryId,
      details: cleanDetails,
      urgency,
      location: location.trim(),
      whoCanHelp,
      anonymous,
      shareName,
      author: anonymous ? 'Anonymous' : 'You',
      postedAt: 'Just now',
    };

    helpRequestStore.unshift(newRequest);
    resetForm();
    setError('');
    setSuccess(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.page}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <View style={styles.introCard}>
              <View style={styles.introIcon}>
                <Text style={styles.introIconGlyph}>♥</Text>
              </View>
              <View style={styles.introCopy}>
                <Text style={styles.introTitle}>You don&apos;t have to do it all alone.</Text>
                <Text style={styles.introText}>Tell us what you need, and let&apos;s see how your community can help.</Text>
              </View>
            </View>

            <View style={styles.helpBanner}>
              <Text style={styles.helpBannerText}>In crisis right now? Call or text 988, 24/7.</Text>
              <Pressable onPress={callForHelp} style={({ pressed }) => [styles.helpButton, pressed && styles.pressed]}>
                <Text style={styles.helpButtonText}>Call 988</Text>
              </Pressable>
            </View>

            {success && (
              <View style={styles.successBanner} accessibilityRole="alert">
                <Text style={styles.successIcon}>✓</Text>
                <View style={styles.bannerCopy}>
                  <Text style={styles.successTitle}>Request sent</Text>
                  <Text style={styles.successText}>We&apos;ll notify you if someone nearby is able to help.</Text>
                </View>
              </View>
            )}

            <View style={styles.formCard}>
              <Text style={styles.sectionLabel}>1. What kind of help do you need?</Text>

              <View style={[styles.groupPill, styles.groupPillPractical]}>
                <Text style={styles.groupPillText}>PRACTICAL HELP</Text>
              </View>
              <View style={styles.categoryGrid}>
                {PRACTICAL_HELP.map((category) => {
                  const selected = category.id === categoryId;
                  return (
                    <Pressable
                      key={category.id}
                      onPress={() => { setCategoryId(category.id); setSuccess(false); setError(''); }}
                      style={[styles.categoryChip, selected && styles.categoryChipSelectedPractical]}>
                      <Text style={[styles.categoryGlyph, styles.practicalGlyph]}>{category.glyph}</Text>
                      <View style={styles.categoryCopy}>
                        <Text style={styles.categoryLabel}>{category.label}</Text>
                        {!!category.sublabel && <Text style={styles.categorySublabel}>{category.sublabel}</Text>}
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              <View style={[styles.groupPill, styles.groupPillEmotional]}>
                <Text style={[styles.groupPillText, styles.groupPillTextEmotional]}>EMOTIONAL SUPPORT</Text>
              </View>
              <View style={styles.categoryGrid}>
                {EMOTIONAL_SUPPORT.map((category) => {
                  const selected = category.id === categoryId;
                  return (
                    <Pressable
                      key={category.id}
                      onPress={() => { setCategoryId(category.id); setSuccess(false); setError(''); }}
                      style={[styles.categoryChip, selected && styles.categoryChipSelectedEmotional]}>
                      <Text style={[styles.categoryGlyph, styles.emotionalGlyph]}>{category.glyph}</Text>
                      <View style={styles.categoryCopy}>
                        <Text style={styles.categoryLabel}>{category.label}</Text>
                        {!!category.sublabel && <Text style={styles.categorySublabel}>{category.sublabel}</Text>}
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>2. Tell us more</Text>
              <TextInput
                value={details}
                onChangeText={(value) => { setDetails(value); setSuccess(false); setError(''); }}
                placeholder="What do you need? Tell us what's going on and what kind of help would make your day easier."
                placeholderTextColor="#9C9096"
                style={[styles.input, styles.detailsInput]}
                multiline
                maxLength={600}
                textAlignVertical="top"
              />

              <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>3. When do you need help?</Text>
              <View style={styles.pillWrap}>
                {URGENCY_OPTIONS.map((option) => {
                  const selected = option.id === urgency;
                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => setUrgency(option.id)}
                      style={[styles.urgencyChip, selected && styles.urgencyChipSelected]}>
                      <Text style={[styles.urgencyGlyph, selected && styles.pillTextSelected]}>{option.glyph}</Text>
                      <Text style={[styles.urgencyLabel, selected && styles.pillTextSelected]}>{option.label}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>4. Where are you located?</Text>
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="City or ZIP code"
                placeholderTextColor="#9C9096"
                style={styles.input}
              />
              <Text style={styles.sectionHint}>Only used to connect you with nearby help.</Text>

              <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>5. Who can help?</Text>
              <View style={styles.pillWrap}>
                {WHO_CAN_HELP_OPTIONS.map((option) => {
                  const selected = whoCanHelp.includes(option.id);
                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => toggleWho(option.id)}
                      style={[styles.whoChip, selected && styles.pillChipSelected]}>
                      <Text style={[styles.pillGlyph, selected && styles.pillTextSelected]}>{option.glyph}</Text>
                      <View>
                        <Text style={[styles.pillLabel, selected && styles.pillTextSelected]}>{option.label}</Text>
                        <Text style={[styles.whoSublabel, selected && styles.pillTextSelected]}>{option.sublabel}</Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>6. Privacy</Text>
              <View style={styles.privacyRow}>
                <Text style={styles.privacyTitle}>Post anonymously</Text>
                <Switch
                  value={anonymous}
                  onValueChange={setAnonymous}
                  trackColor={{ false: '#DDD4D1', true: '#C89AA8' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <View style={styles.privacyRow}>
                <View style={styles.privacyCopy}>
                  <Text style={styles.privacyTitle}>Share my name</Text>
                  <Text style={styles.privacySubtext}>Show your name to helpers</Text>
                </View>
                <Switch
                  value={shareName}
                  onValueChange={setShareName}
                  trackColor={{ false: '#DDD4D1', true: '#C89AA8' }}
                  thumbColor="#FFFFFF"
                />
              </View>

              {!!error && <Text style={styles.error} accessibilityRole="alert">{error}</Text>}

              <Pressable onPress={submitRequest} style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}>
                <Text style={styles.submitText}>♥  Request Help</Text>
              </Pressable>
              <Text style={styles.privacyNote}>We&apos;ll notify you if someone nearby is able to help.</Text>
            </View>
          </View>
        </ScrollView>
        <BottomNav />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF5F2' },
  page: { flex: 1 },
  scrollContent: { alignItems: 'center', paddingBottom: 28 },
  content: { width: '100%', maxWidth: 640, paddingHorizontal: 20, paddingTop: 16 },

  introCard: { flexDirection: 'row', gap: 14, backgroundColor: '#FDEEF0', borderColor: '#F5D9DE', borderWidth: 1, borderRadius: 20, padding: 16, alignItems: 'center' },
  introIcon: { width: 46, height: 46, borderRadius: 16, backgroundColor: '#F6D3D9', alignItems: 'center', justifyContent: 'center' },
  introIconGlyph: { fontSize: 20, color: '#B4677C' },
  introCopy: { flex: 1 },
  introTitle: { color: '#302B41', fontSize: 15, fontWeight: '800', lineHeight: 20 },
  introText: { color: '#5A3E45', fontSize: 13, lineHeight: 19, marginTop: 3, fontWeight: '500' },

  helpBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FBECEC', borderColor: '#F3D3D3', borderWidth: 1, borderRadius: 14, padding: 12, marginTop: 14 },
  helpBannerText: { flex: 1, color: '#8C4A4A', fontSize: 12, lineHeight: 17, fontWeight: '600' },
  helpButton: { backgroundColor: '#B4677C', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  helpButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },

  successBanner: { flexDirection: 'row', gap: 12, backgroundColor: '#EAF3ED', borderColor: '#CFE3D5', borderWidth: 1, borderRadius: 16, padding: 15, marginTop: 14 },
  successIcon: { color: '#4E8060', fontSize: 22, fontWeight: '800' },
  bannerCopy: { flex: 1 },
  successTitle: { color: '#315E42', fontSize: 15, fontWeight: '800' },
  successText: { color: '#557060', fontSize: 13, lineHeight: 18, marginTop: 2 },

  formCard: { backgroundColor: '#FFFCFA', borderColor: '#E9DFDB', borderWidth: 1, borderRadius: 22, padding: 18, marginTop: 14 },
  sectionLabel: { color: '#393345', fontSize: 14, fontWeight: '800' },
  sectionLabelSpaced: { marginTop: 20 },
  sectionHint: { color: '#948990', fontSize: 11.5, marginTop: 6 },

  groupPill: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 11, paddingVertical: 5, marginTop: 12, marginBottom: 8 },
  groupPillPractical: { backgroundColor: '#F6DEE1' },
  groupPillEmotional: { backgroundColor: '#E8E5F5' },
  groupPillText: { color: '#9A4F68', fontSize: 11, fontWeight: '800', letterSpacing: 0.6 },
  groupPillTextEmotional: { color: '#6C63A0' },

  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: { width: '48%', flexDirection: 'row', alignItems: 'flex-start', gap: 8, borderColor: '#E4DAD6', borderWidth: 1, borderRadius: 14, paddingHorizontal: 11, paddingVertical: 10, backgroundColor: '#FFFFFF' },
  categoryChipSelectedPractical: { backgroundColor: '#FBECEF', borderColor: '#D98D98' },
  categoryChipSelectedEmotional: { backgroundColor: '#EFEEF8', borderColor: '#9A8FC4' },
  categoryGlyph: { fontSize: 14, fontWeight: '800', width: 16, textAlign: 'center', marginTop: 1 },
  practicalGlyph: { color: '#D98D98' },
  emotionalGlyph: { color: '#9A8FC4' },
  categoryCopy: { flex: 1 },
  categoryLabel: { color: '#4A4350', fontSize: 12.5, fontWeight: '700', lineHeight: 17 },
  categorySublabel: { color: '#8A8087', fontSize: 10.5, lineHeight: 14, marginTop: 2 },

  input: { minHeight: 52, backgroundColor: '#FFFFFF', borderColor: '#DDD2CF', borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, color: '#302B41', fontSize: 15, marginTop: 10 },
  detailsInput: { minHeight: 96, paddingTop: 13, paddingBottom: 13 },

  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  urgencyChip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderColor: '#DDD2CF', borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 9, backgroundColor: '#FFFFFF' },
  urgencyChipSelected: { backgroundColor: '#B4677C', borderColor: '#B4677C' },
  urgencyGlyph: { color: '#B4677C', fontSize: 11, fontWeight: '800' },
  urgencyLabel: { color: '#625963', fontSize: 12.5, fontWeight: '700' },

  whoChip: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: 10, borderColor: '#DDD2CF', borderWidth: 1, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#FFFFFF' },
  pillChipSelected: { backgroundColor: '#8A88B8', borderColor: '#8A88B8' },
  pillGlyph: { color: '#8A88B8', fontSize: 13, fontWeight: '800' },
  pillLabel: { color: '#625963', fontSize: 13, fontWeight: '700' },
  whoSublabel: { color: '#948990', fontSize: 11, marginTop: 1 },
  pillTextSelected: { color: '#FFFFFF' },

  privacyRow: { flexDirection: 'row', alignItems: 'center', gap: 14, borderTopColor: '#EEE5E2', borderTopWidth: 1, paddingTop: 14, marginTop: 12 },
  privacyCopy: { flex: 1 },
  privacyTitle: { color: '#393345', fontSize: 13.5, fontWeight: '700' },
  privacySubtext: { color: '#948990', fontSize: 11, marginTop: 1 },

  error: { color: '#A24255', backgroundColor: '#FBECEF', borderRadius: 10, padding: 10, fontSize: 13, marginTop: 16 },
  submitButton: { minHeight: 54, backgroundColor: '#C9556B', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
  submitText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  privacyNote: { color: '#91858B', fontSize: 11, lineHeight: 16, textAlign: 'center', marginTop: 12 },
});
