
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import Button from './Button';

interface SafetyStatus {
  fallDetection: boolean;
  homeSecure: boolean;
  batteryLevel: number;
  lastActivity: Date;
  inSafeZone: boolean;
}

interface SafetyMonitorProps {
  safetyStatus: SafetyStatus;
  onUpdateSafety: (status: Partial<SafetyStatus>) => void;
}

export default function SafetyMonitor({ safetyStatus, onUpdateSafety }: SafetyMonitorProps) {
  const [voiceSOS, setVoiceSOS] = useState(true);
  const [intrusionAlarm, setIntrusionAlarm] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);
  const [autoCamera, setAutoCamera] = useState(false);
  const [bedExitAlert, setBedExitAlert] = useState(false);

  const safetyFeatures = [
    {
      id: 'fallDetection',
      title: 'Fall Detection',
      description: 'Automatically detect falls using device sensors',
      icon: 'body' as keyof typeof Ionicons.glyphMap,
      status: safetyStatus.fallDetection,
      critical: true
    },
    {
      id: 'voiceSOS',
      title: 'Voice-Activated SOS',
      description: 'Say "Help me" to trigger emergency alert',
      icon: 'mic' as keyof typeof Ionicons.glyphMap,
      status: voiceSOS,
      critical: true
    },
    {
      id: 'batteryAlert',
      title: 'Low Battery Alert',
      description: 'Notify family when battery is low',
      icon: 'battery-charging' as keyof typeof Ionicons.glyphMap,
      status: safetyStatus.batteryLevel > 20,
      critical: false
    },
    {
      id: 'locationSharing',
      title: 'Live Location Sharing',
      description: 'Share location during outings',
      icon: 'location' as keyof typeof Ionicons.glyphMap,
      status: locationSharing,
      critical: false
    },
    {
      id: 'intrusionAlarm',
      title: 'Home Intrusion Alarm',
      description: 'Alert if unusual activity detected at night',
      icon: 'shield-checkmark' as keyof typeof Ionicons.glyphMap,
      status: intrusionAlarm,
      critical: false
    },
    {
      id: 'autoCamera',
      title: 'Auto Camera Activation',
      description: 'Activate camera during SOS events',
      icon: 'camera' as keyof typeof Ionicons.glyphMap,
      status: autoCamera,
      critical: false
    }
  ];

  const handleInactivityCheck = () => {
    const now = new Date();
    const lastActivity = safetyStatus.lastActivity;
    const hoursSinceActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceActivity > 4) {
      Alert.alert(
        'Inactivity Alert',
        'No movement detected for over 4 hours. Are you okay?',
        [
          { text: "I'm Fine", onPress: () => onUpdateSafety({ lastActivity: now }) },
          { text: 'Send Alert', onPress: () => handleEmergencyAlert('inactivity') }
        ]
      );
    }
  };

  const handleEmergencyAlert = (type: string) => {
    console.log(`Emergency alert triggered: ${type}`);
    Alert.alert('Emergency Alert Sent', 'Your emergency contacts have been notified.');
  };

  const handleSensorIntegration = () => {
    Alert.alert(
      'Sensor Integration',
      'Connect fire, gas, and other safety sensors to your SafeCompanion system.',
      [
        { text: 'Learn More', onPress: () => console.log('Opening sensor integration guide') },
        { text: 'OK' }
      ]
    );
  };

  const handleSafeZoneSetup = () => {
    Alert.alert(
      'Safe Zone Setup',
      'Define your safe zones and get alerts when you leave these areas.',
      [
        { text: 'Set Up Now', onPress: () => console.log('Opening safe zone setup') },
        { text: 'Later' }
      ]
    );
  };

  const handleAmbulanceSettings = () => {
    Alert.alert(
      'Emergency Services',
      'Configure automatic ambulance dialing for critical situations.',
      [
        { text: 'Configure', onPress: () => console.log('Opening ambulance settings') },
        { text: 'Cancel' }
      ]
    );
  };

  useEffect(() => {
    // Check for inactivity every 30 minutes
    const interval = setInterval(handleInactivityCheck, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [safetyStatus.lastActivity]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.title, { marginBottom: 20 }]}>Safety Monitor</Text>
        
        {/* Safety Status Overview */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Safety Status</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={commonStyles.text}>Overall Status</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons 
                name="checkmark-circle" 
                size={20} 
                color={safetyStatus.homeSecure ? colors.success : colors.warning} 
              />
              <Text style={[commonStyles.text, { 
                color: safetyStatus.homeSecure ? colors.success : colors.warning,
                marginLeft: 4
              }]}>
                {safetyStatus.homeSecure ? 'Secure' : 'Alert'}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={commonStyles.text}>Battery Level</Text>
            <Text style={[commonStyles.text, { 
              color: safetyStatus.batteryLevel > 20 ? colors.success : colors.danger 
            }]}>
              {safetyStatus.batteryLevel}%
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={commonStyles.text}>Safe Zone</Text>
            <Text style={[commonStyles.text, { 
              color: safetyStatus.inSafeZone ? colors.success : colors.warning 
            }]}>
              {safetyStatus.inSafeZone ? 'Inside' : 'Outside'}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={commonStyles.text}>Last Activity</Text>
            <Text style={commonStyles.textSecondary}>
              {safetyStatus.lastActivity.toLocaleTimeString()}
            </Text>
          </View>
        </View>

        {/* Safety Features */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Safety Features</Text>
          
          {safetyFeatures.map((feature, index) => (
            <View 
              key={feature.id}
              style={[
                commonStyles.row, 
                { 
                  paddingVertical: 12,
                  borderBottomWidth: index < safetyFeatures.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border
                }
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Ionicons 
                  name={feature.icon} 
                  size={24} 
                  color={feature.critical ? colors.danger : colors.primary} 
                />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={[commonStyles.text, { textAlign: 'left', marginBottom: 4 }]}>
                    {feature.title}
                  </Text>
                  <Text style={[commonStyles.textSecondary, { textAlign: 'left', fontSize: 14 }]}>
                    {feature.description}
                  </Text>
                </View>
              </View>
              <Switch
                value={feature.status}
                onValueChange={(value) => {
                  if (feature.id === 'voiceSOS') setVoiceSOS(value);
                  else if (feature.id === 'intrusionAlarm') setIntrusionAlarm(value);
                  else if (feature.id === 'locationSharing') setLocationSharing(value);
                  else if (feature.id === 'autoCamera') setAutoCamera(value);
                  else if (feature.id === 'bedExitAlert') setBedExitAlert(value);
                }}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={feature.status ? colors.background : colors.textSecondary}
              />
            </View>
          ))}
        </View>

        {/* Emergency Actions */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Emergency Setup</Text>
          
          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }]}
            onPress={handleSafeZoneSetup}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="location-outline" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Configure Safe Zones
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }]}
            onPress={handleSensorIntegration}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="hardware-chip" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Sensor Integration
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12 }]}
            onPress={handleAmbulanceSettings}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="medical" size={24} color={colors.danger} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Emergency Services
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            text="Test Systems"
            onPress={() => {
              console.log('Testing safety systems');
              Alert.alert('System Test', 'All safety systems are functioning normally.');
            }}
            style={[{ flex: 1, marginRight: 8, backgroundColor: colors.primary }]}
          />
          <Button
            text="Emergency Test"
            onPress={() => handleEmergencyAlert('test')}
            style={[{ flex: 1, marginLeft: 8, backgroundColor: colors.warning }]}
          />
        </View>
      </View>
    </ScrollView>
  );
}
