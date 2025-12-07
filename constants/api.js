import { Platform } from 'react-native';

/**
 * API Configuration for Mobile Development
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. For Android Emulator:
 *    - Uses 10.0.2.2 (automatically configured)
 *    - Backend must be running on your host machine
 * 
 * 2. For iOS Simulator:
 *    - Uses localhost (automatically configured)
 *    - Backend must be running on your host machine
 * 
 * 3. For Physical Devices:
 *    - Find your computer's IP address:
 *      * Windows: ipconfig (look for IPv4 Address)
 *      * Mac/Linux: ifconfig or ip addr (look for inet)
 *    - Replace the return value below with: 'http://YOUR_IP:3000'
 *    - Example: return 'http://192.168.1.100:3000';
 *    - Ensure your phone and computer are on the same WiFi network
 *    - Make sure your firewall allows connections on port 3000
 * 
 * 4. To run both frontend and backend:
 *    - npm run dev (runs both concurrently)
 *    - npm run dev:android (runs backend + Android)
 *    - npm run dev:ios (runs backend + iOS)
 */
const getBaseURL = () => {
  // Check if we're in development mode
  const isDev = typeof __DEV__ !== 'undefined' ? __DEV__ : process.env.NODE_ENV !== 'production';
  
  if (isDev) {
    // Development mode
    if (Platform.OS === 'android') {
      // Android emulator uses 10.0.2.2 to access host machine's localhost
      return 'http://10.0.2.2:3000';
    } else if (Platform.OS === 'ios') {
      // iOS simulator can use localhost
      return 'http://localhost:3000';
    } else {
      // For physical devices, replace with your computer's IP address
      // Find it using: ipconfig (Windows) or ifconfig (Mac/Linux)
      // Example: return 'http://192.168.1.100:3000';
      return 'http://localhost:3000';
    }
  } else {
    // Production mode - replace with your production API URL
    return 'https://your-production-api.com';
  }
};

export const API_BASE_URL = getBaseURL();

export const API_ENDPOINTS = {
  MOVIES: '/api/movies',
  MOVIE_SHOWTIMES: (id) => `/api/movie/${id}/showtimes`,
  BOOK: '/api/book',
  BOOKINGS: (userId) => `/api/bookings/${userId}`,
  HEALTH: '/api/health',
};

