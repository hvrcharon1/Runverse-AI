import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AIChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! I\'m your RunVerse AI Coach. How can I help you today?', sender: 'bot' },
    { id: 2, text: 'What\'s a good training plan for a 10K?', sender: 'user' },
    { id: 3, text: 'Great question! For a 10K, I recommend a 8-week training plan with 3-4 runs per week. Focus on building base mileage first.', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputText, sender: 'user' }]);
      setInputText('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { id: prev.length + 1, text: 'That\'s a great question! Let me help you with that.', sender: 'bot' }]);
      }, 500);
    }
  };

  const renderMessage = (message: any) => (
    <View key={message.id} style={[styles.messageContainer, message.sender === 'user' ? styles.userMessage : styles.botMessage]}>
      {message.sender === 'bot' && (
        <View style={styles.botAvatar}>
          <Ionicons name="sparkles" size={16} color="#FFFFFF" />
        </View>
      )}
      <View style={[styles.messageBubble, message.sender === 'user' ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.messageText, message.sender === 'user' ? styles.userText : styles.botText]}>
          {message.text}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Coach</Text>
          <Ionicons name="sparkles" size={24} color="#EF4444" />
        </View>

        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {messages.map(renderMessage)}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything..."
            placeholderTextColor="#D1D5DB"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  keyboardView: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  title: { fontSize: 24, fontWeight: '700', color: '#1F2937' },
  messagesContainer: { flex: 1, paddingHorizontal: 16, paddingVertical: 16 },
  messageContainer: { marginBottom: 12, flexDirection: 'row', alignItems: 'flex-end' },
  userMessage: { justifyContent: 'flex-end' },
  botMessage: { justifyContent: 'flex-start' },
  botAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  messageBubble: { maxWidth: '80%', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  userBubble: { backgroundColor: '#EF4444' },
  botBubble: { backgroundColor: '#F3F4F6' },
  messageText: { fontSize: 14 },
  userText: { color: '#FFFFFF' },
  botText: { color: '#1F2937' },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB', gap: 8 },
  input: { flex: 1, backgroundColor: '#F9FAFB', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: '#1F2937', maxHeight: 100 },
  sendButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center' },
});
