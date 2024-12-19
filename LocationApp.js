import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import BleManager from 'react-native-ble-manager'; // Import the Bluetooth library

const LocationApp = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Request location permission before accessing the location API
    requestLocationPermission();

    // Initialize Bluetooth Manager
    BleManager.start({ showAlert: false });
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'Failed to get location. Please make sure location services are enabled.'
      );
    }
  };

  const openMaps = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Location not available');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>
        {location
          ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
          : 'Press the button to get the current location'}
      </Text>
      <Button title="Get Current Location" onPress={getCurrentLocation} style={styles.button} />
      <Text style={styles.locationText}>Press the button to open the current location</Text>
      <Button title="Open Maps" onPress={openMaps} style={[styles.button, styles.marginTop20]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  locationText: {
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    marginBottom: 20,
    marginTop: 20,
  },
});

export default LocationApp;
