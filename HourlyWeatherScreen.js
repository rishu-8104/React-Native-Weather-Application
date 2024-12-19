// HourlyWeatherScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import WeatherForecastListItem from './WeatherForecastListItem';

const API_KEY = '2a0f475a6b80a2bb6a8c0f62a057c874';
const CITY_NAME = 'Tampere';
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;

const HourlyWeatherScreen = () => {
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setForecast(data.list);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Extract unique hours from the forecast data
  const uniqueHours = Array.from(new Set(forecast.map(item => item.dt_txt.split(' ')[1])));

  return (
    <View style={styles.container}>
      <FlatList
        data={uniqueHours}
        keyExtractor={(hour) => hour}
        renderItem={({ item }) => {
          // Filter forecast data for the current hour
          const hourData = forecast.filter(forecastItem => forecastItem.dt_txt.includes(item));
          // Take the first item of the hourData array for simplicity
          const firstItem = hourData[0];

          return (
            <WeatherForecastListItem
              day={item}
              temperature={firstItem.main.temp}
              windSpeed={firstItem.wind.speed}
              icon={`http://openweathermap.org/img/wn/${firstItem.weather[0].icon}.png`}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set the background color to white
    ...Platform.select({
      android: {
        // Android-specific styles here
      },
      ios: {
        // iOS-specific styles here
      },
    }),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HourlyWeatherScreen;
