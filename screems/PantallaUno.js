import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contextos/authProvider';


const { width } = Dimensions.get('window');

const images = [
  { src: require('../assets/quito.jpg'), title: '¡Viva Quito! 🎉', subtitle: '484 AÑOS DE FUNDACIÓN' },
  { src: require('../assets/guayaquil.jpg'), title: 'Costa', subtitle: 'Playas y sol todo el año' },
  { src: require('../assets/cuenca.jpg'), title: 'Sierra', subtitle: 'Montañas y cultura' },
];

const imagenesPorRegion = {
  Sierra: require('../assets/sierra.jpg'),
  Costa: require('../assets/costa.jpg'),
  Oriente: require('../assets/oriente.jpg'),
  Galapagos: require('../assets/galapagos.jpg'),
};

export default function PantallaUno() {
  const {userToken, checkUserToken} = useAuth();
  const navigation = useNavigation();
  const scrollRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [regionActiva, setRegionActiva] = useState('Costa');

  const onScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };



  useEffect(() => {
    if (!userToken){
      navigation.reset({index: 0, routes: [{ name: 'LoginUsu' }]});
    }
  }, [userToken])

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Carrusel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
            {images.map((item, index) => (
              <View key={index} style={styles.banner}>
                <Image source={item.src} style={styles.bannerImage} />
                <View style={styles.bannerOverlay}>
                  <Text style={styles.bannerTitle}>{item.title}</Text>
                  <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                  <TouchableOpacity
                    style={styles.bannerButton}
                    onPress={() => navigation.navigate('detallesFiestas')}
                  >
                    <Text style={styles.bannerButtonText}>Ver más</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.dots}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* Categorías */}
        <View style={styles.categories}>
          {[
            { label: 'Ciudades', icon: '🏙️', destino: 'ciudad' },
            { label: 'Hoteles', icon: '🏨', destino: 'hoteles' },
            { label: 'Turismo', icon: '🗺️', destino: 'turismo' },
            { label: 'Festividad', icon: '🎊', destino: 'fiestas' },
            { label: 'Diversión', icon: '🎭', destino: 'diversion' },
            { label: 'Restaurante', icon: '🍽️', destino: 'restaurantes' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => navigation.navigate(item.destino)}
            >
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Regiones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Regiones</Text>

          <View style={styles.filtrosRegiones}>
            {['Sierra', 'Costa', 'Oriente', 'Galapagos'].map((region) => (
              <TouchableOpacity
                key={region}
                style={[
                  styles.botonFiltro,
                  regionActiva === region && styles.botonActivo,
                ]}
                onPress={() => setRegionActiva(region)}
              >
                <Text style={styles.textoFiltro}>{region}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Image
            source={imagenesPorRegion[regionActiva]}
            style={styles.sectionImage}
          />
        </View>

        {/* Próximas Fiestas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Fiestas</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.fiestasScroll}
          >
            {[
              { nombre: 'Fiestas de Quito', imagen: require('../assets/quito.jpg'), destino: 'Ciudades' },
              { nombre: 'Pregón de Ibarra', imagen: require('../assets/guayaquil.jpg'), destino: 'Ciudades' },
              { nombre: 'Fiestas de Loja', imagen: require('../assets/cuenca.jpg'), destino: 'Ciudades' },
              { nombre: 'Carnaval de Ambato', imagen: require('../assets/oriente.jpg'), destino: 'Ciudades' },
              { nombre: 'Fiestas de Cuenca', imagen: require('../assets/cuenca.jpg'), destino: 'Ciudades' },
            ].map((fiesta, index) => (
              <TouchableOpacity
                key={index}
                style={styles.fiestasCard}
                onPress={() => navigation.navigate(fiesta.destino)}
              >
                <Image source={fiesta.imagen} style={styles.fiestasImage} />
                <View style={styles.fiestasOverlay}>
                  <Text style={styles.fiestasText}>{fiesta.nombre}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a1a2f',
  },
  scrollContent: {
    paddingBottom: 0,
  },

  // Carrusel
  carouselContainer: {
    height: 230,
  },
  banner: {
    width: Dimensions.get('window').width,
    height: 230,
    position: 'relative',
    alignItems: 'center',
  },
  bannerImage: {
    width: '90%',
    height: '100%',
    borderRadius: 10,
  },
  bannerOverlay: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  bannerButton: {
    backgroundColor: '#173151',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  bannerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },

  // Categorías
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  categoryCard: {
    width: '30%',
    backgroundColor: '#0f2239',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 6,
    color: '#fff',
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },

  // Secciones
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  // Regiones (estilo tipo filtro)
  filtrosRegiones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  botonFiltro: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#173151',
  },
  botonActivo: {
    backgroundColor: '#0077B6',
  },
  textoFiltro: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },

  // Fiestas
  fiestasScroll: {
    paddingHorizontal: 8,
  },
  fiestasCard: {
    width: 140,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#173151',
  },
  fiestasImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fiestasOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  fiestasText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
