import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import LocationScreen from '../screens/LocationScreen';
import WeatherDetailsScreen from '../screens/WeatherDetailsScreen';
import {WeatherData} from '../models/WeatherData.model';

export type RootStackParamList = {
  LocationScreen: undefined;
  WeatherDetailsScreen: {data: WeatherData};
};

export type RootStackScreens = keyof RootStackParamList;

const Stack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}>
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen
          name="WeatherDetailsScreen"
          component={WeatherDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
