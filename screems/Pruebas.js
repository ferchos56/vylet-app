import { API_URL } from '@env';
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';


const Pruebas = () => {
  const [imagen, setImagen] = useState(null);

  const handlePureba = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      alert('Se necesita permiso para acceder a tus fotos');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  }


  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.container}>
        <Text >Pruebas</Text>

        {imagen && (
          <Image source={{ uri: imagen }} style={{ width: 200, height: 200, marginBottom: 20 }} />
        )}
        <TouchableOpacity style={styles.loginButton}  onPress={handlePureba}>
         <Text style={styles.loginText}>Prueba</Text>
        </TouchableOpacity>

        

        <Text style={styles.version}>VS 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a1a2f',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
    marginTop: 50,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff1e',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#ccc',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 50,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#000000ff',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    width: 100,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  linkText: {
    color: '#cccccc7a',
    fontSize: 14,
  },
  version: {
    color: '#fff',
    fontSize: 12,
    marginTop: 100,
  },
});

export default Pruebas;
