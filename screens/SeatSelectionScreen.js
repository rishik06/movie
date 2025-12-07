import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Button } from '../components/Button';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const seatsPerRow = 10;

const generateSeats = () => {
  const seats = {};
  rows.forEach((row) => {
    seats[row] = [];
    for (let i = 1; i <= seatsPerRow; i++) {
      seats[row].push({
        id: `${row}${i}`,
        row,
        number: i,
        available: Math.random() > 0.3,
        booked: Math.random() < 0.2,
      });
    }
  });
  return seats;
};

export const SeatSelectionScreen = ({ route, navigation }) => {
  const { movie, theatre, time } = route.params || {
    movie: { title: 'The Dark Universe' },
    theatre: { name: 'PVR Cinemas - Phoenix Mall' },
    time: '1:45 PM',
  };
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    const seat = Object.values(seats).flat().find((s) => s.id === seatId);
    if (!seat || !seat.available || seat.booked) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatPrice = (row) => {
    if (['A', 'B', 'C'].includes(row)) return 400;
    if (['D', 'E', 'F'].includes(row)) return 300;
    return 200;
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const row = seatId[0];
      return total + getSeatPrice(row);
    }, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.theatreName}>{theatre.name}</Text>
          <Text style={styles.movieInfo}>{movie.title} - {time}</Text>
        </View>
      </View>

      <View style={styles.screenIndicator}>
        <View style={styles.screenLine} />
        <Text style={styles.screenText}>Screen this way</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.seatMap}>
          {rows.map((row) => (
            <View key={row} style={styles.row}>
              <Text style={styles.rowLabel}>{row}</Text>
              <View style={styles.seatsContainer}>
                {seats[row].map((seat) => {
                  const isSelected = selectedSeats.includes(seat.id);
                  const isBooked = seat.booked;
                  const isAvailable = seat.available && !isBooked;

                  return (
                    <TouchableOpacity
                      key={seat.id}
                      style={[
                        styles.seat,
                        isSelected && styles.seatSelected,
                        isBooked && styles.seatBooked,
                        !isAvailable && styles.seatUnavailable,
                      ]}
                      onPress={() => toggleSeat(seat.id)}
                      disabled={!isAvailable}
                    >
                      {isBooked && <Text style={styles.seatX}>✕</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.legendAvailable]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.legendSelected]} />
            <Text style={styles.legendText}>Selected</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.legendBooked]}>
              <Text style={styles.legendX}>✕</Text>
            </View>
            <Text style={styles.legendText}>Booked</Text>
          </View>
        </View>

        <View style={styles.pricing}>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Premium - ₹400</Text>
            <Text style={styles.pricingRows}>Rows A-C</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Gold - ₹300</Text>
            <Text style={styles.pricingRows}>Rows D-F</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Silver - ₹200</Text>
            <Text style={styles.pricingRows}>Rows G-J</Text>
          </View>
        </View>
      </ScrollView>

      {selectedSeats.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>
              {selectedSeats.length} Seats Selected
            </Text>
            <Text style={styles.footerSeats}>{selectedSeats.join(', ')}</Text>
            <Text style={styles.footerTotal}>Total ₹{calculateTotal()}</Text>
          </View>
          <Button
            title="Proceed"
            onPress={() => navigation.navigate('FoodBeverages', { movie, theatre, time, seats: selectedSeats, total: calculateTotal() })}
            style={styles.proceedButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.backgroundDark,
  },
  backIcon: {
    fontSize: 24,
    color: colors.white,
    marginRight: spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  theatreName: {
    ...typography.h4,
    color: colors.white,
  },
  movieInfo: {
    ...typography.bodySmall,
    color: colors.gray,
    marginTop: spacing.xs / 2,
  },
  screenIndicator: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    backgroundColor: colors.backgroundDark,
  },
  screenLine: {
    width: '80%',
    height: 2,
    backgroundColor: colors.gray,
    marginBottom: spacing.xs,
  },
  screenText: {
    ...typography.caption,
    color: colors.gray,
  },
  scrollView: {
    flex: 1,
  },
  seatMap: {
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rowLabel: {
    ...typography.body,
    color: colors.white,
    width: 30,
    marginRight: spacing.sm,
  },
  seatsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  seat: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.grayDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatSelected: {
    backgroundColor: colors.success,
  },
  seatBooked: {
    backgroundColor: colors.grayDark,
    opacity: 0.5,
  },
  seatUnavailable: {
    opacity: 0.3,
  },
  seatX: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendBox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendAvailable: {
    backgroundColor: colors.grayDark,
  },
  legendSelected: {
    backgroundColor: colors.success,
  },
  legendBooked: {
    backgroundColor: colors.grayDark,
  },
  legendX: {
    color: colors.white,
    fontSize: 12,
  },
  legendText: {
    ...typography.caption,
    color: colors.white,
  },
  pricing: {
    padding: spacing.md,
    backgroundColor: colors.backgroundDark,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  pricingLabel: {
    ...typography.body,
    color: colors.white,
  },
  pricingRows: {
    ...typography.bodySmall,
    color: colors.gray,
  },
  footer: {
    backgroundColor: colors.backgroundDark,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.grayDark,
  },
  footerContent: {
    marginBottom: spacing.md,
  },
  footerText: {
    ...typography.body,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  footerSeats: {
    ...typography.bodySmall,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  footerTotal: {
    ...typography.h3,
    color: colors.white,
  },
  proceedButton: {
    width: '100%',
  },
});

