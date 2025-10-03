import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ Importar
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();

  // Valores animados
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useEffect(() => {
    // Inicia animación del logo
    opacity.value = withTiming(1, { duration: 4000, easing: Easing.out(Easing.exp) });
    translateY.value = withTiming(0, { duration: 4000, easing: Easing.out(Easing.exp) });

    // Redirige a LoginUsu después de 4.5 segundos
    const timer = setTimeout(() => {
      const verificarSesion = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Drawer',
                    params: { screen: 'Inicio' },
                  },
                ],
              });
      
            }else{
              navigation.replace('LoginUsu');
            }
          };
        verificarSesion();
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  // Estilo animado
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      
  <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <Text style={styles.logoText}>
          Vylet <Text style={styles.pin}>📍</Text>
        </Text>
      </Animated.View>

      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image source={require('../assets/facebook.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.infinity}>∞</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/instagram.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>V1.0.0</Text>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   safeArea: {
    flex: 1,
    backgroundColor: '#0a1a2f', // Fondo oscuro en toda la pantalla
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  pin: {
    fontSize: 32,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    
  },
  icon: {
    width: 32,
    height: 32,
  },
  infinity: {
    fontSize: 32,
    color: '#fff',
  },
  version: {
    fontSize: 12,
    color: '#fff',
    
  },
});

export default HomeScreen;


