import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Button } from '../components/Button';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: '📱', options: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'] },
  { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
  { id: 'wallet', name: 'Wallets', icon: '👛' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
];

export const PaymentScreen = ({ route, navigation }) => {
  const { amount } = route.params || { amount: 1580 };
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [selectedUPI, setSelectedUPI] = useState('Google Pay');
  const [upiId, setUpiId] = useState('');

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
          title={`Pay ₹${amount}`}
          onPress={() => navigation.navigate('BookingSuccess', { amount })}
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
});

