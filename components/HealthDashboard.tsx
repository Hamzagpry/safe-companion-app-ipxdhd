
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import Button from './Button';

interface HealthData {
  bloodPressure: { systolic: number; diastolic: number };
  heartRate: number;
  steps: number;
  hydration: number;
  sleep: number;
  mood: 'excellent' | 'good' | 'fair' | 'poor';
}

interface HealthDashboardProps {
  healthData: HealthData;
  onUpdateHealth: (data: Partial<HealthData>) => void;
}

export default function HealthDashboard({ healthData, onUpdateHealth }: HealthDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const healthMetrics = [
    {
      id: 'bloodPressure',
      title: 'Blood Pressure',
      value: `${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic}`,
      unit: 'mmHg',
      icon: 'heart' as keyof typeof Ionicons.glyphMap,
      color: healthData.bloodPressure.systolic > 140 ? colors.warning : colors.success,
      tips: ['Take medication as prescribed', 'Reduce salt intake', 'Exercise regularly']
    },
    {
      id: 'heartRate',
      title: 'Heart Rate',
      value: healthData.heartRate.toString(),
      unit: 'bpm',
      icon: 'pulse' as keyof typeof Ionicons.glyphMap,
      color: healthData.heartRate > 100 ? colors.warning : colors.success,
      tips: ['Stay hydrated', 'Practice deep breathing', 'Avoid caffeine if elevated']
    },
    {
      id: 'steps',
      title: 'Daily Steps',
      value: healthData.steps.toLocaleString(),
      unit: 'steps',
      icon: 'walk' as keyof typeof Ionicons.glyphMap,
      color: healthData.steps >= 5000 ? colors.success : colors.warning,
      tips: ['Take short walks', 'Use stairs when possible', 'Garden or do light housework']
    },
    {
      id: 'hydration',
      title: 'Water Intake',
      value: healthData.hydration.toString(),
      unit: 'glasses',
      icon: 'water' as keyof typeof Ionicons.glyphMap,
      color: healthData.hydration >= 8 ? colors.success : colors.warning,
      tips: ['Drink water with meals', 'Keep water bottle nearby', 'Set hourly reminders']
    },
    {
      id: 'sleep',
      title: 'Sleep Quality',
      value: healthData.sleep.toString(),
      unit: 'hours',
      icon: 'moon' as keyof typeof Ionicons.glyphMap,
      color: healthData.sleep >= 7 ? colors.success : colors.warning,
      tips: ['Maintain sleep schedule', 'Avoid screens before bed', 'Keep room cool and dark']
    },
    {
      id: 'mood',
      title: 'Mood',
      value: healthData.mood.charAt(0).toUpperCase() + healthData.mood.slice(1),
      unit: '',
      icon: 'happy' as keyof typeof Ionicons.glyphMap,
      color: healthData.mood === 'excellent' || healthData.mood === 'good' ? colors.success : colors.warning,
      tips: ['Stay connected with family', 'Engage in hobbies', 'Get sunlight daily']
    }
  ];

  const handleMetricPress = (metricId: string) => {
    setSelectedMetric(metricId);
  };

  const handleSymptomLog = () => {
    Alert.alert('Symptom Journal', 'Record any symptoms or concerns you have today.');
    console.log('Opening symptom journal');
  };

  const handleMedicationReminder = () => {
    Alert.alert('Medication Assistant', 'Check your medication schedule and refill status.');
    console.log('Opening medication assistant');
  };

  const handleHealthReport = () => {
    Alert.alert('Health Report', 'Generate monthly health report for your doctor.');
    console.log('Generating health report');
  };

  const handleNutritionPlanner = () => {
    Alert.alert('Nutrition Planner', 'Get personalized meal suggestions based on your health needs.');
    console.log('Opening nutrition planner');
  };

  const handleCognitiveTest = () => {
    Alert.alert('Cognitive Assessment', 'Take a quick cognitive health check.');
    console.log('Starting cognitive test');
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.title, { marginBottom: 20 }]}>Health Dashboard</Text>
        
        {/* Health Metrics Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {healthMetrics.map((metric) => (
            <TouchableOpacity
              key={metric.id}
              style={[
                commonStyles.card,
                {
                  width: '48%',
                  marginBottom: 16,
                  borderLeftWidth: 4,
                  borderLeftColor: metric.color,
                }
              ]}
              onPress={() => handleMetricPress(metric.id)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name={metric.icon} size={24} color={metric.color} />
                <Text style={[commonStyles.textSecondary, { marginLeft: 8, fontSize: 14 }]}>
                  {metric.title}
                </Text>
              </View>
              <Text style={[commonStyles.text, { fontSize: 24, fontWeight: 'bold', color: metric.color }]}>
                {metric.value}
              </Text>
              {metric.unit && (
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                  {metric.unit}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Health Actions */}
        <View style={[commonStyles.card, { marginTop: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Health Tools</Text>
          
          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }]}
            onPress={handleSymptomLog}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="clipboard" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Symptom Journal
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }]}
            onPress={handleMedicationReminder}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="medical" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Medication Assistant
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }]}
            onPress={handleNutritionPlanner}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="nutrition" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Nutrition Planner
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }]}
            onPress={handleCognitiveTest}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="brain" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Cognitive Assessment
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12 }]}
            onPress={handleHealthReport}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="document-text" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Monthly Health Report
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Quick Health Tips */}
        {selectedMetric && (
          <View style={[commonStyles.card, { marginTop: 20, backgroundColor: colors.backgroundAlt }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Health Tips</Text>
            {healthMetrics.find(m => m.id === selectedMetric)?.tips.map((tip, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={[commonStyles.textSecondary, { marginLeft: 8, textAlign: 'left' }]}>
                  {tip}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
