import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RoutesScreen() {
  const routes = [
    { id: 1, name: 'Central Park Loop', distance: 10.5, elevation: 245, difficulty: 'Easy' },
    { id: 2, name: 'Mountain Trail', distance: 15.3, elevation: 680, difficulty: 'Hard' },
    { id: 3, name: 'Riverside Path', distance: 8.2, elevation: 120, difficulty: 'Easy' },
  ];

  const renderRoute = (route: any) => (
    <TouchableOpacity key={route.id} style={styles.routeCard}>
      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={32} color="#EF4444" />
      </View>
      <View style={styles.routeInfo}>
        <Text style={styles.routeName}>{route.name}</Text>
        <View style={styles.routeDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="footsteps" size={14} color="#6B7280" />
            <Text style={styles.detailText}>{route.distance} km</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="trending-up" size={14} color="#6B7280" />
            <Text style={styles.detailText}>{route.elevation}m</Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: route.difficulty === 'Easy' ? '#DBEAFE' : '#FEE2E2' }]}>
            <Text style={[styles.difficultyText, { color: route.difficulty === 'Easy' ? '#1E40AF' : '#991B1B' }]}>
              {route.difficulty}
            </Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Routes</Text>
        </View>

        <TouchableOpacity style={styles.createRouteButton}>
          <Ionicons name="add-circle" size={24} color="#FFFFFF" />
          <Text style={styles.createRouteText}>Create New Route</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Routes</Text>
          {routes.map(renderRoute)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Routes Nearby</Text>
          {routes.slice(0, 2).map(renderRoute)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingHorizontal: 16, paddingVertical: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#1F2937' },
  createRouteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginBottom: 24, backgroundColor: '#EF4444', borderRadius: 12, paddingVertical: 14, gap: 8 },
  createRouteText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  routeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB', gap: 12 },
  mapPlaceholder: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#FEE2E2', justifyContent: 'center', alignItems: 'center' },
  routeInfo: { flex: 1 },
  routeName: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  routeDetails: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailText: { fontSize: 11, color: '#6B7280' },
  difficultyBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  difficultyText: { fontSize: 11, fontWeight: '600' },
});
