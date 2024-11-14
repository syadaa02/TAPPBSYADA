import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      const response = await axios.get('http://api.weatherstack.com/current', {
        params: {
          access_key: '3eea658db21e5eb6c8da36f55e45ee3e',
          query: 'Semarang',
        },
      });
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {weatherData && (
        <>
          <Text style={styles.city}>{weatherData.location.name}, {weatherData.location.country}</Text>
          <Text style={styles.temperature}>{weatherData.current.temperature}°C</Text>
          <Text style={styles.condition}>{weatherData.current.weather_descriptions[0]}</Text>
          <Text style={styles.time}>Updated at: {weatherData.current.observation_time}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  condition: {
    fontSize: 18,
    marginVertical: 5,
  },
  time: {
    fontSize: 14,
    color: 'gray',
  },
});

export default WeatherPage;
