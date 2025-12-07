import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Button } from '../components/Button';
import { apiService } from '../services/api';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: '📱', options: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'] },
  { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
  { id: 'wallet', name: 'Wallets', icon: '👛' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
];

export const PaymentScreen = ({ route, navigation }) => {
  const { amount, movie, theatre, time, dateTime, seats } = route.params || { amount: 1580 };
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [selectedUPI, setSelectedUPI] = useState('Google Pay');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!movie || !theatre || !seats) {
      Alert.alert('Error', 'Missing booking information');
      return;
    }

    // Use dateTime if available, otherwise construct from time
    let showTime = dateTime;
    if (!showTime && time) {
      // Fallback: construct datetime from current date and time
      const today = new Date();
      const [timePart, modifier] = time.split(' ');
      let [hours, minutes] = timePart.split(':');
      if (modifier === 'PM' && hours !== '12') {
        hours = String(parseInt(hours, 10) + 12);
      } else if (modifier === 'AM' && hours === '12') {
        hours = '00';
      }
      hours = hours.padStart(2, '0');
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      showTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    if (!showTime) {
      Alert.alert('Error', 'Missing show time information');
      return;
    }

    try {
      setProcessing(true);
      
      const bookingData = {
        movie_id: movie.id,
        theatre_id: theatre.id,
        show_time: showTime,
        seats: Array.isArray(seats) ? seats : seats.split(','),
        total_price: amount,
      };

      const response = await apiService.createBooking(bookingData);
      
      Alert.alert(
        'Booking Successful!',
        `Your booking ID is: ${response.booking_id}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('BookingSuccess', { 
              bookingId: response.booking_id,
              amount,
              booking: response.details
            }),
          },
        ]
      );
    } catch (error) {
      console.error('Booking failed:', error);
      Alert.alert('Booking Failed', error.message || 'Unable to complete booking. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Options</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentSection}>
            <TouchableOpacity
              style={styles.paymentMethodHeader}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentIcon}>{method.icon}</Text>
                <Text style={styles.paymentMethodName}>{method.name}</Text>
              </View>
              <View style={[styles.radioButton, selectedMethod === method.id && styles.radioButtonActive]}>
                {selectedMethod === method.id && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>

            {selectedMethod === method.id && method.id === 'upi' && (
              <View style={styles.upiOptions}>
                <View style={styles.upiApps}>
                  {method.options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.upiAppButton,
                        selectedUPI === option && styles.upiAppButtonActive,
                      ]}
                      onPress={() => setSelectedUPI(option)}
                    >
                      <Text style={styles.upiAppIcon}>🎨</Text>
                      <Text
                        style={[
                          styles.upiAppText,
                          selectedUPI === option && styles.upiAppTextActive,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.orText}>Or enter UPI ID</Text>
                <TextInput
                  style={styles.upiInput}
                  placeholder="yourname@upi"
                  placeholderTextColor={colors.textSecondary}
                  value={upiId}
                  onChangeText={setUpiId}
                />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount to Pay</Text>
          <Text style={styles.amountValue}>₹{amount}</Text>
        </View>
        <Button
          title={processing ? 'Processing...' : `Pay ₹${amount}`}
          onPress={handlePayment}
          style={styles.payButton}
          disabled={processing}
        />
        {processing && (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
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
  paymentSection: {
    backgroundColor: colors.white,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  paymentIcon: {
    fontSize: 24,
  },
  paymentMethodName: {
    ...typography.body,
    color: colors.text,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonActive: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  upiOptions: {
    padding: spacing.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  upiApps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  upiAppButton: {
    width: '48%',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  upiAppButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  upiAppIcon: {
    fontSize: 32,
  },
  upiAppText: {
    ...typography.bodySmall,
    color: colors.text,
  },
  upiAppTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  orText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  upiInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  amountContainer: {
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  amountLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  amountValue: {
    ...typography.h1,
    color: colors.primary,
  },
  payButton: {
    width: '100%',
  },
  processingContainer: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },
});

