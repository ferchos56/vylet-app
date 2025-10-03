// src/screens/QuitoInfoScreen.js
import React, {useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contextos/authProvider';
import {colors} from '../styles/colors';


const QuitoInfoScreen = () => {
  const {userToken, checkUserToken} = useAuth();
  const navigation = useNavigation();

  const servicios = [
    { label: 'Hoteles', icon: '🏨', route: 'hoteles' },
    { label: 'Turismo', icon: '🗺️', route: 'turismo' },
    { label: 'Festividad', icon: '🎊', route: 'Festividad' },
    { label: 'Diversión', icon: '🎭', route: 'Diversion' },
    { label: 'Restaurante', icon: '🍽️', route: 'Restaurante' },
    { label: 'Restaurante', icon: '🍽️', route: 'Restaurante' },
  ];
  const restaurantes = [
    {
      id: 'r1',
      nombre: 'Restaurante El Mirador',
      imagen: require('../assets/restaurante1.jpg'),
      destino: 'detalleRestaurante',
    },
    {
      id: 'r2',
      nombre: 'Café Colonial',
      imagen: require('../assets/restaurante2.jpg'),
      destino: 'detalleRestaurante',
    },
    {
      id: 'r3',
      nombre: 'Café Colonial',
      imagen: require('../assets/restaurante2.jpg'),
      destino: 'detalleRestaurante',
    },

  ];

  useEffect(() => {
    if (!userToken){
      navigation.reset({index: 0, routes: [{ name: 'LoginUsu' }]});
    }
  }, [userToken])

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerImageContainer}>

          <Image source={require('../assets/quito.jpeg')} style={styles.headerImage} />

        </View>

        <View style={styles.escudoWrapper}>

          <Image source={require('../assets/localisacion.jpg')} style={styles.escudo} />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.cityTitle}>QUITO</Text>
          <View style={styles.infoDetails}>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>🌦️ Clima:</Text>
              <Text style={styles.valor}>-3° - 20°</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>🏷️ Código postal:</Text>
              <Text style={styles.valor}>EC170150</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>🗻 Elevación:</Text>
              <Text style={styles.valor}>2850 msnm</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>🧑‍🤝‍🧑 Población:</Text>
              <Text style={styles.valor}>2.7 millones (2020)</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.busButton}
            onPress={() => navigation.navigate('buses')}
          >
            <Text style={styles.busButtonText}> Bus 🚌</Text>
          </TouchableOpacity>




          <Text style={styles.seccionTitulo}>Restaurantes cercanos</Text>
          <FlatList
            data={restaurantes}
            horizontal
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cardServicio}
                onPress={() => navigation.navigate(item.destino)}
              >
                <Image source={item.imagen} style={styles.imagenServicio} />
                <View style={styles.overlay}>
                  <Text style={styles.overlayTexto}>{item.nombre}</Text>
                </View>
              </TouchableOpacity>
            )}
          />


          <View style={styles.containerTitle}>
            <Text style={styles.titleServices}>Servicios cerca de Quito</Text>
          </View>

          <View style={styles.services}>
            {servicios.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceCard}
                onPress={() => navigation.navigate(item.route)}
              >
                <Text style={styles.serviceIcon}>{item.icon}</Text>
                <Text style={styles.serviceText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>



          <View style={styles.tourBox}>
            <Text style={styles.tourTitle}>🎒 Tur todo incluido</Text>
            <Text style={styles.tourPrice}>Precios: $20 - $50</Text>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a1a2f',
    position: 'relative',
  },
  scrollContent: {

  },
  headerImageContainer: {
    position: 'relative',
    alignItems: 'center',

  },
  headerImage: {
    width: '100%',
    height: 250,


  },


  escudoWrapper: {
    position: 'absolute',
    top: 10, // ajusta según la altura de tu imagen
    left: '85%',
    zIndex: 10,
    alignItems: 'center',

  },
  escudo: {
    width: 35,
    height: 35,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  cityTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff63',


  },

  infoBox: {

    padding: 20,
    backgroundColor: colors.contenedorBg,
    marginTop: -60,
    borderTopEndRadius: 60,
    borderTopLeftRadius: 60,


  },

  infoDetails: {

  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,


  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: 'bold',

  },
  valor: {
    fontSize: 14,
    color: '#00b4d8',


  },

  busButton: {
    backgroundColor: '#09203aff',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 25,
    marginTop: 12,
    alignItems: 'center',

  },
  busButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',

  },
  titleServices: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',

    paddingTop: 15,
    marginBottom: 0,
  },
  containerTitle: {

    marginTop: 10,
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  serviceCard: {
    width: '32%',
    backgroundColor: '#0f2239',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    fontSize: 30,
    marginBottom: 6,
  },
  serviceText: {
    color: '#fff',
    fontSize: 10,
  },
  tourBox: {
    backgroundColor: '#173151',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  tourTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tourPrice: {
    color: '#ccc',
    fontSize: 14,
  },
  promos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 30,
  },
  promoImage: {
    width: 140,
    height: 100,
    borderRadius: 8,
  },
  icon: {
    width: 45,
    height: 25,
    tintColor: '#ccc',
  },

  //ára borrar
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,

  },
  cardServicio: {
    position: 'relative',
    width: 160,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#173151',
    marginTop: 20,
  },
  imagenServicio: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  overlayTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});


export default QuitoInfoScreen;
