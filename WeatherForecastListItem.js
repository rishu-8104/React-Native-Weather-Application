// WeatherForecastListItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

const WeatherForecastListItem = ({ day, temperature, windSpeed, icon }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.temperature}>{`${temperature} °C`}</Text>
      <Text style={styles.windSpeed}>{`Wind: ${windSpeed} m/s`}</Text>
      <Image style={styles.icon} source={{ uri: icon }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    ...Platform.select({
      android: {
        // Add Android-specific styles here
        backgroundColor: '#f2f2f2',
      },
      ios: {
        // Add iOS-specific styles here
        backgroundColor: '#e6f7ff',
      },
    }),
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 16,
  },
  windSpeed: {
    fontSize: 14,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default WeatherForecastListItem;
