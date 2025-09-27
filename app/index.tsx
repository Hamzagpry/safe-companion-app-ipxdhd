
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleBottomSheet from '../components/BottomSheet';
import Button from '../components/Button';
import SOSButton from '../components/SOSButton';
import QuickActions from '../components/QuickActions';
import ReminderCard from '../components/ReminderCard';

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
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <View style={commonStyles.content}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Text style={commonStyles.title}>SafeCompanion</Text>
            <Text style={commonStyles.textSecondary}>Your safety and wellness partner</Text>
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

          {/* Settings Button */}
          <View style={[commonStyles.buttonContainer, { marginTop: 30 }]}>
            <Button
              text="Settings"
              onPress={() => setIsSettingsVisible(true)}
              style={buttonStyles.secondaryButton}
              textStyle={{ color: colors.primary }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Settings Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>Settings</Text>
          
          <View style={[commonStyles.card, { marginBottom: 16 }]}>
            <View style={commonStyles.row}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Ionicons name="people" size={24} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                  Emergency Contacts
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          </View>

          <View style={[commonStyles.card, { marginBottom: 16 }]}>
            <View style={commonStyles.row}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Ionicons name="location" size={24} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                  Safe Zone Settings
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          </View>

          <View style={[commonStyles.card, { marginBottom: 16 }]}>
            <View style={commonStyles.row}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Ionicons name="notifications" size={24} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                  Notification Settings
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          </View>

          <View style={[commonStyles.card, { marginBottom: 16 }]}>
            <View style={commonStyles.row}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Ionicons name="medical" size={24} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                  Medical Information
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          </View>
        </View>
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
