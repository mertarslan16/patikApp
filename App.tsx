import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';

const PRODUCTS = [
  {
    id: 0,
    title: 'Xiaomi Mi True Wireless Earbuds',
    imgURL:
      'https://m.media-amazon.com/images/I/51uguxa9nYL._AC._SR360,460.jpg',
    price: '₺134,77',
    inStock: true,
  },
  {
    id: 1,
    title: 'General Mobile GM 20',
    imgURL:
      'https://m.media-amazon.com/images/I/51lK00mvFaL._AC._SR180,230.jpg',
    price: '₺1.810,21',
    inStock: true,
  },
  {
    id: 2,
    title: 'Philips 58PUS8505/62 The One',
    imgURL:
      'https://m.media-amazon.com/images/I/71zLCzJcXaL._AC._SR360,460.jpg',
    price: '₺6.992,25',
    inStock: false,
  },
  {
    id: 3,
    title: 'LG 49UM7100PLB Ultra HD 4K',
    imgURL:
      'https://m.media-amazon.com/images/I/71gAldY8eGL._AC._SR360,460.jpg',
    price: '₺4.614,38',
    inStock: true,
  },
  {
    id: 4,
    title: 'Samsung Galaxy M31 SM-M315F',
    imgURL:
      'https://m.media-amazon.com/images/I/71mUIp9oCXL._AC._SR360,460.jpg',
    price: '₺2.995,80',
    inStock: true,
  },
  {
    id: 5,
    title: 'Apple AirPods Series 2',
    imgURL:
      'https://m.media-amazon.com/images/I/51XanmiXw0L._AC._SR360,460.jpg',
    price: '₺1.299,00',
    inStock: true,
  },
  {
    id: 6,
    title: 'Lenovo Tab M10 Plus',
    imgURL:
      'https://m.media-amazon.com/images/I/81JR-A35D0L._AC._SR360,460.jpg',
    price: '₺2.496,50',
    inStock: false,
  },
  {
    id: 7,
    title: 'Xiaomi Redmi 20000 Mah',
    imgURL:
      'https://images-na.ssl-images-amazon.com/images/I/41vVdTukkgL._AC_SX522_.jpg',
    price: '₺134,70',
    inStock: false,
  },
  {
    id: 8,
    title: 'Xiaomi Mijia Smart Home 360',
    imgURL:
      'https://images-na.ssl-images-amazon.com/images/I/31G-rIrW9zL._AC_UL320_SR226,320_.jpg',
    price: '₺269,73',
    inStock: true,
  },
  {
    id: 9,
    title: 'Xiaomi Mi Box S 4K Ultra HD',
    imgURL:
      'https://images-na.ssl-images-amazon.com/images/I/31sNKUGwNUL._AC_.jpg',
    price: '₺478,53',
    inStock: true,
  },
  {
    id: 10,
    title: 'Haylou Solar LS-5 Smartwatch',
    imgURL:
      'https://images-na.ssl-images-amazon.com/images/I/51kfZ4W9YSL._AC_SX522_.jpg',
    price: '₺296,00',
    inStock: true,
  },
];

const ProductCard = ({item}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: item.imgURL}} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
        {!item.inStock && (
          <View style={styles.outOfStockContainer}>
            <Text style={styles.outOfStockText}>STOKTA YOK</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  useEffect(() => {
    const filtered = PRODUCTS.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const renderItem = ({item}) => <ProductCard item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PATIKASTORE</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Ara..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {filteredProducts.length === 0 ? (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>Ürün bulunamadı.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: Dimensions.get('window').width / 2 - 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 170,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  cardContent: {
    padding: 5,
  },
  title: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  outOfStockContainer: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  outOfStockText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
  },
});

export default App;
