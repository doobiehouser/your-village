import { useState } from 'react';
import { Link } from 'expo-router';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/bottom-nav';
import { PeopleIcon } from '@/components/people-icon';
import {
  INITIAL_MOMENTS,
  JOURNEY_STAGES,
  MOMENT_TYPES,
  momentType,
  type JourneyMoment,
  type JourneyStageId,
  type MomentTypeId,
} from '@/constants/journey';

const emptyMomentForm = {
  open: false,
  editingId: null as number | null,
  typeId: 'moment' as MomentTypeId,
  date: '',
  title: '',
  note: '',
  formError: '',
};

export default function JourneyScreen() {
  const [stageId, setStageId] = useState<JourneyStageId>('pregnant');
  const [moments, setMoments] = useState<JourneyMoment[]>(INITIAL_MOMENTS);
  const [stagePickerOpen, setStagePickerOpen] = useState(false);
  const [momentModal, setMomentModal] = useState(emptyMomentForm);

  const currentStage = JOURNEY_STAGES.find((stage) => stage.id === stageId) ?? JOURNEY_STAGES[0];
  const visibleMoments = moments.slice(0, 5);

  const openAddMoment = () => setMomentModal({ ...emptyMomentForm, open: true });

  const openEditMoment = (moment: JourneyMoment) =>
    setMomentModal({
      open: true,
      editingId: moment.id,
      typeId: moment.typeId,
      date: moment.date,
      title: moment.title,
      note: moment.note ?? '',
      formError: '',
    });

  const closeMomentModal = () => setMomentModal(emptyMomentForm);

  const saveMoment = () => {
    const date = momentModal.date.trim();
    const title = momentModal.title.trim();

    if (!date) {
      setMomentModal((current) => ({ ...current, formError: 'Add a date for this moment.' }));
      return;
    }
    if (title.length < 3) {
      setMomentModal((current) => ({ ...current, formError: 'Give this moment a short title.' }));
      return;
    }

    const note = momentModal.note.trim() || undefined;

    if (momentModal.editingId) {
      setMoments((current) =>
        current.map((moment) =>
          moment.id === momentModal.editingId
            ? { ...moment, date, title, note, typeId: momentModal.typeId }
            : moment
        )
      );
    } else {
      setMoments((current) => [...current, { id: Date.now(), date, title, note, typeId: momentModal.typeId }]);
    }
    closeMomentModal();
  };

  const confirmDelete = (id: number) => {
    Alert.alert('Delete this moment?', "This can't be undone.", [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setMoments((current) => current.filter((moment) => moment.id !== id)),
      },
    ]);
  };

  const onMomentMenu = (moment: JourneyMoment) => {
    Alert.alert(moment.title, undefined, [
      { text: 'Edit', onPress: () => openEditMoment(moment) },
      { text: 'Delete', style: 'destructive', onPress: () => confirmDelete(moment.id) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.introCard}>
              <View style={styles.introIcon}>
                <Text style={styles.introIconGlyph}>♥</Text>
              </View>
              <Text style={styles.introText}>
                This is your timeline, your memories, and your story. We&apos;re so glad you&apos;re here.{' '}
                <Text style={styles.introHeart}>♥</Text>
              </Text>
            </View>

            <Pressable
              onPress={() => setStagePickerOpen(true)}
              style={({ pressed }) => [styles.stageRow, pressed && styles.pressed]}>
              <View style={[styles.stageDot, { backgroundColor: currentStage.color }]}>
                <Text style={styles.stageDotGlyph}>{currentStage.glyph}</Text>
              </View>
              <View style={styles.stageCopy}>
                <Text style={styles.stageLabel}>You&apos;re currently in: {currentStage.label}</Text>
                <Text style={styles.stageChange}>Change stage</Text>
              </View>
            </Pressable>

            <Text style={styles.privacyNote}>🔒 Your journey is private by default — only you can see it.</Text>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Timeline</Text>
              <Pressable onPress={openAddMoment} style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
                <Text style={styles.addButtonText}>+ Add Moment</Text>
              </Pressable>
            </View>

            <View>
              {visibleMoments.map((moment, index) => {
                const type = momentType(moment.typeId);
                const isLast = index === visibleMoments.length - 1;
                return (
                  <View key={moment.id} style={styles.timelineRow}>
                    <View style={styles.railColumn}>
                      <View style={[styles.dot, { backgroundColor: type.color }]} />
                      {!isLast && <View style={styles.rail} />}
                    </View>
                    <View style={styles.momentCard}>
                      <View style={[styles.momentBadge, { backgroundColor: `${type.color}26` }]}>
                        <Text style={[styles.momentBadgeGlyph, { color: type.color }]}>{type.glyph}</Text>
                      </View>
                      <View style={styles.momentCopy}>
                        <Text style={[styles.momentDate, { color: type.color }]}>{moment.date}</Text>
                        <Text style={styles.momentTitle}>{moment.title}</Text>
                        {!!moment.note && <Text style={styles.momentNote}>{moment.note}</Text>}
                      </View>
                      <Pressable onPress={() => onMomentMenu(moment)} hitSlop={8} style={styles.menuButton}>
                        <Text style={styles.menuDots}>•••</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>

            <Link href="/journey-timeline" asChild>
              <Pressable style={({ pressed }) => [styles.viewAll, pressed && styles.pressed]}>
                <Text style={styles.viewAllText}>View All Moments →</Text>
              </Pressable>
            </Link>

            <View style={styles.quickSection}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickGrid}>
                <Link href="/ask-question" asChild>
                  <Pressable style={({ pressed }) => [styles.quickCard, pressed && styles.pressed]}>
                    <View style={[styles.quickIcon, { backgroundColor: '#EFEEF8' }]}>
                      <Text style={[styles.quickGlyph, { color: '#8A88B8' }]}>?</Text>
                    </View>
                    <Text style={styles.quickLabel}>Ask a Question</Text>
                  </Pressable>
                </Link>
                <Link href="/need-help" asChild>
                  <Pressable style={({ pressed }) => [styles.quickCard, pressed && styles.pressed]}>
                    <View style={[styles.quickIcon, { backgroundColor: '#FBECEF' }]}>
                      <Text style={[styles.quickGlyph, { color: '#D98D98' }]}>♥</Text>
                    </View>
                    <Text style={styles.quickLabel}>I Need Help</Text>
                  </Pressable>
                </Link>
                <Link href="/community" asChild>
                  <Pressable style={({ pressed }) => [styles.quickCard, pressed && styles.pressed]}>
                    <View style={[styles.quickIcon, { backgroundColor: '#EEE9F5' }]}>
                      <PeopleIcon color="#9A8FC4" />
                    </View>
                    <Text style={styles.quickLabel}>My Community</Text>
                  </Pressable>
                </Link>
                <Link href="/professionals" asChild>
                  <Pressable style={({ pressed }) => [styles.quickCard, pressed && styles.pressed]}>
                    <View style={[styles.quickIcon, { backgroundColor: '#EAF1EC' }]}>
                      <Text style={[styles.quickGlyph, { color: '#7FA48B' }]}>⬢</Text>
                    </View>
                    <Text style={styles.quickLabel}>My Professionals</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
        <BottomNav />
      </View>

      <Modal visible={stagePickerOpen} transparent animationType="slide" onRequestClose={() => setStagePickerOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setStagePickerOpen(false)} />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Where are you in your journey?</Text>
          <Text style={styles.sheetSubtitle}>Choose your current stage. You can change this anytime.</Text>
          <ScrollView style={styles.sheetScroll}>
            {JOURNEY_STAGES.map((stage) => {
              const selected = stage.id === stageId;
              return (
                <Pressable
                  key={stage.id}
                  onPress={() => {
                    setStageId(stage.id);
                    setStagePickerOpen(false);
                  }}
                  style={[styles.stageOption, selected && styles.stageOptionSelected]}>
                  <View style={[styles.stageOptionDot, { backgroundColor: stage.color }]}>
                    <Text style={styles.stageOptionGlyph}>{stage.glyph}</Text>
                  </View>
                  <Text style={styles.stageOptionLabel}>{stage.label}</Text>
                  {selected && <Text style={styles.stageOptionCheck}>✓</Text>}
                </Pressable>
              );
            })}
          </ScrollView>
          <Pressable onPress={() => setStagePickerOpen(false)} style={({ pressed }) => [styles.sheetClose, pressed && styles.pressed]}>
            <Text style={styles.sheetCloseText}>Close</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal visible={momentModal.open} transparent animationType="slide" onRequestClose={closeMomentModal}>
        <Pressable style={styles.overlay} onPress={closeMomentModal} />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.sheet}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.sheetTitle}>{momentModal.editingId ? 'Edit Moment' : 'Add a Moment'}</Text>
            <Text style={styles.sheetSubtitle}>Capture the little (and big) things that mean the most.</Text>

            <Text style={styles.fieldLabel}>Type</Text>
            <View style={styles.typeRow}>
              {MOMENT_TYPES.map((type) => {
                const selected = type.id === momentModal.typeId;
                return (
                  <Pressable
                    key={type.id}
                    onPress={() => setMomentModal((current) => ({ ...current, typeId: type.id }))}
                    style={[styles.typeChip, selected && { backgroundColor: type.color, borderColor: type.color }]}>
                    <Text style={[styles.typeChipGlyph, { color: selected ? '#FFFFFF' : type.color }]}>{type.glyph}</Text>
                    <Text style={[styles.typeChipLabel, selected && styles.typeChipLabelSelected]}>{type.label}</Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.fieldLabel}>Date</Text>
            <TextInput
              value={momentModal.date}
              onChangeText={(value) => setMomentModal((current) => ({ ...current, date: value, formError: '' }))}
              placeholder="e.g. October 12, 2026"
              placeholderTextColor="#9C9096"
              style={styles.input}
            />

            <Text style={styles.fieldLabel}>What happened?</Text>
            <TextInput
              value={momentModal.title}
              onChangeText={(value) => setMomentModal((current) => ({ ...current, title: value, formError: '' }))}
              placeholder="Give this moment a title"
              placeholderTextColor="#9C9096"
              style={styles.input}
              maxLength={100}
            />

            <Text style={styles.fieldLabel}>Add a note (optional)</Text>
            <TextInput
              value={momentModal.note}
              onChangeText={(value) => setMomentModal((current) => ({ ...current, note: value }))}
              placeholder="Anything you want to remember..."
              placeholderTextColor="#9C9096"
              style={[styles.input, styles.noteInput]}
              multiline
              textAlignVertical="top"
            />

            {!!momentModal.formError && <Text style={styles.error}>{momentModal.formError}</Text>}

            <Pressable onPress={saveMoment} style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}>
              <Text style={styles.saveButtonText}>{momentModal.editingId ? 'Save Changes' : 'Add to Timeline'}</Text>
            </Pressable>
            <Pressable onPress={closeMomentModal} style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
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
  introText: { flex: 1, color: '#5A3E45', fontSize: 14, lineHeight: 20, fontWeight: '600' },
  introHeart: { color: '#B4677C' },

  stageRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 14, backgroundColor: '#FFFCFA', borderColor: '#E9DFDB', borderWidth: 1, borderRadius: 16, padding: 12 },
  stageDot: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  stageDotGlyph: { color: '#FFFFFF', fontSize: 16 },
  stageCopy: { flex: 1 },
  stageLabel: { color: '#302B41', fontSize: 14, fontWeight: '700' },
  stageChange: { color: '#9A6E7D', fontSize: 12, fontWeight: '700', marginTop: 2 },

  privacyNote: { color: '#8A7E84', fontSize: 12, marginTop: 10, marginBottom: 4 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, marginBottom: 12 },
  sectionTitle: { color: '#302B41', fontSize: 19, fontWeight: '800' },
  addButton: { backgroundColor: '#F6E4E8', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  addButtonText: { color: '#9A4F68', fontSize: 13, fontWeight: '800' },

  timelineRow: { flexDirection: 'row' },
  railColumn: { width: 26, alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6, marginTop: 8 },
  rail: { flex: 1, width: 2, backgroundColor: '#E9DFDB', marginVertical: 4, minHeight: 20 },
  momentCard: { flex: 1, flexDirection: 'row', gap: 12, backgroundColor: '#FFFCFA', borderColor: '#E9DFDB', borderWidth: 1, borderRadius: 16, padding: 13, marginBottom: 14, alignItems: 'flex-start' },
  momentBadge: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  momentBadgeGlyph: { fontSize: 16, fontWeight: '700' },
  momentCopy: { flex: 1 },
  momentDate: { fontSize: 12, fontWeight: '800' },
  momentTitle: { color: '#302B41', fontSize: 15, fontWeight: '700', marginTop: 3, lineHeight: 20 },
  momentNote: { color: '#7B7177', fontSize: 13, lineHeight: 18, marginTop: 4 },
  menuButton: { paddingHorizontal: 4, paddingVertical: 2 },
  menuDots: { color: '#B3A6AC', fontSize: 16, letterSpacing: 1 },

  viewAll: { alignSelf: 'center', marginTop: 2, marginBottom: 6 },
  viewAllText: { color: '#9A4F68', fontSize: 14, fontWeight: '800' },

  quickSection: { marginTop: 20 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 12 },
  quickCard: { width: '47%', backgroundColor: '#FFFCFA', borderColor: '#E9DFDB', borderWidth: 1, borderRadius: 18, paddingVertical: 16, alignItems: 'center', gap: 8 },
  quickIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  quickGlyph: { fontSize: 20, fontWeight: '800' },
  quickLabel: { color: '#393345', fontSize: 13, fontWeight: '700', textAlign: 'center' },

  pressed: { opacity: 0.76, transform: [{ scale: 0.98 }] },

  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(41,30,34,0.35)' },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, maxHeight: '86%', backgroundColor: '#FFFCFA', borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 22, paddingBottom: 34 },
  sheetScroll: { maxHeight: 380 },
  sheetTitle: { color: '#302B41', fontSize: 20, fontWeight: '800' },
  sheetSubtitle: { color: '#665E68', fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 16 },
  sheetClose: { alignSelf: 'center', marginTop: 16 },
  sheetCloseText: { color: '#9A6E7D', fontSize: 14, fontWeight: '800' },

  stageOption: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 11, paddingHorizontal: 8, borderRadius: 14 },
  stageOptionSelected: { backgroundColor: '#F3EAEC' },
  stageOptionDot: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stageOptionGlyph: { color: '#FFFFFF', fontSize: 15 },
  stageOptionLabel: { flex: 1, color: '#302B41', fontSize: 14, fontWeight: '700' },
  stageOptionCheck: { color: '#9A6E7D', fontSize: 16, fontWeight: '800' },

  fieldLabel: { color: '#393345', fontSize: 13, fontWeight: '800', marginBottom: 8, marginTop: 14 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeChip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderColor: '#DDD2CF', borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF' },
  typeChipGlyph: { fontSize: 13, fontWeight: '800' },
  typeChipLabel: { color: '#625963', fontSize: 12, fontWeight: '700' },
  typeChipLabelSelected: { color: '#FFFFFF' },
  input: { minHeight: 48, backgroundColor: '#FFFFFF', borderColor: '#DDD2CF', borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, color: '#302B41', fontSize: 15 },
  noteInput: { minHeight: 90, paddingTop: 12, paddingBottom: 12 },
  error: { color: '#A24255', backgroundColor: '#FBECEF', borderRadius: 10, padding: 10, fontSize: 13, marginTop: 12 },
  saveButton: { minHeight: 52, backgroundColor: '#9A6E7D', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  saveButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  cancelButton: { minHeight: 44, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  cancelButtonText: { color: '#8A7E84', fontSize: 13, fontWeight: '700' },
});
