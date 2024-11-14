import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoryNews = ({ route }) => {
  const { category } = route.params; // Receive category as a parameter
  const [news, setNews] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=31b55a644ffa478e8cb1db7b1ff9c9aa`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.status === 'ok' && Array.isArray(data.articles)) {
          setNews(data.articles);
        } else {
          setNews([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      }
    };

    fetchData();
  }, [category]);

  const handleCardPress = (item) => {
    // Navigate to the Detail screen with the article data as params
    navigation.navigate('Detail', { article: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Berita Kategori: {category}</Text>

      <FlatList
        data={news}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.newsItem}>
            <Image source={{ uri: item.urlToImage || 'default-image.jpg' }} style={styles.newsImage} />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    flex: 1,  // Makes the entire card clickable
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  newsContent: {
    marginLeft: 10,
    flex: 1,
  },
  newsTitle: {
    fontSize: 20,
  },
});

export default CategoryNews;
