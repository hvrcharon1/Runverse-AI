import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MarketplaceScreen() {
  const listings = [
    { id: 1, title: 'Nike Air Zoom Pegasus', price: 45, condition: 'Like New', image: '👟' },
    { id: 2, title: 'Brooks Ghost 14', price: 60, condition: 'Excellent', image: '👟' },
    { id: 3, title: 'Garmin Watch', price: 120, condition: 'Good', image: '⌚' },
  ];

  const renderListing = (listing: any) => (
    <TouchableOpacity key={listing.id} style={styles.listingCard}>
      <View style={styles.imageContainer}>
        <Text style={styles.image}>{listing.image}</Text>
      </View>
      <View style={styles.listingInfo}>
        <Text style={styles.listingTitle}>{listing.title}</Text>
        <Text style={styles.condition}>{listing.condition}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${listing.price}</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Marketplace</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search gear..."
            placeholderTextColor="#D1D5DB"
          />
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={16} color="#EF4444" />
            <Text style={styles.filterText}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Shoes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Watches</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Apparel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Listings</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {listings.map(renderListing)}
        </View>

        <TouchableOpacity style={styles.sellButton}>
          <Ionicons name="add-circle" size={24} color="#FFFFFF" />
          <Text style={styles.sellButtonText}>List Your Gear</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingHorizontal: 16, paddingVertical: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#1F2937' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, backgroundColor: '#F9FAFB', borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  searchInput: { flex: 1, paddingVertical: 10, paddingHorizontal: 8, fontSize: 14, color: '#1F2937' },
  filterContainer: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 20, paddingBottom: 8, overflow: 'scroll' },
  filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: '#E5E7EB', gap: 4 },
  filterText: { fontSize: 12, fontWeight: '600', color: '#4B5563' },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  viewAll: { fontSize: 14, color: '#EF4444', fontWeight: '600' },
  listingCard: { flexDirection: 'row', backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB', gap: 12 },
  imageContainer: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#FEE2E2', justifyContent: 'center', alignItems: 'center' },
  image: { fontSize: 32 },
  listingInfo: { flex: 1, justifyContent: 'space-between' },
  listingTitle: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  condition: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  price: { fontSize: 16, fontWeight: '700', color: '#EF4444' },
  sellButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginBottom: 24, backgroundColor: '#EF4444', borderRadius: 12, paddingVertical: 14, gap: 8 },
  sellButtonText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
});
