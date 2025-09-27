
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import Button from './Button';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  lastCall?: Date;
  photo?: string;
}

interface SocialEvent {
  id: string;
  title: string;
  date: Date;
  type: 'birthday' | 'anniversary' | 'holiday' | 'appointment';
  person?: string;
}

export default function SocialConnector() {
  const [familyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      relationship: 'Daughter',
      phone: '+1234567890',
      lastCall: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Michael Johnson',
      relationship: 'Son',
      phone: '+1234567891',
      lastCall: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      relationship: 'Granddaughter',
      phone: '+1234567892',
      lastCall: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  const [upcomingEvents] = useState<SocialEvent[]>([
    {
      id: '1',
      title: 'Sarah\'s Birthday',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      type: 'birthday',
      person: 'Sarah Johnson'
    },
    {
      id: '2',
      title: 'Wedding Anniversary',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      type: 'anniversary'
    },
    {
      id: '3',
      title: 'Doctor Appointment',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      type: 'appointment'
    }
  ]);

  const [supportGroups] = useState([
    {
      id: '1',
      name: 'Senior Wellness Circle',
      description: 'Weekly discussions about health and wellness',
      members: 12,
      nextMeeting: 'Thursday 2:00 PM',
      icon: 'medical' as keyof typeof Ionicons.glyphMap
    },
    {
      id: '2',
      name: 'Book Lovers Club',
      description: 'Monthly book discussions and recommendations',
      members: 8,
      nextMeeting: 'Saturday 10:00 AM',
      icon: 'library' as keyof typeof Ionicons.glyphMap
    },
    {
      id: '3',
      name: 'Gardening Enthusiasts',
      description: 'Share gardening tips and seasonal advice',
      members: 15,
      nextMeeting: 'Monday 3:00 PM',
      icon: 'leaf' as keyof typeof Ionicons.glyphMap
    },
    {
      id: '4',
      name: 'Memory Lane',
      description: 'Share stories and memories from the past',
      members: 20,
      nextMeeting: 'Wednesday 1:00 PM',
      icon: 'time' as keyof typeof Ionicons.glyphMap
    }
  ]);

  const handleScheduledCall = (member: FamilyMember) => {
    Alert.alert(
      `Call ${member.name}`,
      `Would you like to call ${member.name} (${member.relationship}) now or schedule a call?`,
      [
        { text: 'Call Now', onPress: () => initiateCall(member) },
        { text: 'Schedule Call', onPress: () => scheduleCall(member) },
        { text: 'Cancel' }
      ]
    );
  };

  const initiateCall = (member: FamilyMember) => {
    console.log(`Calling ${member.name}: ${member.phone}`);
    Alert.alert('Calling...', `Connecting to ${member.name}`);
  };

  const scheduleCall = (member: FamilyMember) => {
    Alert.alert(
      'Schedule Call',
      `When would you like to schedule a call with ${member.name}?`,
      [
        { text: 'Today Evening', onPress: () => console.log('Scheduled for today evening') },
        { text: 'Tomorrow', onPress: () => console.log('Scheduled for tomorrow') },
        { text: 'This Weekend', onPress: () => console.log('Scheduled for weekend') },
        { text: 'Cancel' }
      ]
    );
  };

  const handlePhotoSharing = () => {
    Alert.alert(
      'Photo Sharing',
      'Share photos with your family. They will automatically appear on their devices.',
      [
        { text: 'Take Photo', onPress: () => console.log('Opening camera') },
        { text: 'Choose from Gallery', onPress: () => console.log('Opening gallery') },
        { text: 'Cancel' }
      ]
    );
  };

  const handleVoiceMessage = (member: FamilyMember) => {
    Alert.alert(
      'Voice Message',
      `Record a voice message for ${member.name}. They will receive it immediately.`,
      [
        { text: 'Start Recording', onPress: () => console.log(`Recording voice message for ${member.name}`) },
        { text: 'Cancel' }
      ]
    );
  };

  const handleJoinSupportGroup = (groupId: string) => {
    const group = supportGroups.find(g => g.id === groupId);
    Alert.alert(
      `Join ${group?.name}`,
      `${group?.description}\n\nNext meeting: ${group?.nextMeeting}\nMembers: ${group?.members}`,
      [
        { text: 'Join Group', onPress: () => console.log(`Joining group: ${groupId}`) },
        { text: 'Learn More', onPress: () => console.log(`Learning more about group: ${groupId}`) },
        { text: 'Cancel' }
      ]
    );
  };

  const getDaysAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'birthday': return 'gift' as keyof typeof Ionicons.glyphMap;
      case 'anniversary': return 'heart' as keyof typeof Ionicons.glyphMap;
      case 'holiday': return 'star' as keyof typeof Ionicons.glyphMap;
      case 'appointment': return 'calendar' as keyof typeof Ionicons.glyphMap;
      default: return 'calendar' as keyof typeof Ionicons.glyphMap;
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.title, { marginBottom: 20 }]}>Social Connector</Text>
        
        {/* Family Contacts */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Family & Friends</Text>
          
          {familyMembers.map((member) => (
            <View
              key={member.id}
              style={[
                commonStyles.row,
                {
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  alignItems: 'center'
                }
              ]}
            >
              <Image
                source={{ uri: member.photo }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 12
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { textAlign: 'left', marginBottom: 4 }]}>
                  {member.name}
                </Text>
                <Text style={[commonStyles.textSecondary, { textAlign: 'left', fontSize: 14 }]}>
                  {member.relationship}
                </Text>
                {member.lastCall && (
                  <Text style={[commonStyles.textSecondary, { textAlign: 'left', fontSize: 12 }]}>
                    Last call: {getDaysAgo(member.lastCall)} days ago
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => handleVoiceMessage(member)}
                  style={{ marginRight: 12 }}
                >
                  <Ionicons name="mic" size={24} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleScheduledCall(member)}>
                  <Ionicons name="call" size={24} color={colors.success} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          <View style={{ marginTop: 16 }}>
            <Button
              text="Share Photos"
              onPress={handlePhotoSharing}
              style={{ backgroundColor: colors.accent, width: '100%' }}
            />
          </View>
        </View>

        {/* Upcoming Events & Reminders */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Upcoming Events</Text>
          
          {upcomingEvents.map((event, index) => (
            <View
              key={event.id}
              style={[
                commonStyles.row,
                {
                  paddingVertical: 12,
                  borderBottomWidth: index < upcomingEvents.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border
                }
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Ionicons name={getEventIcon(event.type)} size={24} color={colors.primary} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={[commonStyles.text, { textAlign: 'left', marginBottom: 4 }]}>
                    {event.title}
                  </Text>
                  <Text style={[commonStyles.textSecondary, { textAlign: 'left', fontSize: 14 }]}>
                    In {getDaysUntil(event.date)} days
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="notifications" size={20} color={colors.accent} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Peer Support Groups */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Support Groups</Text>
          <Text style={[commonStyles.textSecondary, { marginBottom: 16, textAlign: 'center' }]}>
            Connect with peers who share your interests
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {supportGroups.map((group) => (
              <TouchableOpacity
                key={group.id}
                style={[
                  commonStyles.card,
                  {
                    width: '48%',
                    marginBottom: 12,
                    backgroundColor: colors.backgroundAlt
                  }
                ]}
                onPress={() => handleJoinSupportGroup(group.id)}
              >
                <Ionicons 
                  name={group.icon} 
                  size={28} 
                  color={colors.primary}
                  style={{ alignSelf: 'center', marginBottom: 8 }}
                />
                <Text style={[commonStyles.text, { fontSize: 16, marginBottom: 4 }]}>
                  {group.name}
                </Text>
                <Text style={[commonStyles.textSecondary, { fontSize: 12, textAlign: 'center', marginBottom: 8 }]}>
                  {group.members} members
                </Text>
                <Text style={[commonStyles.textSecondary, { fontSize: 11, textAlign: 'center' }]}>
                  {group.nextMeeting}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            text="Auto Call Family"
            onPress={() => {
              Alert.alert(
                'Auto Family Call',
                'Schedule automatic calls to family members at set times.',
                [
                  { text: 'Set Schedule', onPress: () => console.log('Setting auto call schedule') },
                  { text: 'Cancel' }
                ]
              );
            }}
            style={[{ flex: 1, marginRight: 8, backgroundColor: colors.primary }]}
          />
          <Button
            text="Voice Exchange"
            onPress={() => {
              Alert.alert(
                'Voice Message Exchange',
                'Send and receive voice messages with family and friends.',
                [
                  { text: 'Open Messages', onPress: () => console.log('Opening voice messages') },
                  { text: 'Cancel' }
                ]
              );
            }}
            style={[{ flex: 1, marginLeft: 8, backgroundColor: colors.accent }]}
          />
        </View>
      </View>
    </ScrollView>
  );
}
