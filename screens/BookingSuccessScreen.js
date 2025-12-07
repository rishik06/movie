import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Button } from '../components/Button';

export const BookingSuccessScreen = ({ route, navigation }) => {
  const { amount } = route.params || { amount: 1580 };
  const bookingId = 'BKZWXB8DF';
  const movie = { title: 'The Dark Universe', language: 'English', genre: 'Action/Thriller' };
  const theatre = 'PVR Cinemas - Phoenix Mall';
  const dateTime = 'Dec 9, 1:45 PM';
  const seats = ['D1', 'D2', 'D3', 'D4'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Booking Successful!</Text>
          <Text style={styles.successSubtitle}>
            Your tickets have been booked successfully
          </Text>
        </View>

        <View style={styles.bookingIdCard}>
          <Text style={styles.bookingIdLabel}>Booking ID</Text>
          <Text style={styles.bookingIdValue}>{bookingId}</Text>
        </View>

        <View style={styles.ticketCard}>
          <View style={styles.ticketHeader}>
            <Image
              source={{ uri: 'https://via.placeholder.com/80x120' }}
              style={styles.movieThumbnail}
            />
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.movieDetail}>{movie.language}</Text>
              <Text style={styles.movieDetail}>{movie.genre}</Text>
            </View>
          </View>
          <View style={styles.ticketDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Theatre</Text>
              <Text style={styles.detailValue}>{theatre}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>{dateTime}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Seats</Text>
              <Text style={styles.detailValue}>{seats.join(', ')}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Amount</Text>
              <Text style={[styles.detailValue, styles.amountValue]}>₹{amount}</Text>
            </View>
          </View>
          <View style={styles.qrContainer}>
            <View style={styles.qrCode}>
              <Text style={styles.qrText}>QR CODE</Text>
            </View>
            <Text style={styles.qrInstruction}>
              Show this QR code at the cinema
            </Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>⬇️</Text>
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>↗</Text>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📅</Text>
            <Text style={styles.actionText}>Calendar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerButtons}>
          <Button
            title="View My Tickets"
            onPress={() => navigation.navigate('MyTickets')}
            style={styles.footerButton}
          />
          <Button
            title="Back to Home"
            variant="secondary"
            onPress={() => navigation.navigate('Home')}
            style={styles.footerButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  successContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  checkmark: {
    fontSize: 48,
    color: colors.success,
    fontWeight: 'bold',
  },
  successTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  successSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  bookingIdCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  bookingIdLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  bookingIdValue: {
    ...typography.h3,
    color: colors.text,
    letterSpacing: 2,
  },
  ticketCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ticketHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  movieThumbnail: {
    width: 80,
    height: 120,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  movieDetail: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  ticketDetails: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.bodySmall,
    color: colors.text,
  },
  amountValue: {
    color: colors.primary,
    fontWeight: '600',
  },
  qrContainer: {
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.md,
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  qrText: {
    ...typography.caption,
    color: colors.textSecondary,
    letterSpacing: 4,
  },
  qrInstruction: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  actionButton: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionIcon: {
    fontSize: 32,
  },
  actionText: {
    ...typography.bodySmall,
    color: colors.primary,
  },
  footerButtons: {
    padding: spacing.md,
    gap: spacing.md,
  },
  footerButton: {
    width: '100%',
  },
});

