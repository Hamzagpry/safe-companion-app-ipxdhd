
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import Button from './Button';

export default function DigitalSecurity() {
  const [voiceLogin, setVoiceLogin] = useState(false);
  const [scamDetection, setScamDetection] = useState(true);
  const [spamBlocking, setSpamBlocking] = useState(true);
  const [encryptedMessaging, setEncryptedMessaging] = useState(true);
  const [deletionAlert, setDeletionAlert] = useState(true);

  const securityFeatures = [
    {
      id: 'voiceLogin',
      title: 'Voice-Based Login',
      description: 'Use your voice instead of passwords',
      icon: 'mic' as keyof typeof Ionicons.glyphMap,
      status: voiceLogin,
      onToggle: setVoiceLogin,
      critical: false
    },
    {
      id: 'scamDetection',
      title: 'Scam Call Detection',
      description: 'Automatically detect and warn about fraud calls',
      icon: 'shield-checkmark' as keyof typeof Ionicons.glyphMap,
      status: scamDetection,
      onToggle: setScamDetection,
      critical: true
    },
    {
      id: 'spamBlocking',
      title: 'Spam Call Blocking',
      description: 'Block unwanted and spam calls',
      icon: 'call' as keyof typeof Ionicons.glyphMap,
      status: spamBlocking,
      onToggle: setSpamBlocking,
      critical: true
    },
    {
      id: 'encryptedMessaging',
      title: 'Encrypted Messaging',
      description: 'End-to-end encrypted family communications',
      icon: 'lock-closed' as keyof typeof Ionicons.glyphMap,
      status: encryptedMessaging,
      onToggle: setEncryptedMessaging,
      critical: true
    },
    {
      id: 'deletionAlert',
      title: 'App Deletion Alert',
      description: 'Alert family if app is being deleted',
      icon: 'warning' as keyof typeof Ionicons.glyphMap,
      status: deletionAlert,
      onToggle: setDeletionAlert,
      critical: true
    }
  ];

  const handleSetupVoiceLogin = () => {
    Alert.alert(
      'Voice Login Setup',
      'Record your voice pattern for secure login. This will replace traditional passwords.',
      [
        { text: 'Start Recording', onPress: () => console.log('Starting voice recording for login') },
        { text: 'Learn More', onPress: () => console.log('Opening voice login guide') },
        { text: 'Cancel' }
      ]
    );
  };

  const handleScamDatabase = () => {
    Alert.alert(
      'Scam Database',
      'View recent scam attempts and learn how to identify fraud calls.',
      [
        { text: 'View Database', onPress: () => console.log('Opening scam database') },
        { text: 'Report Scam', onPress: () => console.log('Opening scam reporting') },
        { text: 'OK' }
      ]
    );
  };

  const handleSecurityReport = () => {
    Alert.alert(
      'Security Report',
      'Your security status:\n• 5 spam calls blocked this week\n• 2 scam attempts detected\n• All communications encrypted\n• No security threats detected',
      [{ text: 'View Details', onPress: () => console.log('Opening detailed security report') }]
    );
  };

  const handleEmergencyNumbers = () => {
    Alert.alert(
      'Emergency Numbers',
      'Manage your local emergency contacts and services.',
      [
        { text: 'Edit Numbers', onPress: () => console.log('Opening emergency numbers editor') },
        { text: 'Test Call', onPress: () => console.log('Testing emergency call') },
        { text: 'Cancel' }
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.title, { marginBottom: 20 }]}>Digital Security</Text>
        
        {/* Security Status Overview */}
        <View style={[commonStyles.card, { marginBottom: 20, backgroundColor: colors.success, opacity: 0.1 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="shield-checkmark" size={32} color={colors.success} />
            <View style={{ marginLeft: 12 }}>
              <Text style={[commonStyles.subtitle, { color: colors.success, marginBottom: 4 }]}>
                Protected
              </Text>
              <Text style={[commonStyles.textSecondary, { color: colors.success }]}>
                All security features active
              </Text>
            </View>
          </View>
        </View>

        {/* Security Features */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Security Features</Text>
          
          {securityFeatures.map((feature, index) => (
            <View 
              key={feature.id}
              style={[
                commonStyles.row, 
                { 
                  paddingVertical: 12,
                  borderBottomWidth: index < securityFeatures.length - 1 ? 1 : 0,
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
                onValueChange={feature.onToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={feature.status ? colors.background : colors.textSecondary}
              />
            </View>
          ))}
        </View>

        {/* Security Tools */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Security Tools</Text>
          
          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }]}
            onPress={handleSetupVoiceLogin}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="mic-circle" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Setup Voice Login
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }]}
            onPress={handleScamDatabase}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="warning" size={24} color={colors.warning} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Scam Database
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }]}
            onPress={handleEmergencyNumbers}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="call" size={24} color={colors.danger} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Emergency Numbers
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.row, { paddingVertical: 12 }]}
            onPress={handleSecurityReport}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="document-text" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Security Report
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Recent Security Activity */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Recent Activity</Text>
          
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={[commonStyles.textSecondary, { marginLeft: 8, textAlign: 'left' }]}>
                Blocked spam call from unknown number
              </Text>
            </View>
            <Text style={[commonStyles.textSecondary, { fontSize: 12, marginLeft: 24 }]}>
              2 hours ago
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name="shield-checkmark" size={16} color={colors.success} />
              <Text style={[commonStyles.textSecondary, { marginLeft: 8, textAlign: 'left' }]}>
                Encrypted message sent to family
              </Text>
            </View>
            <Text style={[commonStyles.textSecondary, { fontSize: 12, marginLeft: 24 }]}>
              Yesterday
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name="warning" size={16} color={colors.warning} />
              <Text style={[commonStyles.textSecondary, { marginLeft: 8, textAlign: 'left' }]}>
                Potential scam call detected and blocked
              </Text>
            </View>
            <Text style={[commonStyles.textSecondary, { fontSize: 12, marginLeft: 24 }]}>
              3 days ago
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            text="Security Scan"
            onPress={() => {
              console.log('Running security scan');
              Alert.alert('Security Scan', 'Running comprehensive security check...');
            }}
            style={[{ flex: 1, marginRight: 8, backgroundColor: colors.primary }]}
          />
          <Button
            text="Report Issue"
            onPress={() => {
              Alert.alert(
                'Report Security Issue',
                'Report any suspicious activity or security concerns.',
                [
                  { text: 'Report Now', onPress: () => console.log('Opening security report form') },
                  { text: 'Cancel' }
                ]
              );
            }}
            style={[{ flex: 1, marginLeft: 8, backgroundColor: colors.warning }]}
          />
        </View>
      </View>
    </ScrollView>
  );
}
