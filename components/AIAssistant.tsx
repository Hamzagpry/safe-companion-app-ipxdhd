
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import Button from './Button';

interface AIAssistantProps {
  onVoiceCommand?: (command: string) => void;
}

export default function AIAssistant({ onVoiceCommand }: AIAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: '1', text: 'Hello! I\'m your AI companion. How can I help you today?', sender: 'ai', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [behaviorInsights, setBehaviorInsights] = useState({
    moodTrend: 'stable',
    activityLevel: 'normal',
    sleepPattern: 'regular',
    socialInteraction: 'good'
  });

  const aiFeatures = [
    {
      id: 'voiceAssistant',
      title: 'Voice Assistant',
      description: 'Ask me anything - weather, reminders, or just chat',
      icon: 'mic' as keyof typeof Ionicons.glyphMap,
      action: () => handleVoiceAssistant()
    },
    {
      id: 'behaviorAnalysis',
      title: 'Behavior Analysis',
      description: 'Monitor patterns and detect changes',
      icon: 'analytics' as keyof typeof Ionicons.glyphMap,
      action: () => handleBehaviorAnalysis()
    },
    {
      id: 'moodDetection',
      title: 'Mood Detection',
      description: 'Voice tone analysis for emotional wellbeing',
      icon: 'happy' as keyof typeof Ionicons.glyphMap,
      action: () => handleMoodDetection()
    },
    {
      id: 'healthRisk',
      title: 'Health Risk Analytics',
      description: 'Predictive health insights and recommendations',
      icon: 'medical' as keyof typeof Ionicons.glyphMap,
      action: () => handleHealthRisk()
    },
    {
      id: 'companion',
      title: 'AI Companion',
      description: 'Chat to reduce loneliness and stay engaged',
      icon: 'chatbubbles' as keyof typeof Ionicons.glyphMap,
      action: () => handleCompanionChat()
    },
    {
      id: 'readingAssistant',
      title: 'Reading Assistant',
      description: 'Read news, books, and articles aloud',
      icon: 'book' as keyof typeof Ionicons.glyphMap,
      action: () => handleReadingAssistant()
    },
    {
      id: 'sleepAnalysis',
      title: 'Sleep Analysis',
      description: 'Monitor sleep patterns through audio',
      icon: 'moon' as keyof typeof Ionicons.glyphMap,
      action: () => handleSleepAnalysis()
    },
    {
      id: 'drugChecker',
      title: 'Drug Interaction Checker',
      description: 'Check medication interactions and safety',
      icon: 'warning' as keyof typeof Ionicons.glyphMap,
      action: () => handleDrugChecker()
    },
    {
      id: 'safetyMonitoring',
      title: 'Camera Safety Monitoring',
      description: 'Monitor expressions and detect falls',
      icon: 'camera' as keyof typeof Ionicons.glyphMap,
      action: () => handleSafetyMonitoring()
    },
    {
      id: 'recommendations',
      title: 'Activity Recommendations',
      description: 'Mood-based activity suggestions',
      icon: 'bulb' as keyof typeof Ionicons.glyphMap,
      action: () => handleRecommendations()
    }
  ];

  const handleVoiceAssistant = () => {
    setIsListening(!isListening);
    if (!isListening) {
      Alert.alert(
        'Voice Assistant',
        'Voice assistant is now listening. You can ask about weather, set reminders, or just have a conversation.',
        [{ text: 'OK', onPress: () => setIsListening(false) }]
      );
    }
  };

  const handleBehaviorAnalysis = () => {
    Alert.alert(
      'Behavior Analysis',
      `Current insights:\n• Mood: ${behaviorInsights.moodTrend}\n• Activity: ${behaviorInsights.activityLevel}\n• Sleep: ${behaviorInsights.sleepPattern}\n• Social: ${behaviorInsights.socialInteraction}`,
      [{ text: 'View Details', onPress: () => console.log('Opening detailed behavior analysis') }]
    );
  };

  const handleMoodDetection = () => {
    Alert.alert(
      'Mood Detection',
      'I can analyze your voice tone to understand how you\'re feeling. Would you like to share how your day has been?',
      [
        { text: 'Not now' },
        { text: 'Tell AI', onPress: () => addChatMessage('How has your day been? I\'m here to listen.', 'ai') }
      ]
    );
  };

  const handleHealthRisk = () => {
    Alert.alert(
      'Health Risk Analytics',
      'Based on your health data, I can provide personalized recommendations and early warnings.',
      [
        { text: 'View Report', onPress: () => console.log('Opening health risk report') },
        { text: 'Later' }
      ]
    );
  };

  const handleCompanionChat = () => {
    addChatMessage('I\'m here to chat whenever you need company. What would you like to talk about?', 'ai');
  };

  const handleReadingAssistant = () => {
    Alert.alert(
      'Reading Assistant',
      'I can read news articles, books, or any text aloud for you. What would you like me to read?',
      [
        { text: 'Today\'s News', onPress: () => console.log('Reading news') },
        { text: 'My Book', onPress: () => console.log('Reading saved book') },
        { text: 'Cancel' }
      ]
    );
  };

  const handleSleepAnalysis = () => {
    Alert.alert(
      'Sleep Analysis',
      'I can monitor your sleep patterns through ambient audio. Your recent sleep quality has been good with 7.5 hours average.',
      [{ text: 'View Details', onPress: () => console.log('Opening sleep analysis') }]
    );
  };

  const handleDrugChecker = () => {
    Alert.alert(
      'Drug Interaction Checker',
      'I can check your medications for potential interactions. Please list your current medications.',
      [
        { text: 'Add Medications', onPress: () => console.log('Opening medication list') },
        { text: 'Later' }
      ]
    );
  };

  const handleSafetyMonitoring = () => {
    Alert.alert(
      'Camera Safety Monitoring',
      'I can monitor your facial expressions and movements to detect distress or falls. This feature requires camera permission.',
      [
        { text: 'Enable', onPress: () => console.log('Enabling camera monitoring') },
        { text: 'Not now' }
      ]
    );
  };

  const handleRecommendations = () => {
    const recommendations = [
      'Take a short walk outside for fresh air',
      'Call a family member or friend',
      'Listen to your favorite music',
      'Do some light stretching exercises',
      'Work on a puzzle or brain game'
    ];
    
    const randomRec = recommendations[Math.floor(Math.random() * recommendations.length)];
    addChatMessage(`Based on your current mood, I recommend: ${randomRec}`, 'ai');
  };

  const addChatMessage = (text: string, sender: 'user' | 'ai') => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      addChatMessage(inputText, 'user');
      setInputText('');
      
      // Simulate AI response
      setTimeout(() => {
        const responses = [
          'That\'s interesting! Tell me more about that.',
          'I understand. How does that make you feel?',
          'Thank you for sharing that with me.',
          'That sounds important. Would you like to talk about it more?',
          'I\'m here to listen and support you.'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage(randomResponse, 'ai');
      }, 1000);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.title, { marginBottom: 20 }]}>AI Assistant</Text>
        
        {/* AI Chat Interface */}
        <View style={[commonStyles.card, { marginBottom: 20, height: 300 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Chat with AI</Text>
          
          <ScrollView style={{ flex: 1, marginBottom: 16 }}>
            {chatMessages.map((message) => (
              <View
                key={message.id}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: message.sender === 'user' ? colors.primary : colors.backgroundAlt,
                  padding: 12,
                  borderRadius: 16,
                  marginBottom: 8,
                  maxWidth: '80%'
                }}
              >
                <Text style={{
                  color: message.sender === 'user' ? colors.background : colors.text,
                  textAlign: 'left'
                }}>
                  {message.text}
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: message.sender === 'user' ? colors.background : colors.textSecondary,
                  marginTop: 4,
                  textAlign: 'left'
                }}>
                  {message.timestamp.toLocaleTimeString()}
                </Text>
              </View>
            ))}
          </ScrollView>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 8,
                fontSize: 16
              }}
              placeholder="Type your message..."
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 20,
                padding: 8
              }}
            >
              <Ionicons name="send" size={20} color={colors.background} />
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Features Grid */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>AI Features</Text>
          
          {aiFeatures.map((feature, index) => (
            <TouchableOpacity
              key={feature.id}
              style={[
                commonStyles.row,
                {
                  paddingVertical: 12,
                  borderBottomWidth: index < aiFeatures.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border
                }
              ]}
              onPress={feature.action}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Ionicons name={feature.icon} size={24} color={colors.primary} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={[commonStyles.text, { textAlign: 'left', marginBottom: 4 }]}>
                    {feature.title}
                  </Text>
                  <Text style={[commonStyles.textSecondary, { textAlign: 'left', fontSize: 14 }]}>
                    {feature.description}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Voice Control */}
        <View style={[commonStyles.card, { alignItems: 'center' }]}>
          <TouchableOpacity
            onPress={handleVoiceAssistant}
            style={{
              backgroundColor: isListening ? colors.danger : colors.primary,
              borderRadius: 50,
              padding: 20,
              marginBottom: 16
            }}
          >
            <Ionicons 
              name={isListening ? "stop" : "mic"} 
              size={40} 
              color={colors.background} 
            />
          </TouchableOpacity>
          <Text style={[commonStyles.text, { marginBottom: 8 }]}>
            {isListening ? 'Listening...' : 'Tap to Talk'}
          </Text>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
            Say "Help me" for emergency or ask any question
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
