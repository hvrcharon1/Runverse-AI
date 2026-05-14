import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const userStats = {
    totalRuns: 42,
    totalDistance: 342.5,
    avgPace: 5.18,
    followers: 128,
    following: 87,
  };

  const renderStatItem = (icon: string, label: string, value: string | number) => (
    <View style={styles.statItem}>
      <Ionicons name={icon as any} size={24} color="#EF4444" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitial}>J</Text>
          </View>
          <Text style={styles.profileName}>John Runner</Text>
          <Text style={styles.profileBio}>Marathon enthusiast • 5+ years running</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {renderStatItem('footsteps', 'Total Runs', userStats.totalRuns)}
          {renderStatItem('trending-up', 'Total Distance', `${userStats.totalDistance}km`)}
          {renderStatItem('flash', 'Avg Pace', `${userStats.avgPace}min/km`)}
          {renderStatItem('people', 'Followers', userStats.followers)}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="create" size={18} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="share-social" size={18} color="#EF4444" />
            <Text style={styles.secondaryButtonText}>Share Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="person" size={20} color="#EF4444" />
              <Text style={styles.settingText}>Personal Info</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="lock-closed" size={20} color="#EF4444" />
              <Text style={styles.settingText}>Privacy & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={20} color="#EF4444" />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="settings" size={20} color="#EF4444" />
              <Text style={styles.settingText}>Preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle" size={20} color="#EF4444" />
              <Text style={styles.settingText}>FAQ</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="mail" size={20} color="#EF4444" />
              <Text style={styles.settingText}>Contact Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.version}>RunVerse v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  profileHeader: { alignItems: 'center', paddingVertical: 24, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  profileImage: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  profileInitial: { fontSize: 36, fontWeight: '700', color: '#FFFFFF' },
  profileName: { fontSize: 24, fontWeight: '700', color: '#1F2937' },
  profileBio: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8, paddingVertical: 20 },
  statItem: { width: '25%', alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginTop: 4 },
  statLabel: { fontSize: 11, color: '#6B7280', marginTop: 2, textAlign: 'center' },
  actionButtons: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginBottom: 24 },
  primaryButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EF4444', borderRadius: 8, paddingVertical: 12, gap: 8 },
  primaryButtonText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  secondaryButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', borderRadius: 8, paddingVertical: 12, gap: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  secondaryButtonText: { fontSize: 14, fontWeight: '600', color: '#EF4444' },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingText: { fontSize: 14, color: '#1F2937' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginBottom: 24, backgroundColor: '#FEE2E2', borderRadius: 8, paddingVertical: 12, gap: 8 },
  logoutText: { fontSize: 14, fontWeight: '600', color: '#EF4444' },
  footer: { alignItems: 'center', paddingVertical: 20 },
  version: { fontSize: 12, color: '#9CA3AF' },
});
