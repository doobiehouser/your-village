import { useState } from 'react';
import { Link } from 'expo-router';
import {
  KeyboardAvoidingView,
  Linking,
  Modal,
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
import { HeartBubbleIcon } from '@/components/heart-bubble-icon';
import {
  HEAR_FROM_OPTIONS,
  LOOKING_FOR_OPTIONS,
  questionStore,
  TOPICS,
  type CommunityQuestion,
} from '@/constants/questions';

const TRIMESTER_OPTIONS = ['1st trimester', '2nd trimester', '3rd trimester', 'Not currently pregnant', 'Prefer not to say'];
const FIRST_BABY_OPTIONS = ['Yes, this is my first', 'No, I have others', 'Prefer not to say'];

type SelectKey = 'trimester' | 'firstBaby' | null;

export default function AskQuestionScreen() {
  const [topicId, setTopicId] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [trimester, setTrimester] = useState('');
  const [firstBaby, setFirstBaby] = useState('');
  const [startDate, setStartDate] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [hearFrom, setHearFrom] = useState<string[]>([]);
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectOpen, setSelectOpen] = useState<SelectKey>(null);

  const toggle = (list: string[], id: string, setter: (next: string[]) => void) =>
    setter(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);

  const callForHelp = () => {
    Linking.openURL('tel:988').catch(() => {});
  };

  const resetForm = () => {
    setTopicId(null);
    setQuestion('');
    setTrimester('');
    setFirstBaby('');
    setStartDate('');
    setOtherDetails('');
    setHearFrom([]);
    setLookingFor([]);
    setAnonymous(true);
    setAllowMessages(true);
  };

  const submitQuestion = () => {
    if (!topicId) {
      setError('Choose a topic so we can route your question well.');
      setSuccess(false);
      return;
    }
    const cleanQuestion = question.trim();
    if (cleanQuestion.length < 10) {
      setError('Tell us a little more about what is going on.');
      setSuccess(false);
      return;
    }

    const details = [
      trimester && `How far along: ${trimester}`,
      firstBaby && `First pregnancy/baby: ${firstBaby}`,
      startDate.trim() && `When it started: ${startDate.trim()}`,
      otherDetails.trim(),
    ]
      .filter(Boolean)
      .join(' · ');

    const newQuestion: CommunityQuestion = {
      id: Date.now(),
      question: details ? `${cleanQuestion}\n\n${details}` : cleanQuestion,
      topicId,
      hearFrom,
      lookingFor,
      anonymous,
      allowMessages,
      author: anonymous ? 'Anonymous' : 'You',
      postedAt: 'Just now',
      replies: [],
    };

    questionStore.unshift(newQuestion);
    resetForm();
    setError('');
    setSuccess(true);
  };

  const selectOptions = selectOpen === 'trimester' ? TRIMESTER_OPTIONS : selectOpen === 'firstBaby' ? FIRST_BABY_OPTIONS : [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.page}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <View style={styles.intro}>
              <HeartBubbleIcon />
              <Text style={styles.heading}>What&apos;s on your mind?</Text>
              <Text style={styles.introText}>Ask anything. Your community is here to listen, share experiences, and support you.</Text>
            </View>

            <View style={styles.helpBanner}>
              <Text style={styles.helpBannerText}>Need help right now? If this is a crisis, call or text 988, 24/7.</Text>
              <Pressable onPress={callForHelp} style={({ pressed }) => [styles.helpButton, pressed && styles.pressed]}>
                <Text style={styles.helpButtonText}>Call 988</Text>
              </Pressable>
            </View>

            {success && (
              <View style={styles.successBanner} accessibilityRole="alert">
                <Text style={styles.successIcon}>✓</Text>
                <View style={styles.bannerCopy}>
                  <Text style={styles.successTitle}>Question posted</Text>
                  <Text style={styles.successText}>
                    Head to{' '}
                    <Link href="/community" style={styles.successLink}>
                      Community
                    </Link>{' '}
                    to see it and get support.
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.formCard}>
              <Text style={styles.sectionLabel}>1. Choose a topic</Text>
              <View style={styles.topicGrid}>
                {TOPICS.map((topic) => {
                  const selected = topic.id === topicId;
                  const fullWidth = topic.id === 'something-else';
                  return (
                    <Pressable
                      key={topic.id}
                      onPress={() => setTopicId(topic.id)}
                      style={[
                        styles.topicChip,
                        fullWidth && styles.topicChipFull,
                        selected && { backgroundColor: `${topic.color}26`, borderColor: topic.color },
                      ]}>
                      <Text style={[styles.topicGlyph, { color: topic.color }]}>{topic.glyph}</Text>
                      <Text style={styles.topicLabel}>{topic.label}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>2. Your question</Text>
              <TextInput
                value={question}
                onChangeText={(value) => { setQuestion(value); setSuccess(false); setError(''); }}
                placeholder="Tell us what's going on..."
                placeholderTextColor="#9C9096"
                style={[styles.input, styles.questionInput]}
                multiline
                maxLength={600}
                textAlignVertical="top"
              />

              <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>3. Optional details</Text>
              <Text style={styles.sectionHint}>You choose what to share</Text>
              <View style={styles.detailGrid}>
                <Pressable onPress={() => setSelectOpen('trimester')} style={styles.selectField}>
                  <Text style={styles.selectLabel}>How far along are you?</Text>
                  <View style={styles.selectRow}>
                    <Text style={[styles.selectValue, !trimester && styles.selectPlaceholder]}>{trimester || 'Select'}</Text>
                    <Text style={styles.selectChevron}>⌄</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => setSelectOpen('firstBaby')} style={styles.selectField}>
                  <Text style={styles.selectLabel}>First pregnancy / baby?</Text>
                  <View style={styles.selectRow}>
                    <Text style={[styles.selectValue, !firstBaby && styles.selectPlaceholder]}>{firstBaby || 'Select'}</Text>
                    <Text style={styles.selectChevron}>⌄</Text>
                  </View>
                </Pressable>
                <View style={styles.selectField}>
                  <Text style={styles.selectLabel}>When did this start?</Text>
                  <TextInput
                    value={startDate}
                    onChangeText={setStartDate}
                    placeholder="Select date"
                    placeholderTextColor="#9C9096"
                    style={styles.detailInput}
                  />
                </View>
                <View style={styles.selectField}>
                  <Text style={styles.selectLabel}>Anything else important?</Text>
                  <TextInput
                    value={otherDetails}
                    onChangeText={setOtherDetails}
                    placeholder="Add details (optional)"
                    placeholderTextColor="#9C9096"
                    style={styles.detailInput}
                  />
                </View>
              </View>

              <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>4. Who would you like to hear from?</Text>
              <View style={styles.pillWrap}>
                {HEAR_FROM_OPTIONS.map((option) => {
                  const selected = hearFrom.includes(option.id);
                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => toggle(hearFrom, option.id, setHearFrom)}
                      style={[styles.pillChip, selected && styles.pillChipSelected]}>
                      <Text style={[styles.pillGlyph, selected && styles.pillTextSelected]}>{option.glyph}</Text>
                      <Text style={[styles.pillLabel, selected && styles.pillTextSelected]}>{option.label}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>5. I&apos;m looking for...</Text>
              <View style={styles.pillWrap}>
                {LOOKING_FOR_OPTIONS.map((option) => {
                  const selected = lookingFor.includes(option.id);
                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => toggle(lookingFor, option.id, setLookingFor)}
                      style={[styles.pillChip, selected && styles.pillChipSelected]}>
                      <Text style={[styles.pillGlyph, selected && styles.pillTextSelected]}>{option.glyph}</Text>
                      <Text style={[styles.pillLabel, selected && styles.pillTextSelected]}>{option.label}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>6. Privacy & Safety</Text>
              <View style={styles.privacyRow}>
                <View style={styles.privacyCopy}>
                  <Text style={styles.privacyTitle}>Post anonymously</Text>
                </View>
                <Switch
                  value={anonymous}
                  onValueChange={setAnonymous}
                  trackColor={{ false: '#DDD4D1', true: '#C89AA8' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <View style={styles.privacyRow}>
                <View style={styles.privacyCopy}>
                  <Text style={styles.privacyTitle}>Allow private messages from other members</Text>
                </View>
                <Switch
                  value={allowMessages}
                  onValueChange={setAllowMessages}
                  trackColor={{ false: '#DDD4D1', true: '#C89AA8' }}
                  thumbColor="#FFFFFF"
                />
              </View>

              {!!error && <Text style={styles.error} accessibilityRole="alert">{error}</Text>}

              <Pressable onPress={submitQuestion} style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}>
                <Text style={styles.submitText}>Post Question</Text>
              </Pressable>
              <Text style={styles.privacyNote}>
                If you&apos;re experiencing a medical emergency, call 911 or seek emergency medical care. This community is not a
                substitute for your healthcare provider.
              </Text>
            </View>
          </View>
        </ScrollView>
        <BottomNav />
      </KeyboardAvoidingView>

      <Modal visible={selectOpen !== null} transparent animationType="slide" onRequestClose={() => setSelectOpen(null)}>
        <Pressable style={styles.overlay} onPress={() => setSelectOpen(null)} />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>
            {selectOpen === 'trimester' ? 'How far along are you?' : 'First pregnancy / baby?'}
          </Text>
          {selectOptions.map((option) => (
            <Pressable
              key={option}
              onPress={() => {
                if (selectOpen === 'trimester') setTrimester(option);
                if (selectOpen === 'firstBaby') setFirstBaby(option);
                setSelectOpen(null);
              }}
              style={styles.sheetOption}>
              <Text style={styles.sheetOptionText}>{option}</Text>
            </Pressable>
          ))}
          <Pressable onPress={() => setSelectOpen(null)} style={({ pressed }) => [styles.sheetClose, pressed && styles.pressed]}>
            <Text style={styles.sheetCloseText}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF5F2' },
  page: { flex: 1 },
  scrollContent: { alignItems: 'center', paddingBottom: 28 },
  content: { width: '100%', maxWidth: 640, paddingHorizontal: 20 },

  intro: { alignItems: 'center', paddingTop: 20, paddingBottom: 18 },
  heading: { color: '#302B41', fontSize: 25, lineHeight: 31, fontWeight: '800', marginTop: 12, textAlign: 'center' },
  introText: { color: '#665E68', fontSize: 14, lineHeight: 20, marginTop: 8, maxWidth: 380, textAlign: 'center' },

  helpBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FBECEC', borderColor: '#F3D3D3', borderWidth: 1, borderRadius: 14, padding: 12, marginBottom: 14 },
  helpBannerText: { flex: 1, color: '#8C4A4A', fontSize: 12, lineHeight: 17, fontWeight: '600' },
  helpButton: { backgroundColor: '#B4677C', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  helpButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },

  successBanner: { flexDirection: 'row', gap: 12, backgroundColor: '#EAF3ED', borderColor: '#CFE3D5', borderWidth: 1, borderRadius: 16, padding: 15, marginBottom: 14 },
  successIcon: { color: '#4E8060', fontSize: 22, fontWeight: '800' },
  bannerCopy: { flex: 1 },
  successTitle: { color: '#315E42', fontSize: 15, fontWeight: '800' },
  successText: { color: '#557060', fontSize: 13, lineHeight: 18, marginTop: 2 },
  successLink: { color: '#315E42', fontWeight: '800', textDecorationLine: 'underline' },

  formCard: { backgroundColor: '#FFFCFA', borderColor: '#E9DFDB', borderWidth: 1, borderRadius: 22, padding: 18 },
  sectionLabel: { color: '#393345', fontSize: 14, fontWeight: '800' },
  sectionLabelSpaced: { marginTop: 20 },
  sectionHint: { color: '#948990', fontSize: 12, marginTop: 3, marginBottom: 10 },

  topicGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  topicChip: { width: '48%', flexDirection: 'row', alignItems: 'center', gap: 8, borderColor: '#E4DAD6', borderWidth: 1, borderRadius: 14, paddingHorizontal: 11, paddingVertical: 11, backgroundColor: '#FFFFFF' },
  topicChipFull: { width: '100%' },
  topicGlyph: { fontSize: 15, fontWeight: '800', width: 18, textAlign: 'center' },
  topicLabel: { flex: 1, color: '#4A4350', fontSize: 12.5, fontWeight: '700' },

  input: { minHeight: 52, backgroundColor: '#FFFFFF', borderColor: '#DDD2CF', borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, color: '#302B41', fontSize: 15 },
  questionInput: { minHeight: 100, paddingTop: 13, paddingBottom: 13, marginTop: 10 },

  detailGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  selectField: { width: '47%', gap: 6 },
  selectLabel: { color: '#665E68', fontSize: 11.5, fontWeight: '700' },
  selectRow: { minHeight: 46, backgroundColor: '#FFFFFF', borderColor: '#DDD2CF', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  selectValue: { color: '#302B41', fontSize: 13, fontWeight: '600', flex: 1 },
  selectPlaceholder: { color: '#9C9096', fontWeight: '400' },
  selectChevron: { color: '#B3A6AC', fontSize: 13 },
  detailInput: { minHeight: 46, backgroundColor: '#FFFFFF', borderColor: '#DDD2CF', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, color: '#302B41', fontSize: 13 },

  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  pillChip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderColor: '#DDD2CF', borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 9, backgroundColor: '#FFFFFF' },
  pillChipSelected: { backgroundColor: '#8A88B8', borderColor: '#8A88B8' },
  pillGlyph: { color: '#8A88B8', fontSize: 12, fontWeight: '800' },
  pillLabel: { color: '#625963', fontSize: 12.5, fontWeight: '700' },
  pillTextSelected: { color: '#FFFFFF' },

  privacyRow: { flexDirection: 'row', alignItems: 'center', gap: 14, borderTopColor: '#EEE5E2', borderTopWidth: 1, paddingTop: 14, marginTop: 12 },
  privacyCopy: { flex: 1 },
  privacyTitle: { color: '#393345', fontSize: 13.5, fontWeight: '700' },

  error: { color: '#A24255', backgroundColor: '#FBECEF', borderRadius: 10, padding: 10, fontSize: 13, marginTop: 16 },
  submitButton: { minHeight: 54, backgroundColor: '#7A5C8E', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
  submitText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  privacyNote: { color: '#91858B', fontSize: 11, lineHeight: 16, textAlign: 'center', marginTop: 12 },

  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(41,30,34,0.35)' },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, maxHeight: '70%', backgroundColor: '#FFFCFA', borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 22, paddingBottom: 34 },
  sheetTitle: { color: '#302B41', fontSize: 18, fontWeight: '800', marginBottom: 12 },
  sheetOption: { paddingVertical: 13, borderTopColor: '#EEE5E2', borderTopWidth: 1 },
  sheetOptionText: { color: '#393345', fontSize: 15, fontWeight: '600' },
  sheetClose: { alignSelf: 'center', marginTop: 14 },
  sheetCloseText: { color: '#9A6E7D', fontSize: 14, fontWeight: '800' },
});
