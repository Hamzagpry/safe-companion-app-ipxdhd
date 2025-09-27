
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import Button from './Button';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  available: boolean;
  price?: string;
  rating?: number;
}

export default function ExtraServices() {
  const [activeServices, setActiveServices] = useState<string[]>([]);

  const pharmacyServices: Service[] = [
    {
      id: 'prescription',
      name: 'Prescription Delivery',
      description: 'Get your medications delivered to your door',
      icon: 'medical',
      available: true,
      price: 'Free delivery',
      rating: 4.8
    },
    {
      id: 'consultation',
      name: 'Pharmacy Consultation',
      description: 'Speak with a pharmacist about your medications',
      icon: 'chatbubbles',
      available: true,
      price: '$15/session',
      rating: 4.9
    },
    {
      id: 'refill',
      name: 'Auto Refill Service',
      description: 'Automatically refill your prescriptions',
      icon: 'refresh',
      available: true,
      price: 'Free',
      rating: 4.7
    }
  ];

  const homeServices: Service[] = [
    {
      id: 'cleaning',
      name: 'House Cleaning',
      description: 'Professional cleaning service for seniors',
      icon: 'home',
      available: true,
      price: '$80-120',
      rating: 4.6
    },
    {
      id: 'meals',
      name: 'Meal Delivery',
      description: 'Healthy, senior-friendly meals delivered daily',
      icon: 'restaurant',
      available: true,
      price: '$12-18/meal',
      rating: 4.5
    },
    {
      id: 'grocery',
      name: 'Grocery Shopping',
      description: 'Personal shopper for your grocery needs',
      icon: 'bag',
      available: true,
      price: '$25 + groceries',
      rating: 4.4
    },
    {
      id: 'maintenance',
      name: 'Home Maintenance',
      description: 'Minor repairs and maintenance tasks',
      icon: 'construct',
      available: true,
      price: '$50-100/hour',
      rating: 4.3
    }
  ];

  const utilityServices: Service[] = [
    {
      id: 'translation',
      name: 'Voice Translation',
      description: 'Real-time translation for phone calls and conversations',
      icon: 'language',
      available: true,
      price: 'Free',
      rating: 4.2
    },
    {
      id: 'bills',
      name: 'Bill Payment Reminders',
      description: 'Never miss a utility or bill payment',
      icon: 'card',
      available: true,
      price: 'Free',
      rating: 4.8
    },
    {
      id: 'transport',
      name: 'Senior Transportation',
      description: 'Safe, reliable transportation for appointments',
      icon: 'car',
      available: true,
      price: '$15-25/trip',
      rating: 4.6
    },
    {
      id: 'tech',
      name: 'Tech Support',
      description: 'Help with devices and technology issues',
      icon: 'laptop',
      available: true,
      price: '$30/session',
      rating: 4.7
    }
  ];

  const handleServiceRequest = (service: Service) => {
    Alert.alert(
      service.name,
      `${service.description}\n\nPrice: ${service.price}\nRating: ${service.rating}/5.0`,
      [
        { text: 'Request Service', onPress: () => requestService(service) },
        { text: 'Learn More', onPress: () => console.log(`Learning more about ${service.id}`) },
        { text: 'Cancel' }
      ]
    );
  };

  const requestService = (service: Service) => {
    setActiveServices(prev => [...prev, service.id]);
    Alert.alert(
      'Service Requested',
      `Your request for ${service.name} has been submitted. You will be contacted within 2 hours to confirm details.`,
      [{ text: 'OK' }]
    );
    console.log(`Requesting service: ${service.id}`);
  };

  const handleEmergencyNumbers = () => {
    Alert.alert(
      'Emergency Numbers',
      'Local Emergency Contacts:\n\n• Police: 911\n• Fire Department: 911\n• Ambulance: 911\n• Poison Control: 1-800-222-1222\n• Local Hospital: (555) 123-4567',
      [
        { text: 'Edit Numbers', onPress: () => console.log('Opening emergency numbers editor') },
        { text: 'OK' }
      ]
    );
  };

  const handleBillReminders = () => {
    Alert.alert(
      'Bill Payment Setup',
      'Set up automatic reminders for your utility bills, rent, and other recurring payments.',
      [
        { text: 'Add Bills', onPress: () => console.log('Opening bill reminder setup') },
        { text: 'View Schedule', onPress: () => console.log('Opening bill schedule') },
        { text: 'Cancel' }
      ]
    );
  };

  const renderServiceCard = (service: Service, isActive: boolean = false) => (
    <TouchableOpacity
      key={service.id}
      style={[
        commonStyles.card,
        {
          marginBottom: 12,
          backgroundColor: isActive ? colors.primary : colors.backgroundAlt,
          borderWidth: 2,
          borderColor: isActive ? colors.primary : colors.border
        }
      ]}
      onPress={() => handleServiceRequest(service)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Ionicons 
          name={service.icon} 
          size={24} 
          color={isActive ? colors.background : colors.primary} 
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={[
            commonStyles.text, 
            { 
              textAlign: 'left', 
              marginBottom: 4,
              color: isActive ? colors.background : colors.text
            }
          ]}>
            {service.name}
          </Text>
          <Text style={[
            commonStyles.textSecondary, 
            { 
              textAlign: 'left', 
              fontSize: 14,
              color: isActive ? colors.background : colors.textSecondary
            }
          ]}>
            {service.description}
          </Text>
        </View>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={[
          commonStyles.textSecondary, 
          { 
            fontSize: 14,
            color: isActive ? colors.background : colors.textSecondary
          }
        ]}>
          {service.price}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons 
            name="star" 
            size={14} 
            color={isActive ? colors.background : colors.accent} 
          />
          <Text style={[
            commonStyles.textSecondary, 
            { 
              fontSize: 12, 
              marginLeft: 4,
              color: isActive ? colors.background : colors.textSecondary
            }
          ]}>
            {service.rating}
          </Text>
        </View>
      </View>
      
      {isActive && (
        <View style={{ marginTop: 8, alignItems: 'center' }}>
          <Text style={[commonStyles.textSecondary, { color: colors.background, fontSize: 12 }]}>
            Service Requested
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.title, { marginBottom: 20 }]}>Extra Services</Text>
        
        {/* Pharmacy Services */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Pharmacy Services</Text>
          <Text style={[commonStyles.textSecondary, { marginBottom: 16, textAlign: 'center' }]}>
            Medication delivery and pharmacy support
          </Text>
          
          {pharmacyServices.map(service => 
            renderServiceCard(service, activeServices.includes(service.id))
          )}
        </View>

        {/* Home Services */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Home Services</Text>
          <Text style={[commonStyles.textSecondary, { marginBottom: 16, textAlign: 'center' }]}>
            Professional services for your home and daily needs
          </Text>
          
          {homeServices.map(service => 
            renderServiceCard(service, activeServices.includes(service.id))
          )}
        </View>

        {/* Utility Services */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Utility Services</Text>
          <Text style={[commonStyles.textSecondary, { marginBottom: 16, textAlign: 'center' }]}>
            Essential services and support tools
          </Text>
          
          {utilityServices.map(service => 
            renderServiceCard(service, activeServices.includes(service.id))
          )}
        </View>

        {/* Quick Access Tools */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Quick Tools</Text>
          
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
            onPress={handleBillReminders}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="calendar" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12, textAlign: 'left' }]}>
                Bill Payment Reminders
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Active Services Summary */}
        {activeServices.length > 0 && (
          <View style={[commonStyles.card, { backgroundColor: colors.success, opacity: 0.1 }]}>
            <Text style={[commonStyles.subtitle, { color: colors.success, marginBottom: 12 }]}>
              Active Services
            </Text>
            <Text style={[commonStyles.textSecondary, { color: colors.success, textAlign: 'center' }]}>
              You have {activeServices.length} service{activeServices.length > 1 ? 's' : ''} requested. 
              You will be contacted to confirm details.
            </Text>
          </View>
        )}

        {/* Service Request Button */}
        <View style={{ marginTop: 20 }}>
          <Button
            text="Request Custom Service"
            onPress={() => {
              Alert.alert(
                'Custom Service Request',
                'Describe the service you need and we\'ll try to connect you with a provider.',
                [
                  { text: 'Submit Request', onPress: () => console.log('Opening custom service form') },
                  { text: 'Cancel' }
                ]
              );
            }}
            style={{ backgroundColor: colors.accent, width: '100%' }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
