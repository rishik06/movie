import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error || error.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getMovies(filters = {}) {
    const queryParams = new URLSearchParams();
    if (filters.language) queryParams.append('language', filters.language);
    if (filters.genre) queryParams.append('genre', filters.genre);
    
    const endpoint = queryParams.toString() 
      ? `${API_ENDPOINTS.MOVIES}?${queryParams.toString()}`
      : API_ENDPOINTS.MOVIES;
    
    return this.request(endpoint);
  }

  async getMovieShowtimes(movieId) {
    return this.request(API_ENDPOINTS.MOVIE_SHOWTIMES(movieId));
  }

  async createBooking(bookingData) {
    return this.request(API_ENDPOINTS.BOOK, {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookings(userId = 1) {
    return this.request(API_ENDPOINTS.BOOKINGS(userId));
  }

  async healthCheck() {
    return this.request(API_ENDPOINTS.HEALTH);
  }
}

export const apiService = new ApiService();

