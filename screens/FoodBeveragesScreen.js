import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Button } from '../components/Button';

const foodItems = [
  { id: 1, name: 'Classic Popcorn (L)', description: 'Large salted popcorn', price: 200, image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Caramel Popcorn (L)', description: 'Sweet caramel popcorn', price: 250, image: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Coca Cola (L)', description: 'Chilled soft drink', price: 150, image: 'https://via.placeholder.com/100' },
  { id: 4, name: 'Nachos with Cheese', description: 'Crispy nachos with cheese dip', price: 180, image: 'https://via.placeholder.com/100' },
  { id: 5, name: 'Combo Meal', description: 'Popcorn + Drink + Nachos', price: 450, image: 'https://via.placeholder.com/100' },
];

export const FoodBeveragesScreen = ({ route, navigation }) => {
  const { movie, theatre, time, dateTime, seats, total: seatTotal } = route.params || {};
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const removeFromCart = (item) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[item.id] > 1) {
        newCart[item.id] -= 1;
      } else {
        delete newCart[item.id];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const item = foodItems.find((i) => i.id === parseInt(id));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getTotalAmount = () => {
    return (seatTotal || 0) + getCartTotal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food & Beverages</Text>
        <TouchableOpacity onPress={() => navigation.navigate('OrderSummary', { movie, theatre, time, dateTime, seats, cart, seatTotal, foodTotal: getCartTotal() })}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Combo Offer!</Text>
        <Text style={styles.bannerSubtitle}>Save 15% on combo meals</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {foodItems.map((item) => {
          const quantity = cart[item.id] || 0;
          return (
            <View key={item.id} style={styles.foodCard}>
              <Image source={{ uri: item.image }} style={styles.foodImage} />
              <View style={styles.foodContent}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodDescription}>{item.description}</Text>
                <Text style={styles.foodPrice}>₹{item.price}</Text>
              </View>
              {quantity > 0 ? (
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => removeFromCart(item)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => addToCart(item)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{getTotalAmount()}</Text>
        </View>
        <Button
          title="Proceed"
          onPress={() => navigation.navigate('OrderSummary', { movie, theatre, time, dateTime, seats, cart, seatTotal, foodTotal: getCartTotal() })}
          style={styles.proceedButton}
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
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text,
  },
  skipText: {
    ...typography.body,
    color: colors.primary,
  },
  banner: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    alignItems: 'center',
  },
  bannerTitle: {
    ...typography.h3,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  bannerSubtitle: {
    ...typography.body,
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  foodCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  foodContent: {
    flex: 1,
  },
  foodName: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  foodDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  foodPrice: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  addButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  addButtonText: {
    ...typography.body,
    color: colors.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    ...typography.h4,
    color: colors.white,
  },
  quantityText: {
    ...typography.h4,
    color: colors.text,
    minWidth: 30,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalContainer: {
    marginBottom: spacing.md,
  },
  totalLabel: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  totalAmount: {
    ...typography.h2,
    color: colors.text,
  },
  proceedButton: {
    width: '100%',
  },
});

