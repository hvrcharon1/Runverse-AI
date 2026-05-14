import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CommunityScreen() {
  const posts = [
    { id: 1, author: 'Sarah Chen', avatar: 'S', distance: '10.5 km', time: '52 min', likes: 24, comments: 5, timestamp: '2h ago' },
    { id: 2, author: 'Mike Johnson', avatar: 'M', distance: '8.2 km', time: '38 min', likes: 18, comments: 3, timestamp: '4h ago' },
    { id: 3, author: 'Emma Wilson', avatar: 'E', distance: '15.3 km', time: '1h 15m', likes: 42, comments: 12, timestamp: '6h ago' },
  ];

  const renderPost = (post: any) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{post.avatar}</Text>
          </View>
          <View>
            <Text style={styles.authorName}>{post.author}</Text>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <View style={styles.postContent}>
        <View style={styles.runInfo}>
          <Ionicons name="footsteps" size={20} color="#EF4444" />
          <Text style={styles.runStats}>{post.distance} • {post.time}</Text>
        </View>
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={18} color="#6B7280" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={18} color="#6B7280" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={18} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Community</Text>
        </View>

        <TouchableOpacity style={styles.createPostButton}>
          <View style={styles.createPostAvatar}>
            <Text style={styles.createPostAvatarText}>Y</Text>
          </View>
          <Text style={styles.createPostText}>Share your run...</Text>
        </TouchableOpacity>

        <View style={styles.postsContainer}>
          {posts.map(renderPost)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingHorizontal: 16, paddingVertical: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#1F2937' },
  createPostButton: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 20, backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E5E7EB', gap: 12 },
  createPostAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center' },
  createPostAvatarText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  createPostText: { fontSize: 14, color: '#9CA3AF', flex: 1 },
  postsContainer: { paddingHorizontal: 16 },
  postCard: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  avatarContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  authorName: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  timestamp: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  postContent: { marginBottom: 12 },
  runInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  runStats: { fontSize: 14, fontWeight: '600', color: '#4B5563' },
  postActions: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionText: { fontSize: 12, color: '#6B7280' },
});
