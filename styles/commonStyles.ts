
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#2E7D32',      // Calming green
  secondary: '#4CAF50',    // Lighter green
  accent: '#FF9800',       // Orange for important elements like SOS
  background: '#FFFFFF',   // White background for light theme
  backgroundAlt: '#F5F5F5', // Light gray for cards
  text: '#212121',         // Dark text for high contrast
  textSecondary: '#757575', // Gray text for secondary info
  success: '#4CAF50',      // Green for success states
  warning: '#FF9800',      // Orange for warnings
  danger: '#F44336',       // Red for emergency/SOS
  card: '#FFFFFF',         // White cards
  border: '#E0E0E0',       // Light border
  shadow: 'rgba(0, 0, 0, 0.1)', // Subtle shadow
};

export const buttonStyles = StyleSheet.create({
  sosButton: {
    backgroundColor: colors.danger,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 50,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 2,
    borderColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 32,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 28,
    textAlign: 'center',
  },
  textSecondary: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    width: '100%',
    boxShadow: `0px 4px 8px ${colors.shadow}`,
    elevation: 4,
  },
  icon: {
    width: 80,
    height: 80,
    tintColor: colors.primary,
  },
  sosIcon: {
    width: 100,
    height: 100,
    tintColor: colors.danger,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
});
