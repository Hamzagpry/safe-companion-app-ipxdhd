
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';

export default function FeatureSummary() {
  const featureCategories = [
    {
      title: 'Health & Wellness (10 Features)',
      icon: 'heart' as keyof typeof Ionicons.glyphMap,
      color: colors.success,
      features: [
        'Blood pressure & glucose monitor integration',
        'Smart nutrition planner with meal suggestions',
        'Hydration reminders and tracking',
        'Daily activity & sleep tracking',
        'Monthly health reports for doctors/families',
        'Symptom journaling and tracking',
        'Early cognitive decline detection with micro-tests',
        'Medication assistant with refill alerts',
        'Appointment reminders (doctor/clinic sync)',
        'Personalized health tips and recommendations'
      ]
    },
    {
      title: 'Safety & Emergency (10 Features)',
      icon: 'shield' as keyof typeof Ionicons.glyphMap,
      color: colors.danger,
      features: [
        'Fall detection via device sensors',
        'Voice-activated SOS (keyword trigger)',
        '"No movement" alert if inactive for hours',
        'Low-battery alerts to family members',
        'Home intrusion alarm during nighttime',
        'Live location sharing during outings',
        'Auto camera activation during SOS events',
        'Fire/gas sensor integration capabilities',
        'Nighttime bed-exit alerts (for dementia care)',
        'Automatic ambulance dialing in critical cases'
      ]
    },
    {
      title: 'Artificial Intelligence (10 Features)',
      icon: 'brain' as keyof typeof Ionicons.glyphMap,
      color: colors.primary,
      features: [
        'Simplified voice assistant for everyday help',
        'Behavioral change detection (isolation, confusion)',
        'Voice tone analysis for depression detection',
        'Mood-based activity recommendations',
        'Predictive health risk analytics',
        'AI companion chatbot for reducing loneliness',
        'AI reading assistant (news, books, articles)',
        'Sleep analysis through microphone monitoring',
        'AI drug interaction checker and warnings',
        'Camera-based safety monitoring (expression & fall detection)'
      ]
    },
    {
      title: 'Entertainment & Cognitive Stimulation (5 Features)',
      icon: 'game-controller' as keyof typeof Ionicons.glyphMap,
      color: colors.accent,
      features: [
        'Brain-training games against dementia',
        'Music therapy sessions with curated playlists',
        'Virtual book club with peer discussions',
        'Interactive storytelling with voice narration',
        'Senior-friendly TV/radio streams and content'
      ]
    },
    {
      title: 'Social Connectivity (5 Features)',
      icon: 'people' as keyof typeof Ionicons.glyphMap,
      color: colors.secondary,
      features: [
        'Scheduled auto family calls at set times',
        'Peer support groups with shared interests',
        'Simple photo sharing (auto-display to family)',
        'Voice message exchanges with family/friends',
        'Celebration reminders (birthdays, anniversaries)'
      ]
    },
    {
      title: 'Digital Security (5 Features)',
      icon: 'lock-closed' as keyof typeof Ionicons.glyphMap,
      color: colors.warning,
      features: [
        'Voice-based login (instead of passwords)',
        'Scam/fraud call detection and warnings',
        'Spam call blocking with smart filtering',
        'End-to-end encrypted messaging with family',
        'Family alert if app deletion is attempted'
      ]
    },
    {
      title: 'Extra Services (5 Features)',
      icon: 'storefront' as keyof typeof Ionicons.glyphMap,
      color: colors.primary,
      features: [
        'Pharmacy integration for medicine delivery',
        'On-demand meal/cleaning service booking',
        'Instant voice translation for conversations',
        'Preloaded emergency numbers (local services)',
        'Bill payment reminders (utilities, rent, etc.)'
      ]
    }
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.title, { marginBottom: 8 }]}>SafeCompanion Pro</Text>
        <Text style={[commonStyles.subtitle, { marginBottom: 20, color: colors.primary }]}>
          50+ Features for Complete Senior Care
        </Text>
        
        <View style={[commonStyles.card, { marginBottom: 20, backgroundColor: colors.primary }]}>
          <Text style={[commonStyles.subtitle, { color: colors.background, marginBottom: 8 }]}>
            Market-Leading Platform
          </Text>
          <Text style={[commonStyles.textSecondary, { color: colors.background, textAlign: 'center' }]}>
            More comprehensive than any competitor • More trustworthy for families • 
            More engaging for seniors • More scalable with service integrations
          </Text>
        </View>

        {featureCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={[commonStyles.card, { marginBottom: 20 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Ionicons name={category.icon} size={28} color={category.color} />
              <Text style={[commonStyles.subtitle, { marginLeft: 12, textAlign: 'left', flex: 1 }]}>
                {category.title}
              </Text>
            </View>
            
            {category.features.map((feature, featureIndex) => (
              <View key={featureIndex} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: category.color,
                  marginTop: 8,
                  marginRight: 12
                }} />
                <Text style={[commonStyles.textSecondary, { flex: 1, textAlign: 'left', lineHeight: 22 }]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        ))}

        {/* Competitive Advantage */}
        <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Competitive Edge</Text>
          
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={[commonStyles.text, { marginLeft: 8, textAlign: 'left', fontWeight: 'bold' }]}>
                More Comprehensive
              </Text>
            </View>
            <Text style={[commonStyles.textSecondary, { textAlign: 'left', marginLeft: 28 }]}>
              50+ features vs competitors' 10-15 basic features
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={[commonStyles.text, { marginLeft: 8, textAlign: 'left', fontWeight: 'bold' }]}>
                More Trustworthy
              </Text>
            </View>
            <Text style={[commonStyles.textSecondary, { textAlign: 'left', marginLeft: 28 }]}>
              Predictive health analytics and real-time family alerts
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={[commonStyles.text, { marginLeft: 8, textAlign: 'left', fontWeight: 'bold' }]}>
                More Engaging
              </Text>
            </View>
            <Text style={[commonStyles.textSecondary, { textAlign: 'left', marginLeft: 28 }]}>
              Fun games, social features, and AI companionship
            </Text>
          </View>

          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={[commonStyles.text, { marginLeft: 8, textAlign: 'left', fontWeight: 'bold' }]}>
                More Scalable
              </Text>
            </View>
            <Text style={[commonStyles.textSecondary, { textAlign: 'left', marginLeft: 28 }]}>
              Third-party service integrations and expandable platform
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
