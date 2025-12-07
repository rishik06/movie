import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { BottomNav } from '../components/BottomNav';

const upcomingTickets = [
  {
    id: 1,
    title: 'The Dark Universe',
    language: 'English',
    theatre: 'PVR Cinemas - Phoenix Mall',
    date: 'Dec 9, 2024',
    time: '8:30 PM',
    seats: ['D5', 'D6'],
    price: 800,
    poster: 'https://via.placeholder.com/100x150',
  },
  {
    id: 2,
    title: 'Mission Strike',
    language: 'Hindi',
    theatre: 'INOX Megaplex',
    date: 'Dec 12, 2024',
    time: '5:30 PM',
    seats: ['G3', 'G4', 'G5'],
    price: 900,
    poster: 'https://via.placeholder.com/100x150',
  },
];

const pastTickets = [
  {
    id: 3,
    title: 'Comedy Nights',
    language: 'English',
    theatre: 'Cinepolis - Andheri',
    date: 'Dec 1, 2024',
    time: '7:00 PM',
    seats: ['E8', 'E9'],
    price: 600,
    poster: 'https://via.placeholder.com/100x150',
  },
];

export const MyTicketsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const tickets = activeTab === 'upcoming' ? upcomingTickets : pastTickets;

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
        {tickets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tickets found</Text>
          </View>
        ) : (
          tickets.map((ticket) => (
            <View key={ticket.id} style={styles.ticketCard}>
              <Image source={{ uri: ticket.poster }} style={styles.ticketPoster} />
              <View style={styles.ticketContent}>
                <Text style={styles.ticketTitle}>{ticket.title}</Text>
                <Text style={styles.ticketDetail}>{ticket.language}</Text>
                <Text style={styles.ticketDetail}>{ticket.theatre}</Text>
                <Text style={styles.ticketDetail}>
                  {ticket.date} • {ticket.time}
                </Text>
                <View style={styles.ticketFooter}>
                  <View>
                    <Text style={styles.ticketSeats}>Seats: {ticket.seats.join(', ')}</Text>
                    <Text style={styles.ticketPrice}>₹{ticket.price}</Text>
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
          ))
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
});

