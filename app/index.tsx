import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import Ionicons from '@expo/vector-icons/Ionicons';

const API_KEY = '';

export default function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async (city: String) => {
        setLoading(true);

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            setWeather(response.data);
        }
        catch (error) {
            console.log("Error fetching weather data:", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (city) fetchWeather(city);
    }, [city]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weather App</Text>

            <TextInput style={styles.input}
                       placeholder="Enter city name"
                       value={city}
                       onChangeText={(text) => setCity(text)}
                       />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            {weather && (
                <View style={styles.weatherContainer}>
                    <Text style={styles.cityName}>{weather.name}</Text>
                    <Text style={styles.temp}>{weather.main.temp}°C</Text>
                    <Text style={styles.description}>{weather.weather[0].description}</Text>
                    <Ionicons name="cloud" size={50} color="#555" />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    input: {
        width: '80%',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },

    weatherContainer: {
        alignItems: 'center',
    },

    cityName: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    temp: {
        fontSize: 40,
        fontWeight: 'bold',
    },

    description: {
        fontSize: 16,
        color: '#555',
        marginVertical: 5,
    },
})