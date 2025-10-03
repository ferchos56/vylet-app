import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contextos/authProvider';
import { colors } from '../styles/colors';

export default function DetalleHotelOroVerde() {
  const { userToken, checkUserToken } = useAuth();
  const navigation = useNavigation();

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
    if (!userToken) {
      navigation.reset({ index: 0, routes: [{ name: 'LoginUsu' }] });
    }
  }, [userToken])

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Imagen principal con botones */}
        <View style={styles.promocion}>
          <Image source={require('../assets/hotel1.jpg')} style={styles.imagenPrincipal} />
          <View style={styles.botonesBanner}>
            <TouchableOpacity style={styles.botonCircular}>
              <Text style={styles.iconoBoton}>🌐</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonCircular}>
              <Text style={styles.iconoBoton}>🖼️</Text>
            </TouchableOpacity>
          </View>

          {/* Contenedor superpuesto */}
          <View style={styles.infoBox}>
            <Text style={styles.titulo}>HOTEL ORO VERDE</Text>
            <View style={styles.tabs}>
              <Text style={styles.tabActivo}>INFORMACIÓN</Text>
              <Text style={styles.tabInactivo}>DISPONIBILIDAD</Text>
            </View>

            <Text style={styles.detalle}>🏷️ Habitaciones desde: <Text style={styles.valor}>20$ - 200$</Text></Text>
            <Text style={styles.detalle}>🛎️ Servicios: Parqueadero, wifi, gym</Text>
            <Text style={styles.detalle}>📞 Contactos: 0983897277 - 0986754855</Text>
            <Text style={styles.detalle}>⭐ Calificación: <Text style={styles.valor}>★★★★★</Text></Text>
            <Text style={styles.detalle}>📍 Ubicación: av. La Mariscal y Río Coca</Text>


            {/* Restaurantes cercanos */}
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





          </View>

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
  scroll: {
    flexGrow: 1,


  },
  promocion: {
    position: 'relative',


  },
  imagenPrincipal: {
    width: '100%',
    height: 250,
  },
  botonesBanner: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 12,
  },
  botonCircular: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0077B6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconoBoton: {
    color: '#fff',
    fontSize: 18,
  },
  infoBox: {
    marginTop: -60, 
    backgroundColor: colors.contenedorBg,
    borderRadius: 12,
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    padding: 16,
    elevation: 6,
    zIndex: 10,
    width: '100%',
    height: '100%',


  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 12,
  },
  tabActivo: {
    color: '#00b4d8',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabInactivo: {
    color: '#ccc',
    fontSize: 14,
  },
  detalle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 6,
  },
  valor: {
    color: '#00b4d8',
    fontWeight: 'bold',
  },
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
