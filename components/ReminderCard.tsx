
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';

interface Reminder {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  type: 'medication' | 'task';
}

interface ReminderCardProps {
  reminder: Reminder;
  onToggle: (id: string) => void;
  showType?: boolean;
}

export default function ReminderCard({ reminder, onToggle, showType = false }: ReminderCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return 'medical';
      case 'task':
        return 'checkmark-circle-outline';
      default:
        return 'notifications-outline';
    }
  };

  return (
    <TouchableOpacity
      style={[commonStyles.card, { marginBottom: 12 }]}
      onPress={() => onToggle(reminder.id)}
      activeOpacity={0.7}
    >
      <View style={commonStyles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Ionicons 
            name={reminder.completed ? "checkmark-circle" : "ellipse-outline"} 
            size={28} 
            color={reminder.completed ? colors.success : colors.textSecondary} 
          />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[
              commonStyles.text, 
              { 
                fontSize: 18, 
                textAlign: 'left',
                textDecorationLine: reminder.completed ? 'line-through' : 'none',
                color: reminder.completed ? colors.textSecondary : colors.text
              }
            ]}>
              {reminder.title}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Text style={[commonStyles.textSecondary, { fontSize: 16 }]}>
                {reminder.time}
              </Text>
              {showType && (
                <>
                  <Text style={[commonStyles.textSecondary, { fontSize: 16, marginHorizontal: 8 }]}>
                    •
                  </Text>
                  <Ionicons 
                    name={getTypeIcon(reminder.type)} 
                    size={16} 
                    color={colors.textSecondary} 
                    style={{ marginRight: 4 }}
                  />
                  <Text style={[commonStyles.textSecondary, { fontSize: 16, textTransform: 'capitalize' }]}>
                    {reminder.type}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
        {reminder.completed && (
          <Ionicons name="checkmark" size={20} color={colors.success} />
        )}
      </View>
    </TouchableOpacity>
  );
}
