import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/Button';

const menuItems = [
  { id: 1, label: 'My Tickets', icon: '🎫', screen: 'MyTickets' },
  { id: 2, label: 'Payment Methods', icon: '💳', screen: 'PaymentMethods' },
  { id: 3, label: 'Offers & Coupons', icon: '🎁', screen: 'Offers' },
  { id: 4, label: 'My Favorites', icon: '❤️', screen: 'Favorites' },
  { id: 5, label: 'Settings', icon: '⚙️', screen: 'Settings' },
];

export const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileDetail}>+91 98765 43210</Text>
            <Text style={styles.profileDetail}>john.doe@email.com</Text>
          </View>
          <Button
            title="Edit Profile"
            variant="secondary"
            size="small"
            style={styles.editButton}
          />
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹5,400</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Rewards</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Text style={styles.menuArrow}>{'>'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNav currentRoute="profile" onNavigate={(route) => {
        if (route === 'profile') return;
        navigation.navigate(route === 'home' ? 'Home' : route === 'movies' ? 'Movies' : 'Events');
      }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: spacing.md,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarIcon: {
    fontSize: 40,
  },
  profileInfo: {
    marginBottom: spacing.md,
  },
  profileName: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  profileDetail: {
    ...typography.bodySmall,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.lg,
    margin: spacing.md,
    marginTop: 0,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  menuSection: {
    margin: spacing.md,
    marginTop: 0,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuIcon: {
    fontSize: 24,
  },
  menuLabel: {
    ...typography.body,
    color: colors.text,
  },
  menuArrow: {
    ...typography.h3,
    color: colors.textSecondary,
  },
});

