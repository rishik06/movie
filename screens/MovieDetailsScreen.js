import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Button } from '../components/Button';

const dates = [
  { id: 1, day: 'Dec 8', weekday: 'Mon' },
  { id: 2, day: 'Dec 9', weekday: 'Tue' },
  { id: 3, day: 'Dec 10', weekday: 'Wed' },
  { id: 4, day: 'Dec 11', weekday: 'Thu' },
];

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

export const MovieDetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params || {
    movie: { id: 1, title: 'The Dark Universe', language: 'English', genre: 'Action/Thriller', rating: '8.5', duration: '2h 30m' },
  };
  const [selectedDate, setSelectedDate] = useState(dates[1].id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x600' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.headerIcon}>←</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.headerIcon}>↗</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.headerIcon}>❤️</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{movie.title}</Text>
              <View style={styles.heroMeta}>
                <Text style={styles.metaItem}>⭐ {movie.rating}/10</Text>
                <Text style={styles.metaItem}>⏱ {movie.duration}</Text>
                <Text style={styles.metaItem}>A {movie.language}</Text>
              </View>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{movie.genre}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>UA 13+</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.dateSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date) => (
              <TouchableOpacity
                key={date.id}
                style={[
                  styles.dateButton,
                  selectedDate === date.id && styles.dateButtonActive,
                ]}
                onPress={() => setSelectedDate(date.id)}
              >
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === date.id && styles.dateTextActive,
                  ]}
                >
                  {date.day}
                </Text>
                <Text
                  style={[
                    styles.weekdayText,
                    selectedDate === date.id && styles.weekdayTextActive,
                  ]}
                >
                  {date.weekday}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>About the movie</Text>
          <Text style={styles.description}>
            Experience the ultimate action thriller that takes you on a journey through parallel universes. When a secret experiment goes wrong, a team of scientists must race against time to save humanity.
          </Text>
          <TouchableOpacity>
            <Text style={styles.readMore}>Read more</Text>
          </TouchableOpacity>

          <View style={styles.theatresSection}>
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
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Book Tickets"
          onPress={() => navigation.navigate('TheatreSelection', { movie })}
          style={styles.bookButton}
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
  heroContainer: {
    height: 500,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  headerIcon: {
    fontSize: 24,
    color: colors.white,
  },
  heroContent: {
    padding: spacing.lg,
  },
  heroTitle: {
    ...typography.h1,
    color: colors.white,
    marginBottom: spacing.md,
  },
  heroMeta: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  metaItem: {
    ...typography.body,
    color: colors.white,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeText: {
    ...typography.bodySmall,
    color: colors.white,
  },
  dateSelector: {
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
  },
  dateButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    marginLeft: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  dateText: {
    ...typography.body,
    color: colors.text,
  },
  dateTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  weekdayText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  weekdayTextActive: {
    color: colors.primary,
  },
  content: {
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  readMore: {
    ...typography.body,
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  theatresSection: {
    marginTop: spacing.md,
  },
  theatreCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
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
  footer: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bookButton: {
    width: '100%',
  },
});

