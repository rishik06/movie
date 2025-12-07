import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { BottomNav } from '../components/BottomNav';
import { apiService } from '../services/api';

export const MyTicketsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getBookings(1);
      setBookings(response.data || []);
    } catch (err) {
      console.error('Failed to load bookings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const tickets = bookings.filter(booking => {
    if (activeTab === 'upcoming') {
      return booking.status === 'Upcoming';
    } else {
      return booking.status === 'Past';
    }
  });

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString.replace(' ', 'T'));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString.replace(' ', 'T'));
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Tickets</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.tabActive]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load tickets: {error}</Text>
            <TouchableOpacity onPress={loadBookings} style={styles.retryButton}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : tickets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tickets found</Text>
          </View>
        ) : (
          tickets.map((ticket) => {
            const seats = ticket.seats ? ticket.seats.split(',') : [];
            return (
              <View key={ticket.booking_id} style={styles.ticketCard}>
                <Image 
                  source={{ uri: ticket.poster_url || 'https://via.placeholder.com/100x150' }} 
                  style={styles.ticketPoster} 
                />
                <View style={styles.ticketContent}>
                  <Text style={styles.ticketTitle}>{ticket.movie_title}</Text>
                  <Text style={styles.ticketDetail}>{ticket.language}</Text>
                  <Text style={styles.ticketDetail}>{ticket.theatre_name}</Text>
                  <Text style={styles.ticketDetail}>
                    {formatDate(ticket.show_time)} • {formatTime(ticket.show_time)}
                  </Text>
                  <View style={styles.ticketFooter}>
                    <View>
                      <Text style={styles.ticketSeats}>Seats: {seats.join(', ')}</Text>
                      <Text style={styles.ticketPrice}>₹{ticket.total_price}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.viewDetailsButton}
                      onPress={() => navigation.navigate('TicketDetails', { ticket })}
                    >
                      <Text style={styles.viewDetailsText}>View Details {'>'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      <BottomNav currentRoute="profile" onNavigate={(route) => {
        if (route === 'profile') return;
        navigation.navigate(route === 'home' ? 'Home' : route === 'movies' ? 'Movies' : 'Events');
      }} />
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
  tabs: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.grayLight,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  ticketCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ticketPoster: {
    width: 100,
    height: 150,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  ticketContent: {
    flex: 1,
  },
  ticketTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  ticketDetail: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.sm,
  },
  ticketSeats: {
    ...typography.bodySmall,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  ticketPrice: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  viewDetailsButton: {
    paddingHorizontal: spacing.sm,
  },
  viewDetailsText: {
    ...typography.body,
    color: colors.primary,
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
});

