// CurrentWeatherScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';

const API_KEY = '2a0f475a6b80a2bb6a8c0f62a057c874';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const CurrentWeatherScreen = () => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('Tampere'); // Default city

  const fetchWeatherData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [cityName]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : weatherData ? (
        <>
          <View style={styles.weatherInfoContainer}>
            <Text style={styles.weatherInfo}>
              Temperature: {weatherData.main.temp} °C
            </Text>
            <Text style={styles.weatherInfo}>
              Wind Speed: {weatherData.wind.speed} m/s
            </Text>
            <Image
              style={styles.weatherIcon}
              source={{
                uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
              }}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={cityName}
            onChangeText={(text) => setCityName(text)}
          />
          <Button title="Search" onPress={fetchWeatherData} />
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white', // Set the background color to white
  },
  weatherInfoContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        borderRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  weatherInfo: {
    fontSize: 18,
    marginBottom: 8,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});

export default CurrentWeatherScreen;
