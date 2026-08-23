import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/bottom-nav';
import { questionStore, topicById, type CommunityQuestion } from '@/constants/questions';

export default function CommunityScreen() {
  const [questions, setQuestions] = useState<CommunityQuestion[]>(() => [...questionStore]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});

  const toggleExpand = (id: number) => setExpandedId((current) => (current === id ? null : id));

  const submitReply = (id: number) => {
    const text = (replyDrafts[id] ?? '').trim();
    if (!text) return;

    const reply = { id: Date.now(), author: 'You', text };
    const index = questionStore.findIndex((question) => question.id === id);
    if (index !== -1) {
      questionStore[index] = { ...questionStore[index], replies: [...questionStore[index].replies, reply] };
    }
    setQuestions((current) =>
      current.map((question) => (question.id === id ? { ...question, replies: [...question.replies, reply] } : question))
    );
    setReplyDrafts((current) => ({ ...current, [id]: '' }));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.intro}>
              <Text style={styles.heading}>Your Community</Text>
              <Text style={styles.subheading}>Real questions and real support from moms who get it.</Text>
            </View>

            {questions.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No questions yet. Be the first to ask one from the Ask a Question tab.</Text>
              </View>
            )}

            {questions.map((question) => {
              const topic = topicById(question.topicId);
              const expanded = expandedId === question.id;
              const replyCount = question.replies.length;
              const replyLabel = replyCount === 0 ? 'No replies yet' : `${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`;

              return (
                <View key={question.id} style={styles.questionCard}>
                  <Pressable onPress={() => toggleExpand(question.id)}>
                    <View style={styles.questionMeta}>
                      <View style={[styles.topicPill, { backgroundColor: `${topic.color}26` }]}>
                        <Text style={[styles.topicPillGlyph, { color: topic.color }]}>{topic.glyph}</Text>
                        <Text style={[styles.topicPillText, { color: topic.color }]}>{topic.label}</Text>
                      </View>
                      <Text style={styles.author}>{question.author} · {question.postedAt}</Text>
                    </View>
                    <Text style={styles.questionText} numberOfLines={expanded ? undefined : 3}>
                      {question.question}
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

            <Text style={styles.footerNote}>This is a preview — questions and replies reset when the app reloads.</Text>
          </View>
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF5F2' },
  page: { flex: 1 },
  scrollContent: { alignItems: 'center', paddingBottom: 28 },
  content: { width: '100%', maxWidth: 640, paddingHorizontal: 20, paddingTop: 16, gap: 12 },
  intro: { marginBottom: 4 },
  heading: { color: '#302B41', fontSize: 24, lineHeight: 30, fontWeight: '800' },
  subheading: { color: '#665E68', fontSize: 14, lineHeight: 20, marginTop: 6 },
  emptyState: { backgroundColor: '#FFFCFA', borderColor: '#E9DFDB', borderWidth: 1, borderRadius: 16, padding: 20 },
  emptyText: { color: '#7B7177', fontSize: 13, lineHeight: 19, textAlign: 'center' },

  questionCard: { backgroundColor: '#FFFCFA', borderColor: '#E9DFDB', borderWidth: 1, borderRadius: 16, padding: 15 },
  questionMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  topicPill: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 999, paddingHorizontal: 9, paddingVertical: 4 },
  topicPillGlyph: { fontSize: 10, fontWeight: '800' },
  topicPillText: { fontSize: 11, fontWeight: '800' },
  author: { color: '#948990', fontSize: 11 },
  questionText: { color: '#393345', fontSize: 15, lineHeight: 21, fontWeight: '600', marginTop: 10 },
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
  pressed: { opacity: 0.76 },
  replyButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },

  footerNote: { color: '#91858B', fontSize: 11, lineHeight: 16, textAlign: 'center', marginTop: 6 },
});
