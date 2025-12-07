import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';
import { BottomNav } from '../components/BottomNav';

const categories = ['All', 'Music', 'Comedy', 'Sports', 'Theatre'];

const events = [
  {
    id: 1,
    category: 'Music',
    title: 'Rock Legends Live',
    venue: 'Phoenix Marketcity',
    date: 'Dec 15, 2024',
    price: 999,
    rating: 4.8,
    image: 'https://via.placeholder.com/200x200',
    featured: false,
  },
  {
    id: 2,
    category: 'Comedy',
    title: 'Stand-Up Comedy Night',
    venue: 'Canvas Laugh Club',
    date: 'Dec 12, 2024',
    price: 499,
    rating: 4.6,
    image: 'https://via.placeholder.com/200x200',
    featured: false,
  },
  {
    id: 3,
    category: 'Music',
    title: 'Summer Music Festival',
    venue: 'Multi-city tour',
    date: 'Starting Dec 2024',
    price: 1299,
    rating: 4.9,
    image: 'https://via.placeholder.com/400x200',
    featured: true,
  },
];

export const EventsScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter((event) => event.category === selectedCategory);

  const featuredEvent = events.find((e) => e.featured);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>Mumbai</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {featuredEvent && (
          <View style={styles.featuredCard}>
            <Image source={{ uri: featuredEvent.image }} style={styles.featuredImage} />
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>{featuredEvent.title}</Text>
              <Text style={styles.featuredSubtitle}>{featuredEvent.venue}</Text>
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Upcoming Events</Text>

        {filteredEvents.filter((e) => !e.featured).map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
            onPress={() => navigation.navigate('EventDetails', { event })}
          >
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {event.rating}</Text>
            </View>
            <View style={styles.eventContent}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{event.category}</Text>
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventDetails}>
                <Text style={styles.eventDetail}>📍 {event.venue}</Text>
                <Text style={styles.eventDetail}>📅 {event.date}</Text>
              </View>
              <Text style={styles.eventPrice}>From ₹{event.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNav currentRoute="events" onNavigate={(route) => {
        if (route === 'events') return;
        navigation.navigate(route === 'home' ? 'Home' : route === 'movies' ? 'Movies' : 'Profile');
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
    ...typography.h2,
    color: colors.text,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  locationIcon: {
    fontSize: 16,
  },
  locationText: {
    ...typography.bodySmall,
    color: colors.text,
  },
  categoryScroll: {
    maxHeight: 50,
    paddingVertical: spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    marginLeft: spacing.md,
    backgroundColor: colors.grayLight,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  featuredCard: {
    height: 250,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.medium,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  featuredBadgeText: {
    ...typography.bodySmall,
    color: colors.white,
    fontWeight: '600',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  featuredTitle: {
    ...typography.h3,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  featuredSubtitle: {
    ...typography.body,
    color: colors.white,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    margin: spacing.md,
    marginTop: 0,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  eventImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  ratingText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  eventContent: {
    flex: 1,
    padding: spacing.md,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.round,
    marginBottom: spacing.xs,
  },
  categoryBadgeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  eventTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  eventDetails: {
    marginBottom: spacing.xs,
  },
  eventDetail: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  eventPrice: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
});

