import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';
import { BottomNav } from '../components/BottomNav';

const mockMovies = [
  { id: 1, title: 'The Dark Universe', language: 'English', genre: 'Action/Thriller', rating: '8.5', poster: 'https://via.placeholder.com/160x240' },
  { id: 2, title: 'Mission Strike', language: 'Hindi', genre: 'Action/Drama', rating: '7.8', poster: 'https://via.placeholder.com/160x240' },
  { id: 3, title: 'The Great Adventure', language: 'English', genre: 'Adventure', rating: '8.2', poster: 'https://via.placeholder.com/160x240' },
  { id: 4, title: 'Night Cinema', language: 'Hindi', genre: 'Thriller', rating: '9.0', poster: 'https://via.placeholder.com/160x240' },
  { id: 5, title: 'City Lights', language: 'English', genre: 'Drama', rating: '8.7', poster: 'https://via.placeholder.com/160x240' },
  { id: 6, title: 'Action Hero', language: 'Hindi', genre: 'Action', rating: '7.5', poster: 'https://via.placeholder.com/160x240' },
];

const categories = ['All', 'Now Showing', 'Coming Soon'];

export const MoviesScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const renderMovieCard = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}
      activeOpacity={0.9}
    >
      <View style={styles.posterContainer}>
        <Image source={{ uri: item.poster }} style={styles.poster} />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
      <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.movieLanguage}>{item.language}</Text>
      <Text style={styles.movieGenre}>{item.genre}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Movies</Text>
        <TouchableOpacity>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
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
      </View>

      <View style={styles.countContainer}>
        <Text style={styles.countText}>{mockMovies.length} movies found</Text>
      </View>

      <FlatList
        data={mockMovies}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.movieGrid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />

      <BottomNav currentRoute="movies" onNavigate={(route) => {
        if (route === 'movies') return;
        navigation.navigate(route === 'home' ? 'Home' : route === 'events' ? 'Events' : 'Profile');
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
  },
  filterIcon: {
    fontSize: 24,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
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
  countContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  countText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  movieGrid: {
    padding: spacing.md,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  movieCard: {
    width: '48%',
    marginBottom: spacing.md,
  },
  posterContainer: {
    width: '100%',
    height: 240,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    ...shadows.medium,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
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
  movieTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  movieLanguage: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  movieGenre: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

