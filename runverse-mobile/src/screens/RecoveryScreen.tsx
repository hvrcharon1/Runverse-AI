import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RecoveryScreen() {
  const wellnessScore = 78;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Recovery</Text>
        </View>

        <View style={styles.wellnessCard}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreValue}>{wellnessScore}</Text>
            <Text style={styles.scoreLabel}>Wellness Score</Text>
          </View>
          <View style={styles.scoreDetails}>
            <View style={styles.scoreItem}>
              <Ionicons name="bed" size={20} color="#10B981" />
              <Text style={styles.scoreItemText}>Sleep: 7.5h</Text>
            </View>
            <View style={styles.scoreItem}>
              <Ionicons name="heart" size={20} color="#EF4444" />
              <Text style={styles.scoreItemText}>HR: 62 bpm</Text>
            </View>
            <View style={styles.scoreItem}>
              <Ionicons name="water" size={20} color="#3B82F6" />
              <Text style={styles.scoreItemText}>Hydration: Good</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recovery Activities</Text>
          <TouchableOpacity style={styles.activityButton}>
            <Ionicons name="add-circle-outline" size={24} color="#EF4444" />
            <Text style={styles.activityButtonText}>Log Recovery Activity</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recovery Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bed" size={20} color="#10B981" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Sleep</Text>
              <Text style={styles.tipText}>Aim for 7-9 hours per night</Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="water" size={20} color="#3B82F6" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Hydration</Text>
              <Text style={styles.tipText}>Drink 3-4 liters daily</Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="fitness" size={20} color="#8B5CF6" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Stretching</Text>
              <Text style={styles.tipText}>10-15 min post-run stretches</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingHorizontal: 16, paddingVertical: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#1F2937' },
  wellnessCard: { marginHorizontal: 16, marginBottom: 24, backgroundColor: '#F9FAFB', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  scoreCircle: { alignItems: 'center', marginBottom: 20 },
  scoreValue: { fontSize: 48, fontWeight: '700', color: '#10B981' },
  scoreLabel: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  scoreDetails: { gap: 12 },
  scoreItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  scoreItemText: { fontSize: 14, color: '#4B5563' },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  activityButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEE2E2', borderRadius: 12, padding: 16, gap: 12 },
  activityButtonText: { fontSize: 16, fontWeight: '600', color: '#EF4444' },
  tipCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB', gap: 12 },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  tipText: { fontSize: 12, color: '#6B7280', marginTop: 2 },
});
