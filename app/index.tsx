
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import * as Contacts from 'expo-contacts';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleBottomSheet from '../components/BottomSheet';
import Button from '../components/Button';
import SOSButton from '../components/SOSButton';
import QuickActions from '../components/QuickActions';
import ReminderCard from '../components/ReminderCard';
import HealthDashboard from '../components/HealthDashboard';
import SafetyMonitor from '../components/SafetyMonitor';
import AIAssistant from '../components/AIAssistant';
import EntertainmentHub from '../components/EntertainmentHub';
import SocialConnector from '../components/SocialConnector';
import DigitalSecurity from '../components/DigitalSecurity';
import ExtraServices from '../components/ExtraServices';
import FeatureSummary from '../components/FeatureSummary';

interface Reminder {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  type: 'medication' | 'task';
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

export default function SafeCompanionHome() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isRemindersVisible, setIsRemindersVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'health' | 'safety' | 'ai' | 'entertainment' | 'social' | 'security' | 'services' | 'features'>('home');
  const [healthData, setHealthData] = useState({
    bloodPressure: { systolic: 120, diastolic: 80 },
    heartRate: 72,
    steps: 3500,
    hydration: 6,
    sleep: 7.5,
    mood: 'good' as 'excellent' | 'good' | 'fair' | 'poor'
  });
  const [safetyStatus, setSafetyStatus] = useState({
    fallDetection: true,
    homeSecure: true,
    batteryLevel: 85,
    lastActivity: new Date(),
    inSafeZone: true
  });

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    console.log('Initializing SafeCompanion app...');
    await requestPermissions();
    await loadStoredData();
    await getCurrentLocation();
  };

  const requestPermissions = async () => {
    try {
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        Alert.alert('Permission Required', 'Location permission is needed for emergency services.');
      }

      const { status: contactsStatus } = await Contacts.requestPermissionsAsync();
      if (contactsStatus !== 'granted') {
        Alert.alert('Permission Required', 'Contacts permission is needed to set emergency contacts.');
      }
    } catch (error) {
      console.log('Error requesting permissions:', error);
    }
  };

  const loadStoredData = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem('reminders');
      const storedContacts = await AsyncStorage.getItem('emergencyContacts');
      
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      } else {
        // Set default reminders
        const defaultReminders: Reminder[] = [
          {
            id: '1',
            title: 'Take morning medication',
            time: '08:00',
            completed: false,
            type: 'medication'
          },
          {
            id: '2',
            title: 'Check blood pressure',
            time: '14:00',
            completed: false,
            type: 'task'
          },
          {
            id: '3',
            title: 'Evening medication',
            time: '20:00',
            completed: false,
            type: 'medication'
          }
        ];
        setReminders(defaultReminders);
        await AsyncStorage.setItem('reminders', JSON.stringify(defaultReminders));
      }

      if (storedContacts) {
        setEmergencyContacts(JSON.parse(storedContacts));
      } else {
        // Set default emergency contact
        const defaultContacts: EmergencyContact[] = [
          {
            id: '1',
            name: 'Family Member',
            phone: '911'
          }
        ];
        setEmergencyContacts(defaultContacts);
        await AsyncStorage.setItem('emergencyContacts', JSON.stringify(defaultContacts));
      }
    } catch (error) {
      console.log('Error loading stored data:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log('Current location:', currentLocation);
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const sendSOSAlert = async () => {
    try {
      await getCurrentLocation();
      
      const locationText = location 
        ? `Location: https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`
        : 'Location: Unable to determine location';
      
      const message = `🚨 EMERGENCY ALERT 🚨\n\nI need immediate assistance!\n\n${locationText}\n\nSent from SafeCompanion`;
      
      for (const contact of emergencyContacts) {
        if (contact.phone && contact.phone !== '911') {
          const isAvailable = await SMS.isAvailableAsync();
          if (isAvailable) {
            await SMS.sendSMSAsync([contact.phone], message);
            console.log(`Emergency SMS sent to ${contact.name}: ${contact.phone}`);
          }
        }
      }
      
      Alert.alert('Emergency Alert Sent', 'Your emergency contacts have been notified.');
    } catch (error) {
      console.log('Error sending SOS alert:', error);
      Alert.alert('Error', 'Failed to send emergency alert. Please try again.');
    }
  };

  const handleCallEmergency = async () => {
    const primaryContact = emergencyContacts[0];
    if (primaryContact) {
      Alert.alert(
        'Call Emergency Contact',
        `Call ${primaryContact.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Call', 
            onPress: () => {
              console.log(`Calling ${primaryContact.name}: ${primaryContact.phone}`);
              // In a real app, this would use Linking.openURL(`tel:${primaryContact.phone}`)
              Alert.alert('Calling...', `Calling ${primaryContact.name}`);
            }
          }
        ]
      );
    }
  };

  const toggleReminderComplete = async (reminderId: string) => {
    const updatedReminders = reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    );
    setReminders(updatedReminders);
    await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
    console.log(`Reminder ${reminderId} toggled`);
  };

  const getTodaysReminders = () => {
    return reminders.filter(reminder => !reminder.completed);
  };

  const quickActions = [
    {
      icon: 'call' as keyof typeof Ionicons.glyphMap,
      title: 'Call Family',
      onPress: handleCallEmergency,
    },
    {
      icon: 'notifications' as keyof typeof Ionicons.glyphMap,
      title: 'Reminders',
      onPress: () => setIsRemindersVisible(true),
      badge: getTodaysReminders().length,
    },
    {
      icon: 'medical' as keyof typeof Ionicons.glyphMap,
      title: 'Health',
      onPress: () => setActiveTab('health'),
    },
    {
      icon: 'shield-checkmark' as keyof typeof Ionicons.glyphMap,
      title: 'Safety',
      onPress: () => setActiveTab('safety'),
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'health':
        return (
          <HealthDashboard
            healthData={healthData}
            onUpdateHealth={(data) => setHealthData(prev => ({ ...prev, ...data }))}
          />
        );
      case 'safety':
        return (
          <SafetyMonitor
            safetyStatus={safetyStatus}
            onUpdateSafety={(status) => setSafetyStatus(prev => ({ ...prev, ...status }))}
          />
        );
      case 'ai':
        return <AIAssistant onVoiceCommand={onVoiceCommand} />;
      case 'entertainment':
        return <EntertainmentHub />;
      case 'social':
        return <SocialConnector />;
      case 'security':
        return <DigitalSecurity />;
      case 'services':
        return <ExtraServices />;
      case 'features':
        return <FeatureSummary />;
      default:
        return (
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
            <View style={commonStyles.content}>
              {/* Header */}
              <View style={{ alignItems: 'center', marginBottom: 40 }}>
                <Text style={commonStyles.title}>SafeCompanion</Text>
                <Text style={commonStyles.textSecondary}>Your comprehensive safety and wellness partner</Text>
              </View>

              {/* SOS Button - Most prominent */}
              <SOSButton onPress={sendSOSAlert} />

              {/* Quick Actions */}
              <QuickActions actions={quickActions} />

              {/* Today's Reminders Preview */}
              {getTodaysReminders().length > 0 && (
                <View style={[commonStyles.card, { marginTop: 20 }]}>
                  <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
                    Today&apos;s Reminders
                  </Text>
                  {getTodaysReminders().slice(0, 2).map((reminder) => (
                    <ReminderCard
                      key={reminder.id}
                      reminder={reminder}
                      onToggle={toggleReminderComplete}
                    />
                  ))}
                  {getTodaysReminders().length > 2 && (
                    <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
                      +{getTodaysReminders().length - 2} more reminders
                    </Text>
                  )}
                </View>
              )}

              {/* Feature Categories */}
              <View style={[commonStyles.card, { marginTop: 20 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <Text style={[commonStyles.subtitle, { flex: 1 }]}>
                    All Features (50+ Tools)
                  </Text>
                  <TouchableOpacity onPress={() => setActiveTab('features')}>
                    <Text style={[commonStyles.textSecondary, { color: colors.primary, fontSize: 14 }]}>
                      View All →
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={[commonStyles.textSecondary, { marginBottom: 16, textAlign: 'center' }]}>
                  Comprehensive safety, health, and wellness platform
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    style={[commonStyles.card, { width: '48%', marginBottom: 12, backgroundColor: colors.backgroundAlt }]}
                    onPress={() => setActiveTab('ai')}
                  >
                    <Ionicons name="chatbubbles" size={28} color={colors.primary} style={{ alignSelf: 'center', marginBottom: 8 }} />
                    <Text style={[commonStyles.text, { fontSize: 15 }]}>AI Assistant</Text>
                    <Text style={[commonStyles.textSecondary, { fontSize: 11 }]}>Voice help & chat</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[commonStyles.card, { width: '48%', marginBottom: 12, backgroundColor: colors.backgroundAlt }]}
                    onPress={() => setActiveTab('entertainment')}
                  >
                    <Ionicons name="game-controller" size={28} color={colors.primary} style={{ alignSelf: 'center', marginBottom: 8 }} />
                    <Text style={[commonStyles.text, { fontSize: 15 }]}>Entertainment</Text>
                    <Text style={[commonStyles.textSecondary, { fontSize: 11 }]}>Games & music</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[commonStyles.card, { width: '48%', marginBottom: 12, backgroundColor: colors.backgroundAlt }]}
                    onPress={() => setActiveTab('social')}
                  >
                    <Ionicons name="people" size={28} color={colors.primary} style={{ alignSelf: 'center', marginBottom: 8 }} />
                    <Text style={[commonStyles.text, { fontSize: 15 }]}>Social</Text>
                    <Text style={[commonStyles.textSecondary, { fontSize: 11 }]}>Family & friends</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[commonStyles.card, { width: '48%', marginBottom: 12, backgroundColor: colors.backgroundAlt }]}
                    onPress={() => setActiveTab('security')}
                  >
                    <Ionicons name="shield-checkmark" size={28} color={colors.primary} style={{ alignSelf: 'center', marginBottom: 8 }} />
                    <Text style={[commonStyles.text, { fontSize: 15 }]}>Security</Text>
                    <Text style={[commonStyles.textSecondary, { fontSize: 11 }]}>Digital safety</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[commonStyles.card, { width: '48%', marginBottom: 12, backgroundColor: colors.backgroundAlt }]}
                    onPress={() => setActiveTab('services')}
                  >
                    <Ionicons name="storefront" size={28} color={colors.primary} style={{ alignSelf: 'center', marginBottom: 8 }} />
                    <Text style={[commonStyles.text, { fontSize: 15 }]}>Services</Text>
                    <Text style={[commonStyles.textSecondary, { fontSize: 11 }]}>Home & delivery</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[commonStyles.card, { width: '48%', marginBottom: 12, backgroundColor: colors.backgroundAlt }]}
                    onPress={() => setIsSettingsVisible(true)}
                  >
                    <Ionicons name="settings" size={28} color={colors.primary} style={{ alignSelf: 'center', marginBottom: 8 }} />
                    <Text style={[commonStyles.text, { fontSize: 15 }]}>Settings</Text>
                    <Text style={[commonStyles.textSecondary, { fontSize: 11 }]}>Preferences</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        );
    }
  };

  const onVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    if (command.toLowerCase().includes('help') || command.toLowerCase().includes('emergency')) {
      sendSOSAlert();
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Navigation Header */}
      {activeTab !== 'home' && (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.background
        }}>
          <TouchableOpacity
            onPress={() => setActiveTab('home')}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.subtitle, { flex: 1, textAlign: 'left' }]}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </Text>
        </View>
      )}

      {/* Main Content */}
      {renderContent()}

      {/* Settings Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      >
        <ScrollView style={{ maxHeight: 500 }}>
          <View style={{ padding: 20 }}>
            <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>Settings & Configuration</Text>
            
            {/* Core Settings */}
            <Text style={[commonStyles.text, { marginBottom: 12, textAlign: 'left', fontWeight: 'bold' }]}>
              Core Settings
            </Text>
            
            <TouchableOpacity style={[commonStyles.card, { marginBottom: 12 }]}>
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Ionicons name="people" size={24} color={colors.primary} />
                  <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                    Emergency Contacts
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[commonStyles.card, { marginBottom: 12 }]}>
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Ionicons name="location" size={24} color={colors.primary} />
                  <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                    Safe Zone Settings
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[commonStyles.card, { marginBottom: 12 }]}>
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Ionicons name="notifications" size={24} color={colors.primary} />
                  <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                    Notification Settings
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[commonStyles.card, { marginBottom: 20 }]}>
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Ionicons name="medical" size={24} color={colors.primary} />
                  <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                    Medical Information
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            {/* Feature Access */}
            <Text style={[commonStyles.text, { marginBottom: 12, textAlign: 'left', fontWeight: 'bold' }]}>
              Feature Categories
            </Text>
            
            <TouchableOpacity 
              style={[commonStyles.card, { marginBottom: 8 }]}
              onPress={() => {
                setIsSettingsVisible(false);
                setActiveTab('health');
              }}
            >
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Ionicons name="heart" size={24} color={colors.primary} />
                  <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                    Health & Wellness (10 features)
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.card, { marginBottom: 8 }]}
              onPress={() => {
                setIsSettingsVisible(false);
                setActiveTab('safety');
              }}
            >
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Ionicons name="shield" size={24} color={colors.primary} />
                  <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                    Safety & Emergency (10 features)
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.card, { marginBottom: 8 }]}
              onPress={() => {
                setIsSettingsVisible(false);
                setActiveTab('ai');
              }}
            >
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Ionicons name="brain" size={24} color={colors.primary} />
                  <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                    AI Intelligence (10 features)
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.card, { marginBottom: 8 }]}
              onPress={() => {
                setIsSettingsVisible(false);
                setActiveTab('entertainment');
              }}
            >
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Ionicons name="musical-notes" size={24} color={colors.primary} />
                  <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                    Entertainment & Cognitive (5 features)
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.card, { marginBottom: 8 }]}
              onPress={() => {
                setIsSettingsVisible(false);
                setActiveTab('social');
              }}
            >
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Ionicons name="people-circle" size={24} color={colors.primary} />
                  <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                    Social Connectivity (5 features)
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.card, { marginBottom: 8 }]}
              onPress={() => {
                setIsSettingsVisible(false);
                setActiveTab('security');
              }}
            >
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Ionicons name="lock-closed" size={24} color={colors.primary} />
                  <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                    Digital Security (5 features)
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.card, { marginBottom: 20 }]}
              onPress={() => {
                setIsSettingsVisible(false);
                setActiveTab('services');
              }}
            >
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Ionicons name="storefront" size={24} color={colors.primary} />
                  <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                    Extra Services (5 features)
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            {/* App Info */}
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt, alignItems: 'center' }]}>
              <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: 'bold' }]}>
                SafeCompanion Pro
              </Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 8 }]}>
                50+ Features for Complete Senior Care
              </Text>
              <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                Version 2.0 • All features active
              </Text>
            </View>
          </View>
        </ScrollView>
      </SimpleBottomSheet>

      {/* Reminders Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isRemindersVisible}
        onClose={() => setIsRemindersVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>Today&apos;s Reminders</Text>
          
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onToggle={toggleReminderComplete}
              showType={true}
            />
          ))}

          <View style={{ marginTop: 20 }}>
            <Button
              text="Add New Reminder"
              onPress={() => {
                console.log('Add new reminder pressed');
                Alert.alert('Coming Soon', 'Add reminder functionality will be available soon.');
              }}
              style={buttonStyles.primaryButton}
            />
          </View>
        </View>
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
