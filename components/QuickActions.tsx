
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';

interface QuickAction {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  badge?: number;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <View style={commonStyles.row}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={[
            commonStyles.card, 
            { 
              flex: 1, 
              marginRight: index < actions.length - 1 ? 10 : 0,
              marginLeft: index > 0 ? 10 : 0,
            }
          ]}
          onPress={action.onPress}
          activeOpacity={0.7}
        >
          <View style={{ alignItems: 'center', position: 'relative' }}>
            <Ionicons name={action.icon} size={40} color={colors.primary} />
            <Text style={[commonStyles.text, { fontSize: 16, marginTop: 8 }]}>
              {action.title}
            </Text>
            {action.badge && action.badge > 0 && (
              <View style={{
                position: 'absolute',
                top: -4,
                right: -4,
                backgroundColor: colors.accent,
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 2,
                minWidth: 24,
                alignItems: 'center',
              }}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: 12, 
                  fontWeight: 'bold',
                  lineHeight: 16,
                }}>
                  {action.badge}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
