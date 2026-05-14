import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NutritionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition</Text>
        </View>

        <View style={styles.macrosContainer}>
          <View style={styles.macroCard}>
            <Ionicons name="flame" size={24} color="#EF4444" />
            <Text style={styles.macroValue}>2,450</Text>
            <Text style={styles.macroLabel}>Calories</Text>
          </View>
          <View style={styles.macroCard}>
            <Ionicons name="nutrition" size={24} color="#10B981" />
            <Text style={styles.macroValue}>125g</Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>
          <View style={styles.macroCard}>
            <Ionicons name="nutrition" size={24} color="#F59E0B" />
            <Text style={styles.macroValue}>310g</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>
          <View style={styles.macroCard}>
            <Ionicons name="nutrition" size={24} color="#8B5CF6" />
            <Text style={styles.macroValue}>65g</Text>
            <Text style={styles.macroLabel}>Fat</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <TouchableOpacity style={styles.mealCard}>
            <Ionicons name="add-circle-outline" size={24} color="#EF4444" />
            <Text style={styles.addMealText}>Add Meal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Runner's Nutrition Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Pre-Run Fuel</Text>
            <Text style={styles.tipText}>Eat 1-3 hours before running. Focus on carbs and protein.</Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>During Run</Text>
            <Text style={styles.tipText}>For runs over 60 min, consume 30-60g carbs per hour.</Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Post-Run Recovery</Text>
            <Text style={styles.tipText}>Eat within 30 min. Include protein and carbs (3:1 ratio).</Text>
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
  macrosContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, marginBottom: 24, gap: 8 },
  macroCard: { width: '48%', backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  macroValue: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginTop: 8 },
  macroLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  mealCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEE2E2', borderRadius: 12, padding: 16, gap: 12 },
  addMealText: { fontSize: 16, fontWeight: '600', color: '#EF4444' },
  tipCard: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  tipTitle: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 4 },
  tipText: { fontSize: 12, color: '#6B7280', lineHeight: 18 },
});
