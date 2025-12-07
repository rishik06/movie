import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';
import { MovieCard } from '../components/MovieCard';
import { BottomNav } from '../components/BottomNav';
import { apiService } from '../services/api';

export const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState('Mumbai');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getMovies();
      setMovies(response.data || []);
    } catch (err) {
      console.error('Failed to load movies:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{location} {'>'}</Text>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for movies, events..."
              placeholderTextColor={colors.textSecondary}
              onFocus={() => navigation.navigate('Search')}
            />
          </View>
        </View>

        <View style={styles.bannerContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            <View style={styles.banner}>
              <Image
                source={{ uri: 'https://via.placeholder.com/400x200' }}
                style={styles.bannerImage}
              />
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Movies</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Movies')}>
              <Text style={styles.seeAllText}>See All {'>'}</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Failed to load movies: {error}</Text>
              <TouchableOpacity onPress={loadMovies} style={styles.retryButton}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieList}>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onPress={() => navigation.navigate('MovieDetails', { movie })}
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Now Showing</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Movies')}>
              <Text style={styles.seeAllText}>See All {'>'}</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieList}>
              {movies.slice(0, 3).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onPress={() => navigation.navigate('MovieDetails', { movie })}
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Coming Soon</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Movies')}>
              <Text style={styles.seeAllText}>See All {'>'}</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieList}>
              {movies.slice(1, 4).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onPress={() => navigation.navigate('MovieDetails', { movie })}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
      <BottomNav currentRoute="home" onNavigate={(route) => {
        if (route === 'home') return;
        navigation.navigate(route === 'movies' ? 'Movies' : route === 'events' ? 'Events' : 'Profile');
      }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  locationText: {
    ...typography.body,
    color: colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text,
  },
  bannerContainer: {
    height: 200,
    marginVertical: spacing.md,
  },
  banner: {
    width: 400,
    height: 200,
    marginHorizontal: spacing.md,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
  },
  seeAllText: {
    ...typography.body,
    color: colors.primary,
  },
  movieList: {
    paddingLeft: spacing.md,
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

