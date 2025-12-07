import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Button } from '../components/Button';

const foodItems = [
  { id: 1, name: 'Classic Popcorn (L)', price: 200 },
  { id: 2, name: 'Caramel Popcorn (L)', price: 250 },
  { id: 3, name: 'Coca Cola (L)', price: 150 },
];

export const OrderSummaryScreen = ({ route, navigation }) => {
  const { movie, theatre, time, seats, cart, seatTotal, foodTotal } = route.params || {
    movie: { title: 'The Dark Universe', language: 'English', genre: 'Action/Thriller', duration: '2h 30m' },
    theatre: { name: 'PVR Cinemas - Phoenix Mall' },
    time: 'Dec 9, 1:45 PM',
    seats: ['D1', 'D2', 'D3', 'D4'],
    seatTotal: 1200,
    foodTotal: 200,
    cart: { 1: 1 },
  };
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const totalAmount = (seatTotal || 0) + (foodTotal || 0);
  const discount = appliedCoupon ? 100 : 0;
  const finalAmount = totalAmount - discount;

  const applyCoupon = (code) => {
    if (code === 'WEEKEND100' || code === 'FIRST50') {
      setAppliedCoupon(code);
      setCouponCode(code);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.movieCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80x120' }}
            style={styles.moviePoster}
          />
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieDetail}>{movie.language}</Text>
            <Text style={styles.movieDetail}>{movie.genre}</Text>
            <Text style={styles.movieDetail}>{movie.duration}</Text>
            <View style={styles.bookingDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Theatre</Text>
                <Text style={styles.detailValue}>{theatre.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>{time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Seats</Text>
                <Text style={styles.detailValue}>{seats.join(', ')}</Text>
              </View>
            </View>
          </View>
        </View>

        {foodTotal > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Food & Beverages</Text>
            {Object.entries(cart || {}).map(([id, quantity]) => {
              const item = foodItems.find((i) => i.id === parseInt(id));
              if (!item || quantity === 0) return null;
              return (
                <View key={id} style={styles.foodRow}>
                  <Text style={styles.foodItem}>
                    {quantity}x {item.name}
                  </Text>
                  <Text style={styles.foodPrice}>₹{item.price * quantity}</Text>
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.couponIcon}>🏷️</Text>
              <Text style={styles.sectionTitle}>Apply Coupon</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All {'>'}</Text>
            </TouchableOpacity>
          </View>
          {appliedCoupon ? (
            <View style={styles.appliedCoupon}>
              <View style={styles.appliedCouponContent}>
                <Text style={styles.appliedCouponCode}>{appliedCoupon}</Text>
                <Text style={styles.appliedCouponText}>You saved ₹100!</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => {
                  setAppliedCoupon(null);
                  setCouponCode('');
                }}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.couponInputContainer}>
                <TextInput
                  style={styles.couponInput}
                  placeholder="Enter coupon code"
                  placeholderTextColor={colors.textSecondary}
                  value={couponCode}
                  onChangeText={setCouponCode}
                />
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => applyCoupon(couponCode)}
                >
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.suggestedCoupons}>
                <TouchableOpacity
                  style={styles.suggestedCoupon}
                  onPress={() => applyCoupon('FIRST50')}
                >
                  <Text style={styles.suggestedCouponText}>FIRST50</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.suggestedCoupon}
                  onPress={() => applyCoupon('WEEKEND100')}
                >
                  <Text style={styles.suggestedCouponText}>WEEKEND100</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total Amount</Text>
            <Text style={styles.priceValue}>₹{finalAmount}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Proceed to Pay"
          onPress={() => navigation.navigate('Payment', { amount: finalAmount, movie, theatre, time, seats, cart, seatTotal, foodTotal, discount })}
          style={styles.payButton}
        />
      </View>
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
    ...typography.h3,
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  movieCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  moviePoster: {
    width: 80,
    height: 120,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  movieInfo: {
    flex: 1,
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
  bookingDetails: {
    marginTop: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  detailLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.bodySmall,
    color: colors.text,
  },
  section: {
    backgroundColor: colors.white,
    padding: spacing.md,
    margin: spacing.md,
    marginTop: 0,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  couponIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  viewAllText: {
    ...typography.body,
    color: colors.primary,
  },
  foodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  foodItem: {
    ...typography.body,
    color: colors.text,
  },
  foodPrice: {
    ...typography.body,
    color: colors.text,
  },
  couponInputContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
  },
  applyButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
  },
  applyButtonText: {
    ...typography.body,
    color: colors.text,
  },
  suggestedCoupons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  suggestedCoupon: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  suggestedCouponText: {
    ...typography.bodySmall,
    color: colors.primary,
  },
  appliedCoupon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.success + '20',
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  appliedCouponContent: {
    flex: 1,
  },
  appliedCouponCode: {
    ...typography.body,
    color: colors.success,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  appliedCouponText: {
    ...typography.bodySmall,
    color: colors.success,
  },
  removeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  removeButtonText: {
    ...typography.body,
    color: colors.primary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    ...typography.body,
    color: colors.text,
  },
  priceValue: {
    ...typography.h2,
    color: colors.primary,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  payButton: {
    width: '100%',
  },
});

