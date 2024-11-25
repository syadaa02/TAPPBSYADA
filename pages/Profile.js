import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const Profile = ({ navigation }) => { 
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/syadaa02')
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching GitHub data:', error));
  }, []);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.profilePage}>
      <View style={styles.profileCard}>
        <View style={styles.profileImage}>
          <Image source={{ uri: userData.avatar_url }} style={styles.image} />
        </View>
        <Text style={styles.name}>{userData.name || 'Syada Saleha'}</Text>
        <Text style={styles.nim}>NIM: 21120122120011</Text>
        <TouchableOpacity onPress={() => Linking.openURL(userData.html_url)}>
          <Text style={styles.link}>Visit GitHub</Text>
        </TouchableOpacity>
      </View>

      {/* Button to navigate to About Us page */}
      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => navigation.navigate('AboutUs')} 
      >
        <Text style={styles.aboutButtonText}>About Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    padding: 30,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    textAlign: 'center',
  },
  profileImage: {
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 28,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  nim: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
  },
  link: {
    fontSize: 18,
    color: '#0073e6',
    textDecorationLine: 'underline',
  },
  aboutButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#3A8FB7',
    borderRadius: 8,
  },
  aboutButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Profile;
