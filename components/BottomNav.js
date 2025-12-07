import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, shadows } from '../constants/theme';

const navItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'movies', label: 'Movies', icon: '🎬' },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

export const BottomNav = ({ currentRoute, onNavigate }) => {
  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = currentRoute === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => onNavigate(item.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.icon, isActive && styles.activeIcon]}>
              {item.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    ...shadows.medium,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: spacing.xs / 2,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  activeIcon: {
    opacity: 1,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
});

