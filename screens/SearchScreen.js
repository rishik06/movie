import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { MovieCard } from '../components/MovieCard';

const recentSearches = ['The Dark Universe', 'Mission Strike', 'Action Movies'];
const trendingMovies = [
  { id: 1, title: 'The Dark Universe', language: 'English', genre: 'Action/Thriller', rating: '8.5', poster: 'https://via.placeholder.com/160x240' },
  { id: 2, title: 'Mission Strike', language: 'Hindi', genre: 'Action/Drama', rating: '7.8', poster: 'https://via.placeholder.com/160x240' },
  { id: 3, title: 'The Great Adventure', language: 'English', genre: 'Adventure', rating: '8.2', poster: 'https://via.placeholder.com/160x240' },
];

export const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for movies, events..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {searchQuery === '' ? (
          <>
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.searchItem}
                    onPress={() => setSearchQuery(search)}
                  >
                    <Text style={styles.searchIcon}>🕐</Text>
                    <Text style={styles.searchItemText}>{search}</Text>
                    <TouchableOpacity>
                      <Text style={styles.deleteIcon}>✕</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending Movies</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {trendingMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPress={() => navigation.navigate('MovieDetails', { movie })}
                  />
                ))}
              </ScrollView>
            </View>
          </>
        ) : (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Search Results</Text>
            <View style={styles.resultsGrid}>
              {trendingMovies
                .filter((movie) =>
                  movie.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPress={() => navigation.navigate('MovieDetails', { movie })}
                  />
                ))}
            </View>
          </View>
        )}
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
    gap: spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text,
  },
  searchContainer: {
    flex: 1,
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
  scrollView: {
    flex: 1,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchItemText: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  deleteIcon: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  resultsSection: {
    padding: spacing.md,
  },
  resultsTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
});

