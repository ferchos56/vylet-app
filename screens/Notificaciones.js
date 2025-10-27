import React, { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contextos/authProvider";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../styles/colors.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PermisosScreen() {
  const navigation = useNavigation();
  const [notificaciones, setNotificaciones] = useState([
    {
      title: "Error al cambiar contraseña",
      descripcion:
        "Prueba de notificación de error al cambiar contraseña debido a que tal tal tal tal tal",
      data: { pantalla: "PantallaUno" },
      type: "error",
    },
    {
      title: "Contraseña cambiada",
      descripcion:
        "Tu contraseña ha sido cambiada debido a que tal tal tal tal tal",
      data: { pantalla: "PantallaUno" },
      type: "success",
    },
    {
      title: "La contraseña expira pronto",
      descripcion:
        "Tu contraseña expirará en 3 días, por favor cámbiala para evitar inconvenientes",
      data: { pantalla: "PantallaUno" },
      type: "warning",
    },
    {
      title: "Nueva promoción disponible",
      descripcion:
        "Hay una nueva promoción disponible en la app, ¡échale un vistazo!",
      data: { pantalla: "PantallaUno" },
      type: "promo",
    },
  ]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <View>
        {!notificaciones || notificaciones.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: "100%",
            }}
          >
            <View>
              <Text style={{ ...styles.titles, textAlign: "center" }}>
                Todo al dia
              </Text>
              <Text style={{ ...styles.texts, textAlign: "center" }}>
                No hay notificaciones en este momento
              </Text>
            </View>
          </View>
        ) : (
          <View>
            {notificaciones.map((notf, key) => {
              return (
                <View key={key} style={styles.notificaciones}>
                  <TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ position: "relative" }}>
                        <MaterialCommunityIcons
                          name="bell"
                          size={24}
                          color="white"
                        />
                        <View
                          style={{
                            position: "absolute",
                            top: 17,
                            right: 1,
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: notf.type === "success" ? "#00d41cff" : notf.type === "error" ? "red" : notf.type === "warning" ? "yellow" : notf.type === "promo" ? "orange" : "white", // Cambia a 'red' o 'yellow'
                          }}
                        />
                      </View>

                      <View style={{ width: "90%", marginLeft: 5 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            {notf.title.length > 30
                              ? notf.title.substring(0, 23) + "..."
                              : notf.title}
                          </Text>
                          <Text style={{ color: "white" }}>20/1/2025</Text>
                        </View>

                        <Text style={{ color: "white" }}>
                          {notf.descripcion}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.contenedorBg,
    padding: 10,
  },

  container: {
    flex: 1,
  },
  titles: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  texts: {
    color: "#fff",
    fontSize: 15,
  },

  notificaciones: {
    backgroundColor: "#09203dff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
