
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';

interface SOSButtonProps {
  onPress: () => void;
}

export default function SOSButton({ onPress }: SOSButtonProps) {
  const handlePress = () => {
    Alert.alert(
      'Emergency Alert',
      'Are you sure you want to send an emergency alert?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send Alert',
          style: 'destructive',
          onPress: onPress,
        },
      ]
    );
  };

  return (
    <View style={[commonStyles.card, { backgroundColor: colors.danger, marginBottom: 30 }]}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          paddingVertical: 20,
        }}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 50,
          padding: 16,
          marginBottom: 12,
        }}>
          <Ionicons name="warning" size={60} color="white" />
        </View>
        <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 8 }]}>
          EMERGENCY
        </Text>
        <Text style={[commonStyles.text, { color: 'white', fontSize: 18, opacity: 0.9 }]}>
          Tap for immediate help
        </Text>
      </TouchableOpacity>
    </View>
  );
}
