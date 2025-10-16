import { API_URL } from "@env";
import React, { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contextos/authProvider";

import { colors } from "../styles/colors.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../contextos/UserProvider.js";

const { width } = Dimensions.get("window");

export default function Pruebas() {
  const navigation = useNavigation();
  const { usuario, dataUsuario } = useContext(UserContext);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");

  const [imagenInvalida, setImagenInvalida] = useState(false);

  const actualizarUsuario = async () => {
    if (!correo || !celular || !tipo) {
      Alert.alert("❌", "Todos los campos son obligatorios");
      return;
    }

    setActualizando(true);
    try {
      const response = await fetch(
        `${API_URL}/usuarios/actualizar-usuario/${usuario.id_usuario}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correo,
            celular,
            tipo_usuario: tipo,
          }),
        }
      );

      const resultado = await response.json();
      Alert.alert("✅", resultado.mensaje || "Usuario actualizado");
      navigation.goBack();
    } catch (error) {
      Alert.alert("❌", "Error al actualizar usuario");
    } finally {
      setActualizando(false);
    }
  };
  const handleInformacionForm = () => {
    setNombre(usuario?.nombres + " " + usuario?.apellidos);
    setCorreo(usuario?.correo);
    setCelular(usuario?.celular.toString());

    setCiudad(usuario?.ciudad_use);
    setPais(usuario?.pais_use);
  };

  useEffect(() => {
    if (!usuario) {
      console.error(
        "No se pudo extraer la informacion de usuario algo salio mal"
      );
      return;
    }
    handleInformacionForm();
  }, [usuario]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity>
            <Image
              style={styles.imageProfile}
              source={
                !usuario?.foto_use || imagenInvalida
                  ? require("../assets/vyleticono.png")
                  : { uri: usuario.foto_use }
              }
              onError={() => setImagenInvalida(true)}
            />
          </TouchableOpacity>
          <Text style={{ ...styles.title }}>
            {" "}
            {usuario?.nombres} {usuario?.apellidos}
          </Text>
          <Text style={{ ...styles.title, fontSize: 13, color: "#ffffff75" }}>
            {usuario?.tipo_usuario}
          </Text>
        </View>

        <View style={styles.bodyConfig}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {!modoEdicion ? (
                <>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                    onPress={() => setModoEdicion(!modoEdicion)}
                  >
                    <MaterialCommunityIcons
                      name="pencil"
                      size={24}
                      color="#fff"
                    />
                    <Text style={{ color: "#fff" }}>Editar</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                    onPress={() => setModoEdicion(!modoEdicion)}
                  >
                    <MaterialCommunityIcons
                      name="content-save"
                      size={24}
                      color="#7bff00ff"
                    />
                    <Text style={{ color: "#7bff00ff" }}>Guardar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          <Text style={{ ...styles.title, marginBottom: 15 }}>
            Informacion personal
          </Text>
          <View>
            <Text style={{ ...styles.title, fontSize: 15 }}>Nombre</Text>

            <TextInput
              style={{
                ...styles.title,
                fontSize: 15,
                paddingLeft: 5,
                color: "#ffffff9d",
                fontWeight: "noraml",
                borderBottomWidth: modoEdicion ? 1 : 0,
                borderBottomColor: "#ffffff60",
                paddingBottom: 4,
              }}
              readOnly={modoEdicion ? false : true}
              onChangeText={setNombre}
              value={nombre}
            />

            <Text style={{ ...styles.title, fontSize: 15 }}>Correo</Text>

            <TextInput
              style={{
                ...styles.title,
                fontSize: 15,
                paddingLeft: 5,
                color: "#ffffff9d",
                fontWeight: "noraml",
                borderBottomWidth: modoEdicion ? 1 : 0,
                borderBottomColor: "#ffffff60",
                paddingBottom: 4,
              }}
              readOnly={modoEdicion ? false : true}
              onChangeText={setCorreo}
              value={correo}
            />

            <Text style={{ ...styles.title, fontSize: 15 }}>Celular</Text>

            <TextInput
              style={{
                ...styles.title,
                fontSize: 15,
                paddingLeft: 5,
                color: "#ffffff9d",
                fontWeight: "noraml",
                borderBottomWidth: modoEdicion ? 1 : 0,
                borderBottomColor: "#ffffff60",
                paddingBottom: 4,
              }}
              readOnly={modoEdicion ? false : true}
              onChangeText={setCelular}
              value={celular}
            />

            <Text style={{ ...styles.title, fontSize: 15 }}>Ciudad</Text>

            <TextInput
              style={{
                ...styles.title,
                fontSize: 15,
                paddingLeft: 5,
                color: "#ffffff9d",
                fontWeight: "noraml",
                borderBottomWidth: modoEdicion ? 1 : 0,
                borderBottomColor: "#ffffff60",
                paddingBottom: 4,
              }}
              readOnly={modoEdicion ? false : true}
              onChangeText={setCiudad}
              value={ciudad}
            />

            <Text style={{ ...styles.title, fontSize: 15 }}>Pais</Text>

            <TextInput
              style={{
                ...styles.title,
                fontSize: 15,
                paddingLeft: 5,
                color: "#ffffff9d",
                fontWeight: "noraml",
                borderBottomWidth: modoEdicion ? 1 : 0,
                borderBottomColor: "#ffffff60",
              }}
              readOnly={modoEdicion ? false : true}
              onChangeText={setPais}
              value={pais}
            />

            {/* <TouchableOpacity
              style={{
                ...styles.touchableSettingsBody,
                marginTop: 20,
                backgroundColor: "#b10000ff",
              }}
            >
              <MaterialCommunityIcons name="delete" size={24} color="#fff" />

              <Text
                style={{ ...styles.title, fontSize: 14, color: "#ffffffff" }}
              >
                Eliminar cuenta
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.contenedorBg,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
  },

  topContainer: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#041831ff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  bodyConfig: {
    marginVertical: 10,
    backgroundColor: "#041831ff",
    borderRadius: 10,
    padding: 15,
  },

  imageProfile: {
    width: 70,
    height: 70,
    borderRadius: 40,
    margin: 10,
  },

  touchableSettingsBody: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#041831ff",
    marginVertical: 2,
    borderRadius: 10,
  },
});
