import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Text } from 'react-native';

const CargandoOverlay = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size={45} color="#fff"  />
      <Text style={styles.textos}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').height - 170,    
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,    
  },
  textos: {
    color: "#fff",
    fontSize: 16    
  }
});

export default CargandoOverlay;
