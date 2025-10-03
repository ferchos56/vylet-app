import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,

} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import * as ImagePicker from 'expo-image-picker';
import { useAdmin } from '../../../contextos/AdminProvider';


const imagenes = {
  banner: require('../../../assets/vyletlogo.jpg'),
  portada: require('../../../assets/vyletlogo.jpg'),
  otras: [
    1, 2, 3, 4, 5
  ],
};

const GridFotos = () => {
  const [banner, setBanner] = useState(null);
  const [portada, setPortada] = useState(null);
  const [otras, setOtras] = useState([]);

  const seleccionarImagenes = async (tipo) => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: tipo === 'otras',
      quality: 1,
    });

    if (!resultado.canceled) {
      if (tipo === 'banner') setBanner(resultado.assets[0]);
      else if (tipo === 'portada') setPortada(resultado.assets[0]);
      else if (tipo === 'otras') setOtras(resultado.assets);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titles}>Fotos</Text>

      <View style={styles.containerBoxes}>
        <TouchableOpacity
          style={styles.touchableItemImageTotally}
          onPress={() => seleccionarImagenes('banner')}
        >
          {banner ? (<Image source={{ uri: banner.uri }} style={styles.banner} />) : (<Text style={{ color: '#fff' }}>Banner</Text>)}
        </TouchableOpacity>

      </View>

      <View style={styles.containerBoxes}>
        <TouchableOpacity
          style={styles.touchableItemImageTotally}
          onPress={() => seleccionarImagenes('portada')}
        >
          {portada ? (<Image source={{ uri: portada.uri }} style={styles.portada} />) : (<Text style={{ color: '#fff' }}>Portada</Text>)}
        </TouchableOpacity>
      </View>

      <View style={styles.containerBoxes}>
        <TouchableOpacity
          style={styles.touchableItemImage}
          onPress={() => seleccionarImagenes('otras')}
        >
          <Text style={{ color: '#fff' }}>Subir mas fotos</Text>

        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {otras.map((img, index) => (
          <View key={index} style={styles.item}>
            <Image source={{ uri: img.uri }} style={styles.image} />
          </View>
        ))}
      </View>
    </View>
  );
};

function FormularioHoteles({ onCancelForm }) {
  const { region, buscarDireccion, direccion, setDireccion, setRegion } = useAdmin();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [ciudadData, setCiudadData] = useState({});
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [paginaWeb, setPaginaWeb] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [whatsapp, setWhatsapp] = useState('');


  const mapRef = useRef(null);
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ ...styles.titles, fontSize: 18, }}>Formulario para hoteles</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Titulo"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción"
        placeholderTextColor="#aaa"
        multiline
      />
      <Text style={styles.label}>Ubicado en: {direccion}</Text>
      <Text style={styles.titles}>Redes sociales y contacto</Text>
      <View style={styles.containerNetworks}>
        <View style={styles.rowNetworks}>
          <Icon name="facebook" size={27} color="#007AFF" />
          <TextInput
            style={{ ...styles.input, width: '90%', marginBottom: 0 }}
            value={facebook}
            onChangeText={setFacebook}
            placeholder="https://facebook.com/tu-pagina"
            placeholderTextColor="#747474ff"
          />
        </View>
        <View style={styles.rowNetworks}>
          <Icon name="instagram" size={25} color="#C13584" />
          <TextInput
            style={{ ...styles.input, width: '90%', marginBottom: 0 }}
            value={instagram}
            onChangeText={setInstagram}
            placeholder="https://instagram.com/tu-pagina"
            placeholderTextColor="#747474ff"
          />
        </View>
        <View style={styles.rowNetworks}>
          <Icon2 name="tiktok" size={20} color="#FE2C55" />
          <TextInput
            style={{ ...styles.input, width: '90%', marginBottom: 0 }}
            value={tiktok}
            onChangeText={setTiktok}
            placeholder="https://instagram.com/tu-pagina"
            placeholderTextColor="#747474ff"
          />
        </View>
        <View style={styles.rowNetworks}>
          <Icon name="globe" size={20} color="#ffffffff" />
          <TextInput
            style={{ ...styles.input, width: '90%', marginBottom: 0 }}
            value={paginaWeb}
            onChangeText={setPaginaWeb}
            placeholder="https://tupaginaweb.com"
            placeholderTextColor="#747474ff"
          />
        </View>
        <View style={styles.rowNetworks}>
          <Icon name="whatsapp" size={20} color="#25D366" />
          <TextInput
            style={{ ...styles.input, width: '90%', marginBottom: 0 }}
            value={whatsapp}
            onChangeText={setWhatsapp}
            placeholder="Ingresa tu numero de whatsapp"
            placeholderTextColor="#747474ff"
          />
        </View>

      </View>
      <GridFotos />

      <Text style={styles.titles}>
        Ubicacion
      </Text>

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: "center", marginTop: 5 }}>
        <TextInput
          style={{ ...styles.input, width: '85%', }}
          placeholder="Buscar dirección..."
          value={direccion}
          onChangeText={setDireccion}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={{ ...styles.saveButton, width: "13%", borderRadius: "20%" }} onPress={buscarDireccion}>
          <Icon name="search" size={15} color="#fff" />
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        style={{ height: 200, marginVertical: 20 }}
        region={region}
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setCiudadData({ ...ciudadData, latitud_ciudad: latitude, longitud_ciudad: longitude });
          setRegion({ ...region, latitude, longitude });

        }}
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
      </MapView>
      <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity style={{ ...styles.saveButton, width: "48%", marginRight: "4%" }}>
          <Text style={styles.saveText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.saveButton, width: "48%", marginRight: "4%", backgroundColor: "#e74c3c" }} onPress={onCancelForm}>
          <Text style={styles.saveText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FormularioHoteles;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a1a2f',
  },
  scrollContent: {
    padding: 20,
  },
  titles: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 5,
  },
  pickerContainer: {
    backgroundColor: '#ffffff1e',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    color: '#fff',
    marginHorizontal: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff1e',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,

  },
  container: {
    padding: 5,
  },
  label: {
    color: '#d8d8d8ff',
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  banner: {
    width: '100%',
    height: 140,
    borderRadius: 12,

  },
  portada: {
    width: '100%',
    height: 140,
    borderRadius: 12,

  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '40%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',


  },
  touchableItemImageTotally: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff1e',
    height: 140,
    borderRadius: 12,
  },

  touchableItemImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff1e',
    height: 50,
    borderRadius: 12,
  },
  containerBoxes: {
    marginBottom: 20,
  },
  rowNetworks: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    gap: 10,
    width: '100%',
    justifyContent: 'center'
  },
  containerNetworks: {
    gap: 10,
    marginVertical: 10,

  }
});
