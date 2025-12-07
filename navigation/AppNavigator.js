import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboardingScreen1 } from '../screens/OnboardingScreen1';
import { OnboardingScreen2 } from '../screens/OnboardingScreen2';
import { OnboardingScreen3 } from '../screens/OnboardingScreen3';
import { LoginScreen } from '../screens/LoginScreen';
import { OTPScreen } from '../screens/OTPScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MoviesScreen } from '../screens/MoviesScreen';
import { MovieDetailsScreen } from '../screens/MovieDetailsScreen';
import { TheatreSelectionScreen } from '../screens/TheatreSelectionScreen';
import { SeatSelectionScreen } from '../screens/SeatSelectionScreen';
import { FoodBeveragesScreen } from '../screens/FoodBeveragesScreen';
import { OrderSummaryScreen } from '../screens/OrderSummaryScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { BookingSuccessScreen } from '../screens/BookingSuccessScreen';
import { MyTicketsScreen } from '../screens/MyTicketsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { EventsScreen } from '../screens/EventsScreen';
import { OffersScreen } from '../screens/OffersScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { PaymentMethodsScreen } from '../screens/PaymentMethodsScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { EventDetailsScreen } from '../screens/EventDetailsScreen';
import { TicketDetailsScreen } from '../screens/TicketDetailsScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding1"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Movies" component={MoviesScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        <Stack.Screen name="TheatreSelection" component={TheatreSelectionScreen} />
        <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
        <Stack.Screen name="FoodBeverages" component={FoodBeveragesScreen} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
        <Stack.Screen name="MyTickets" component={MyTicketsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="Offers" component={OffersScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

