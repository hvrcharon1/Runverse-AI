import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

export default function DashboardScreen() {
  const stats = {
    totalDistance: 342.5,
    activeShoes: 2,
    currentStreak: 12,
    totalRuns: 42,
  };

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [5.2, 0, 8.1, 6.3, 0, 10.5, 7.8],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.date}>Today's your running day</Text>
          </View>
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle" size={40} color="#EF4444" />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="footsteps" size={24} color="#EF4444" />
            <Text style={styles.statValue}>{stats.totalDistance}</Text>
            <Text style={styles.statLabel}>km Total</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="shoe" size={24} color="#EF4444" />
            <Text style={styles.statValue}>{stats.activeShoes}</Text>
            <Text style={styles.statLabel}>Active Shoes</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={24} color="#EF4444" />
            <Text style={styles.statValue}>{stats.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#EF4444" />
            <Text style={styles.statValue}>{stats.totalRuns}</Text>
            <Text style={styles.statLabel}>Total Runs</Text>
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={weeklyData}
              width={330}
              height={200}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                color: () => '#EF4444',
                strokeWidth: 2,
                useShadowColorFromDataset: false,
              }}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        {/* Recent Runs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Runs</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.runCard}>
            <View style={styles.runIcon}>
              <Ionicons name="footsteps" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.runInfo}>
              <Text style={styles.runTitle}>Morning Run</Text>
              <Text style={styles.runDetails}>8.5 km • 45 min • 5:18/km</Text>
            </View>
            <Text style={styles.runDate}>Today</Text>
          </View>

          <View style={styles.runCard}>
            <View style={styles.runIcon}>
              <Ionicons name="footsteps" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.runInfo}>
              <Text style={styles.runTitle}>Evening Jog</Text>
              <Text style={styles.runDetails}>5.2 km • 28 min • 5:23/km</Text>
            </View>
            <Text style={styles.runDate}>Yesterday</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="add-circle" size={32} color="#EF4444" />
              <Text style={styles.actionLabel}>Log Run</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="map" size={32} color="#EF4444" />
              <Text style={styles.actionLabel}>Routes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="people" size={32} color="#EF4444" />
              <Text style={styles.actionLabel}>Community</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="sparkles" size={32} color="#EF4444" />
              <Text style={styles.actionLabel}>AI Coach</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Achievements */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementRow}>
            <View style={styles.achievement}>
              <Ionicons name="medal" size={28} color="#F59E0B" />
              <Text style={styles.achievementLabel}>10K Club</Text>
            </View>
            <View style={styles.achievement}>
              <Ionicons name="star" size={28} color="#F59E0B" />
              <Text style={styles.achievementLabel}>Week Warrior</Text>
            </View>
            <View style={styles.achievement}>
              <Ionicons name="trophy" size={28} color="#F59E0B" />
              <Text style={styles.achievementLabel}>Consistency</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginBottom: 24,
    gap: 8,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  lastSection: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  viewAll: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },
  chartContainer: {
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 8,
  },
  chart: {
    borderRadius: 12,
  },
  runCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  runIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  runInfo: {
    flex: 1,
  },
  runTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  runDetails: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  runDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievement: {
    alignItems: 'center',
  },
  achievementLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
});
