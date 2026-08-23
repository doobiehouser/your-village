import { useState } from 'react';
import {
  KeyboardAvoidingView,
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
import { QuestionIcon } from '@/components/question-icon';
import { CATEGORIES, SEED_QUESTIONS, type Category, type CommunityQuestion } from '@/constants/questions';

export default function AskQuestionScreen() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState<Category>('Pregnancy');
  const [anonymous, setAnonymous] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [questions, setQuestions] = useState<CommunityQuestion[]>(SEED_QUESTIONS);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});

  const submitQuestion = () => {
    const cleanTitle = title.trim();
    const cleanDetails = details.trim();

    if (cleanTitle.length < 5) {
      setError('Please add a clear question title.');
      setSuccess(false);
      return;
    }
    if (cleanDetails.length < 15) {
      setError('Please share a little more detail so the community can help.');
      setSuccess(false);
      return;
    }

    setQuestions((current) => [
      {
        id: Date.now(),
        title: cleanTitle,
        details: cleanDetails,
        category,
        anonymous,
        author: anonymous ? 'Anonymous' : 'You',
        postedAt: 'Just now',
        replies: [],
      },
      ...current,
    ]);
    setTitle('');
    setDetails('');
    setCategory('Pregnancy');
    setAnonymous(false);
    setError('');
    setSuccess(true);
  };

  const toggleExpand = (id: number) => setExpandedId((current) => (current === id ? null : id));

  const submitReply = (id: number) => {
    const text = (replyDrafts[id] ?? '').trim();
    if (!text) return;
    setQuestions((current) =>
      current.map((question) =>
        question.id === id
          ? { ...question, replies: [...question.replies, { id: Date.now(), author: 'You', text }] }
          : question
      )
    );
    setReplyDrafts((current) => ({ ...current, [id]: '' }));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.page}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <View style={styles.intro}>
              <View style={styles.introBadge}>
                <QuestionIcon bubbleColor="#8A88B8" />
              </View>
              <View style={styles.introCopy}>
                <Text style={styles.eyebrow}>A SAFE PLACE TO ASK</Text>
                <Text style={styles.heading}>What is on your mind?</Text>
                <Text style={styles.introText}>Share as much as feels comfortable. Your village is here to listen.</Text>
              </View>
            </View>

            {success && (
              <View style={styles.successBanner} accessibilityRole="alert">
                <Text style={styles.successIcon}>✓</Text>
                <View style={styles.bannerCopy}>
                  <Text style={styles.successTitle}>Question shared</Text>
                  <Text style={styles.successText}>It&apos;s now visible below for the community to answer.</Text>
                </View>
              </View>
            )}

            <View style={styles.formCard}>
              <Text style={styles.label}>Question title</Text>
              <TextInput
                value={title}
                onChangeText={(value) => { setTitle(value); setSuccess(false); }}
                placeholder="What would you like to ask?"
                placeholderTextColor="#9C9096"
                style={styles.input}
                maxLength={100}
                returnKeyType="next"
              />
              <Text style={styles.characterCount}>{title.length}/100</Text>

              <Text style={styles.label}>Tell us more</Text>
              <TextInput
                value={details}
                onChangeText={(value) => { setDetails(value); setSuccess(false); }}
                placeholder="Add context that may help others understand..."
                placeholderTextColor="#9C9096"
                style={[styles.input, styles.detailsInput]}
                multiline
                maxLength={600}
                textAlignVertical="top"
              />
              <Text style={styles.characterCount}>{details.length}/600</Text>

              <Text style={styles.label}>Choose a category</Text>
              <View style={styles.categories}>
                {CATEGORIES.map((item) => {
                  const selected = item === category;
                  return (
                    <Pressable
                      key={item}
                      onPress={() => setCategory(item)}
                      style={[styles.category, selected && styles.categorySelected]}>
                      <Text style={[styles.categoryText, selected && styles.categoryTextSelected]}>{item}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.anonymousRow}>
                <View style={styles.anonymousCopy}>
                  <Text style={styles.anonymousTitle}>Post anonymously</Text>
                  <Text style={styles.anonymousText}>Your name will not appear with this question.</Text>
                </View>
                <Switch
                  value={anonymous}
                  onValueChange={setAnonymous}
                  trackColor={{ false: '#DDD4D1', true: '#C89AA8' }}
                  thumbColor="#FFFFFF"
                />
              </View>

              {!!error && <Text style={styles.error} accessibilityRole="alert">{error}</Text>}

              <Pressable onPress={submitQuestion} style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}>
                <Text style={styles.submitText}>Share My Question</Text>
              </Pressable>
              <Text style={styles.privacyNote}>This is a preview — questions and replies reset when the app reloads.</Text>
            </View>

            <View style={styles.communitySection}>
              <Text style={styles.communityHeading}>From Your Community</Text>
              <Text style={styles.communitySubheading}>Real answers from moms who have been there.</Text>

              {questions.map((question) => {
                const expanded = expandedId === question.id;
                const replyCount = question.replies.length;
                const replyLabel = replyCount === 0 ? 'No replies yet' : `${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`;

                return (
                  <View key={question.id} style={styles.questionCard}>
                    <Pressable onPress={() => toggleExpand(question.id)}>
                      <View style={styles.questionMeta}>
                        <Text style={styles.categoryPill}>{question.category}</Text>
                        <Text style={styles.author}>{question.author} · {question.postedAt}</Text>
                      </View>
                      <Text style={styles.questionTitle}>{question.title}</Text>
                      <Text style={styles.questionDetails} numberOfLines={expanded ? undefined : 2}>
                        {question.details}
                      </Text>
                      <View style={styles.replyToggleRow}>
                        <Text style={[styles.replyToggleText, replyCount > 0 && styles.replyToggleTextActive]}>{replyLabel}</Text>
                        <Text style={styles.replyChevron}>{expanded ? '⌃' : '⌄'}</Text>
                      </View>
                    </Pressable>

                    {expanded && (
                      <View style={styles.repliesBlock}>
                        {question.replies.map((reply) => (
                          <View key={reply.id} style={styles.replyRow}>
                            <Text style={styles.replyAuthor}>{reply.author}</Text>
                            <Text style={styles.replyText}>{reply.text}</Text>
                          </View>
                        ))}

                        <View style={styles.replyComposer}>
                          <TextInput
                            value={replyDrafts[question.id] ?? ''}
                            onChangeText={(value) => setReplyDrafts((current) => ({ ...current, [question.id]: value }))}
                            placeholder="Write a supportive reply..."
                            placeholderTextColor="#9C9096"
                            style={styles.replyInput}
                            multiline
                          />
                          <Pressable
                            onPress={() => submitReply(question.id)}
                            style={({ pressed }) => [styles.replyButton, pressed && styles.pressed]}>
                            <Text style={styles.replyButtonText}>Reply</Text>
                          </Pressable>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
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
  content: { width: '100%', maxWidth: 640, paddingHorizontal: 20 },
  intro: { flexDirection: 'row', gap: 14, paddingTop: 16, paddingBottom: 22, alignItems: 'flex-start' },
  introBadge: { width: 46, height: 46, borderRadius: 16, backgroundColor: '#EFEEF8', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  introCopy: { flex: 1 },
  eyebrow: { color: '#9A6E7D', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  heading: { color: '#302B41', fontSize: 29, lineHeight: 36, fontWeight: '800', marginTop: 8 },
  introText: { color: '#665E68', fontSize: 15, lineHeight: 22, marginTop: 8, maxWidth: 500 },
  successBanner: { flexDirection: 'row', gap: 12, backgroundColor: '#EAF3ED', borderColor: '#CFE3D5', borderWidth: 1, borderRadius: 16, padding: 15, marginBottom: 14 },
  successIcon: { color: '#4E8060', fontSize: 22, fontWeight: '800' },
  bannerCopy: { flex: 1 },
  successTitle: { color: '#315E42', fontSize: 15, fontWeight: '800' },
  successText: { color: '#557060', fontSize: 13, lineHeight: 18, marginTop: 2 },
  formCard: { backgroundColor: '#FFFCFA', borderColor: '#E9DFDB', borderWidth: 1, borderRadius: 22, padding: 18 },
  label: { color: '#393345', fontSize: 14, fontWeight: '800', marginBottom: 8, marginTop: 8 },
  input: { minHeight: 52, backgroundColor: '#FFFFFF', borderColor: '#DDD2CF', borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, color: '#302B41', fontSize: 16 },
  detailsInput: { minHeight: 132, paddingTop: 14, paddingBottom: 14 },
  characterCount: { color: '#968A90', fontSize: 11, textAlign: 'right', marginTop: 5, marginBottom: 8 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  category: { borderColor: '#DDD1D2', borderWidth: 1, borderRadius: 999, paddingHorizontal: 13, paddingVertical: 9, backgroundColor: '#FFFFFF' },
  categorySelected: { backgroundColor: '#8A88B8', borderColor: '#8A88B8' },
  categoryText: { color: '#625963', fontSize: 13, fontWeight: '700' },
  categoryTextSelected: { color: '#FFFFFF' },
  anonymousRow: { flexDirection: 'row', alignItems: 'center', gap: 16, borderTopColor: '#EEE5E2', borderTopWidth: 1, paddingTop: 16, marginTop: 2 },
  anonymousCopy: { flex: 1 },
  anonymousTitle: { color: '#393345', fontSize: 15, fontWeight: '800' },
  anonymousText: { color: '#7B7177', fontSize: 12, lineHeight: 17, marginTop: 3 },
  error: { color: '#A24255', backgroundColor: '#FBECEF', borderRadius: 10, padding: 10, fontSize: 13, marginTop: 14 },
  submitButton: { minHeight: 54, backgroundColor: '#9A6E7D', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
  submitText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  privacyNote: { color: '#91858B', fontSize: 11, lineHeight: 16, textAlign: 'center', marginTop: 10 },

  communitySection: { marginTop: 26, gap: 12 },
  communityHeading: { color: '#302B41', fontSize: 19, fontWeight: '800' },
  communitySubheading: { color: '#7B7177', fontSize: 13, marginTop: -6, marginBottom: 2 },
  questionCard: { backgroundColor: '#FFFCFA', borderColor: '#E9DFDB', borderWidth: 1, borderRadius: 16, padding: 15 },
  questionMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  categoryPill: { color: '#755E8E', backgroundColor: '#EEEAF6', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 4, fontSize: 11, fontWeight: '800', overflow: 'hidden' },
  author: { color: '#948990', fontSize: 11 },
  questionTitle: { color: '#393345', fontSize: 16, lineHeight: 22, fontWeight: '700', marginTop: 10 },
  questionDetails: { color: '#665E68', fontSize: 13, lineHeight: 19, marginTop: 5 },
  replyToggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  replyToggleText: { color: '#948990', fontSize: 12, fontWeight: '700' },
  replyToggleTextActive: { color: '#9A4F68' },
  replyChevron: { color: '#B3A6AC', fontSize: 14, fontWeight: '800' },

  repliesBlock: { marginTop: 14, borderTopColor: '#EEE5E2', borderTopWidth: 1, paddingTop: 14, gap: 12 },
  replyRow: { backgroundColor: '#FBF5F2', borderRadius: 12, padding: 11 },
  replyAuthor: { color: '#393345', fontSize: 12, fontWeight: '800', marginBottom: 3 },
  replyText: { color: '#5A525A', fontSize: 13, lineHeight: 19 },
  replyComposer: { flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
  replyInput: { flex: 1, minHeight: 42, maxHeight: 90, backgroundColor: '#FFFFFF', borderColor: '#DDD2CF', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, color: '#302B41', fontSize: 13 },
  replyButton: { minHeight: 42, backgroundColor: '#8A88B8', borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  replyButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
});
