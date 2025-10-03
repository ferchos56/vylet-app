import React, { useLayoutEffect, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImmersiveMode from 'react-native-immersive';
import { useAuth } from '../contextos/authProvider';

export default function DetalleBus() {
  const {userToken, checkUserToken} = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;

  // Oculta la tab bar si estás usando Bottom Tabs
  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    
  }, [navigation]);

  useEffect(() => {
    if (!userToken){
      navigation.reset({index: 0, routes: [{ name: 'LoginUsu' }]});
    }
  }, [userToken])

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={data.imagen} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{data.nombre}</Text>
        <Text style={styles.pasajes}>Pasajes: {data.pasajes}</Text>
        <Text style={styles.telefonos}>📞 {data.telefonos}</Text>

        {/* Botones de navegación */}
        <View style={styles.botones}>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('TerminalCarcelen')}
          >
            <Text style={styles.textoBoton}>Volver al terminal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('QuitoInfoScreen')}
          >
            <Text style={styles.textoBoton}>Ir a Quito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a1a2f',
  },
  imagen: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 16,
  },
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  pasajes: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 4,
  },
  telefonos: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 16,
  },
  botones: {
    marginTop: 20,
  },
  boton: {
    backgroundColor: '#0077B6',
    padding: 12,
    borderRadius: 25,
    marginBottom: 12,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
