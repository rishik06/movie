import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Button } from '../components/Button';
import { apiService } from '../services/api';

const dates = [
  { id: 1, day: 'Dec 8', weekday: 'Mon' },
  { id: 2, day: 'Dec 9', weekday: 'Tue' },
  { id: 3, day: 'Dec 10', weekday: 'Wed' },
  { id: 4, day: 'Dec 11', weekday: 'Thu' },
];

export const MovieDetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params || {
    movie: { id: 1, title: 'The Dark Universe', language: 'English', genre: 'Action/Thriller', rating: '8.5', duration: '2h 30m' },
  };
  const [selectedDate, setSelectedDate] = useState(dates[1].id);
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movie && movie.id) {
      loadShowtimes();
    }
  }, [movie]);

  const loadShowtimes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getMovieShowtimes(movie.id);
      setTheatres(response.data || []);
    } catch (err) {
      console.error('Failed to load showtimes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert 12-hour time to 24-hour format
  const convertTo24Hour = (time12h) => {
    if (!time12h) return '00:00';
    const parts = time12h.split(' ');
    if (parts.length < 2) return time12h; // Already in 24-hour format
    
    const [time, modifier] = parts;
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes || '00'}`;
  };

  // Helper function to construct datetime string in format YYYY-MM-DD HH:MM
  const constructDateTime = (dateStr, time24) => {
    const today = new Date();
    let targetDate = new Date(today);
    
    // Parse date string like "Dec 9" or "9 Dec"
    if (dateStr) {
      const dateMatch = dateStr.match(/(\w+)\s+(\d+)/);
      if (dateMatch) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = dateMatch[1];
        const day = parseInt(dateMatch[2], 10);
        const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
        
        if (monthIndex !== -1) {
          targetDate = new Date(today.getFullYear(), monthIndex, day);
          // If the date is in the past, assume next year
          if (targetDate < today) {
            targetDate = new Date(today.getFullYear() + 1, monthIndex, day);
          }
        }
      }
    }
    
    const [hours, minutes] = time24.split(':');
    targetDate.setHours(parseInt(hours, 10), parseInt(minutes || 0, 10), 0, 0);
    
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes || '00'}`;
  };

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
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load showtimes: {error}</Text>
                <TouchableOpacity onPress={loadShowtimes} style={styles.retryButton}>
                  <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : theatres.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No showtimes available</Text>
              </View>
            ) : (
              theatres.map((theatre) => {
                const amenities = theatre.amenities ? theatre.amenities.split(',') : [];
                return (
                  <View key={theatre.id} style={styles.theatreCard}>
                    <Text style={styles.theatreName}>{theatre.name}</Text>
                    <View style={styles.theatreLocation}>
                      <Text style={styles.locationIcon}>📍</Text>
                      <Text style={styles.locationText}>{theatre.location}</Text>
                      <TouchableOpacity style={styles.mapButton}>
                        <Text style={styles.mapButtonText}>Map</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.amenitiesContainer}>
                      {amenities.map((amenity, index) => (
                        <View key={index} style={styles.amenityTag}>
                          <Text style={styles.amenityText}>{amenity.trim()}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={styles.showtimesContainer}>
                      {theatre.show_times && theatre.show_times.map((showtime, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.showtimeButton,
                            showtime.status === 'Fast Filling' && styles.showtimeButtonFastFilling
                          ]}
                          onPress={() => {
                            // Construct full datetime from selected date and showtime
                            const selectedDateObj = dates.find(d => d.id === selectedDate);
                            const today = new Date();
                            const dateStr = selectedDateObj ? 
                              `${selectedDateObj.day.split(' ')[1]} ${selectedDateObj.day.split(' ')[0]} ${today.getFullYear()}` : 
                              today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                            
                            // Convert time to 24-hour format and construct datetime string
                            const time24 = convertTo24Hour(showtime.time);
                            const dateTime = constructDateTime(dateStr, time24);
                            
                            navigation.navigate('SeatSelection', { 
                              movie, 
                              theatre, 
                              time: showtime.time,
                              dateTime: dateTime,
                              price: showtime.price 
                            });
                          }}
                        >
                          <Text style={styles.showtimeText}>{showtime.time}</Text>
                          {showtime.status === 'Fast Filling' && (
                            <Text style={styles.fastFillingText}>Fast Filling</Text>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                );
              })
            )}
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
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  retryText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  showtimeButtonFastFilling: {
    borderColor: colors.warning,
  },
  fastFillingText: {
    ...typography.caption,
    color: colors.warning,
    fontSize: 10,
  },
});

