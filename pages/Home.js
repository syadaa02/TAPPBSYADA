// Home.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=31b55a644ffa478e8cb1db7b1ff9c9aa`;

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
  }, []);

  const handleSearch = () => {
    setIsSearchClicked(true);
    const filtered = news.filter((newsItem) =>
      newsItem.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNews(filtered);

    setSearchQuery("");
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const openArticle = (article) => {
    navigation.navigate('Detail', { article });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search news..."
          value={searchQuery}
          onChangeText={handleSearchChange}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {isSearchClicked ? (
        <View style={styles.results}>
          <View style={styles.resultsHeader}>
            <TouchableOpacity onPress={() => setIsSearchClicked(false)} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.resultsHeaderText}>Hasil Pencarian</Text>
          </View>

          {filteredNews.length === 0 ? (
            <Text style={styles.noResultsText}>Tidak ada hasil yang cocok dengan kata kunci</Text>
          ) : (
            <FlatList
              data={filteredNews}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.newsItem} 
                  onPress={() => openArticle(item)}
                >
                  <Image source={{ uri: item.urlToImage || 'default-image.jpg' }} style={styles.newsImage} />
                  <View style={styles.newsContent}>
                    <Text style={styles.newsTitle}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      ) : (
        <>
          <Text style={styles.sectionHeader}>News Populer</Text>
          <FlatList
            data={news}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.popularNewsItem}
                onPress={() => openArticle(item)}
              >
                <Image source={{ uri: item.urlToImage || 'default-image.jpg' }} style={styles.popularNewsImage} />
                <View style={styles.popularNewsContent}>
                  <Text style={styles.popularNewsTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />

          <Text style={styles.sectionHeader}>News Lainnya</Text>
          <FlatList
            data={news.slice(3)}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.newsItem}
                onPress={() => openArticle(item)}
              >
                <Image source={{ uri: item.urlToImage || 'default-image.jpg' }} style={styles.newsImage} />
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchInput: {
    width: '80%',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: '#3A8FB7',
    borderWidth: 1,
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  resultsHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 15,
    marginRight: 15,
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  newsContent: {
    flex: 1,
    overflow: 'hidden',
  },
  newsTitle: {
    fontSize: 20,
    flexShrink: 1,
    overflow: 'hidden',
  },
  popularNewsItem: {
    flexDirection: 'column',
    marginRight: 15,
    width: 300,
    height: 300,
  },
  popularNewsImage: {
    width: 300,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
  },
  popularNewsContent: {
    flex: 1,
    overflow: 'hidden',
  },
  popularNewsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    flexShrink: 1,
    overflow: 'hidden',
  },
});

export default Home;
