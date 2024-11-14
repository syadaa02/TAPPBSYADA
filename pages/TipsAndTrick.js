import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TipsAndTricks = () => {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchArticles = async () => {
      const apiUrl = `https://newsapi.org/v2/everything?q=tips+and+tricks&apiKey=31b55a644ffa478e8cb1db7b1ff9c9aa`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.status === 'ok' && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const openDetail = (article) => {
    navigation.navigate('Detail', { article });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openDetail(item)} style={styles.card}>
      <Image source={{ uri: item.urlToImage || 'default-image.jpg' }} style={styles.image} />
      <View style={styles.textContent}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tips and Tricks</Text>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
});

export default TipsAndTricks;