import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

const offers = [
  {
    id: 1,
    title: 'Weekend Special',
    code: 'WEEKEND100',
    discount: '₹100 off',
    description: 'Get ₹100 off on weekend bookings',
    validUntil: 'Valid until Dec 31, 2024',
  },
  {
    id: 2,
    title: 'First Booking',
    code: 'FIRST50',
    discount: '₹50 off',
    description: 'Get ₹50 off on your first booking',
    validUntil: 'Valid until Dec 31, 2024',
  },
  {
    id: 3,
    title: 'Bank Offer',
    code: 'BANK200',
    discount: '₹200 off',
    description: 'Get ₹200 off with HDFC Bank cards',
    validUntil: 'Valid until Dec 31, 2024',
  },
];

export const OffersScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offers & Coupons</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Special Offers</Text>
          <Text style={styles.bannerSubtitle}>Save more on every booking</Text>
        </View>

        {offers.map((offer) => (
          <View key={offer.id} style={styles.offerCard}>
            <View style={styles.offerHeader}>
              <View style={styles.offerIcon}>
                <Text style={styles.offerIconText}>🎁</Text>
              </View>
              <View style={styles.offerInfo}>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerDescription}>{offer.description}</Text>
              </View>
            </View>
            <View style={styles.offerFooter}>
              <View>
                <Text style={styles.offerCode}>{offer.code}</Text>
                <Text style={styles.offerDiscount}>{offer.discount}</Text>
                <Text style={styles.offerValid}>{offer.validUntil}</Text>
              </View>
              <TouchableOpacity style={styles.copyButton}>
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text,
    marginRight: spacing.md,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bannerTitle: {
    ...typography.h2,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  bannerSubtitle: {
    ...typography.body,
    color: colors.white,
  },
  offerCard: {
    backgroundColor: colors.white,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  offerHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  offerIcon: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  offerIconText: {
    fontSize: 32,
  },
  offerInfo: {
    flex: 1,
  },
  offerTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  offerDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  offerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  offerCode: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  offerDiscount: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  offerValid: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  copyButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  copyButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '600',
  },
});

