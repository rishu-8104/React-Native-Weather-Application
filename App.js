import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import CurrentWeatherScreen from './CurrentWeatherScreen';
import HourlyWeatherScreen from './HourlyWeatherScreen';
import LocationApp from './LocationApp'; // Import the LocationApp component

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: Platform.OS === 'android' ? '#f2f2f2' : '#ffffff',
            borderTopColor: '#ccc',
            borderTopWidth: 1,
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
              },
            }),
          },
          labelStyle: {
            fontSize: 10,
            fontWeight: 'bold',
          },
          activeTintColor: '#007BFF',
          inactiveTintColor: '#666',
        }}
      >
        <Tab.Screen
          name="Current Weather"
          component={CurrentWeatherScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon
                name={Platform.OS === 'ios' ? 'ios-partly-sunny' : 'md-partly-sunny'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Hourly Weather"
          component={HourlyWeatherScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon
                name={Platform.OS === 'ios' ? 'ios-hourglass' : 'md-hourglass'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Location"
          component={LocationApp}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon
                name={Platform.OS === 'ios' ? 'ios-location' : 'md-location'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
