import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ShoesScreen() {
  const [shoes, setShoes] = useState([
    { id: 1, name: 'Nike Air Zoom', mileage: 450, limit: 500, color: '#3B82F6' },
    { id: 2, name: 'Brooks Ghost', mileage: 280, limit: 500, color: '#10B981' },
    { id: 3, name: 'Adidas UltraBoost', mileage: 120, limit: 500, color: '#F59E0B' },
  ]);

  const renderShoeCard = (shoe: any) => {
    const percentage = (shoe.mileage / shoe.limit) * 100;
    const isRetiring = percentage >= 80;

    return (
      <View key={shoe.id} style={styles.shoeCard}>
        <View style={[styles.shoeIcon, { backgroundColor: shoe.color }]}>
          <Ionicons name="shoe" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.shoeInfo}>
          <Text style={styles.shoeName}>{shoe.name}</Text>
          <Text style={styles.shoeMileage}>{shoe.mileage} / {shoe.limit} km</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(percentage, 100)}%`,
                  backgroundColor: isRetiring ? '#EF4444' : '#10B981',
                },
              ]}
            />
          </View>
        </View>
        {isRetiring && (
          <View style={styles.retirementAlert}>
            <Ionicons name="alert-circle" size={20} color="#EF4444" />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Shoes</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={28} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {shoes.map(renderShoeCard)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shoe Care Tips</Text>
          <View style={styles.tip}>
            <Ionicons name="information-circle" size={20} color="#EF4444" />
            <Text style={styles.tipText}>Replace shoes every 500-800 km</Text>
          </View>
          <View style={styles.tip}>
            <Ionicons name="information-circle" size={20} color="#EF4444" />
            <Text style={styles.tipText}>Rotate between 2-3 pairs for longevity</Text>
          </View>
          <View style={styles.tip}>
            <Ionicons name="information-circle" size={20} color="#EF4444" />
            <Text style={styles.tipText}>Clean shoes after wet runs</Text>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  shoeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  shoeIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shoeInfo: {
    flex: 1,
  },
  shoeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  shoeMileage: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  retirementAlert: {
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#4B5563',
  },
});
