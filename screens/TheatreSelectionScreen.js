import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

const theatres = [
  {
    id: 1,
    name: 'PVR Cinemas - Phoenix Mall',
    location: 'Lower Parel, Mumbai',
    distance: '2.5 km',
    amenities: ['4K', 'Dolby Atmos', 'Recliner', 'Parking'],
    showtimes: ['10:30 AM', '1:45 PM', '5:00 PM', '8:30 PM'],
  },
  {
    id: 2,
    name: 'INOX Megaplex',
    location: 'Inorbit Mall, Malad',
    distance: '5.2 km',
    amenities: ['IMAX', '4DX', 'Premium', 'Food Court'],
    showtimes: ['11:00 AM', '2:15 PM', '5:30 PM', '9:00 PM'],
  },
  {
    id: 3,
    name: 'Cinepolis - Andheri',
    location: 'Andheri West, Mumbai',
    distance: '3.8 km',
    amenities: ['4K', 'VIP Lounge', 'Wheelchair Access'],
    showtimes: ['10:00 AM', '1:30 PM', '4:45 PM', '8:15 PM'],
  },
];

export const TheatreSelectionScreen = ({ route, navigation }) => {
  const { movie } = route.params || { movie: { title: 'The Dark Universe' } };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{movie.title}</Text>
          <Text style={styles.headerDate}>Dec 9</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {theatres.map((theatre) => (
          <View key={theatre.id} style={styles.theatreCard}>
            <Text style={styles.theatreName}>{theatre.name}</Text>
            <View style={styles.theatreLocation}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>{theatre.location}</Text>
              <Text style={styles.distanceText}>{theatre.distance}</Text>
              <TouchableOpacity style={styles.mapButton}>
                <Text style={styles.mapButtonText}>Map</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.amenitiesContainer}>
              {theatre.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityTag}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
            <View style={styles.showtimesContainer}>
              {theatre.showtimes.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.showtimeButton}
                  onPress={() => navigation.navigate('SeatSelection', { movie, theatre, time })}
                >
                  <Text style={styles.showtimeText}>{time}</Text>
                </TouchableOpacity>
              ))}
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
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
  },
  headerDate: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  scrollView: {
    flex: 1,
  },
  theatreCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  theatreName: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  theatreLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  locationIcon: {
    fontSize: 14,
  },
  locationText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  distanceText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  mapButton: {
    marginLeft: 'auto',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.sm,
  },
  mapButtonText: {
    ...typography.bodySmall,
    color: colors.primary,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  amenityTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    backgroundColor: colors.grayLight,
  },
  amenityText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  showtimesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  showtimeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.success,
  },
  showtimeText: {
    ...typography.bodySmall,
    color: colors.success,
  },
});

