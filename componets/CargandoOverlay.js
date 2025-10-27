import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Text } from 'react-native';
<<<<<<< HEAD
import { colors } from '../styles/colors';
=======
>>>>>>> upstream/main

const CargandoOverlay = ({message}) => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size={45} color="#fff"  />
      {message ? <Text style={{...styles.textos}}>{message}...</Text> : <Text style={styles.textos}>Cargando...</Text>}
      
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
<<<<<<< HEAD
    backgroundColor: colors.contenedorBg,
=======
>>>>>>> upstream/main
    position: 'absolute',
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height ,    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(6, 21, 41)',
    zIndex: 9999,    
  },
  textos: {
    color: "#fff",
    fontSize: 16    
  }
});

export default CargandoOverlay;
