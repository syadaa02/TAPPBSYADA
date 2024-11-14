// pages/AboutUs.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>About Us</Text>
        <Text style={styles.content}>
          WartaNet is your go-to news app, providing you with the latest and most relevant news from around the world. With an easy-to-use interface, we bring you top headlines, breaking news, and insightful articles from various categories such as technology, health, entertainment, and more. Our mission is to keep you informed and connected with trustworthy, up-to-date content, all in one place. Stay updated with WartaNet – your daily source of reliable news!
        </Text>
      </View>
      <Text style={styles.footerContent}>
        -This project was created by Syada Saleha as part of the requirements for the Tugas Akhir Praktikum PPB-
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',  // This will push content to the top and bottom
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',  // Center the content vertically
    alignItems: 'center',
    marginBottom: 20,  // Adds spacing between content and footer
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
  footerContent: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
    fontStyle: 'italic', // Optional: make the text italic
  },
});

export default AboutUs;
