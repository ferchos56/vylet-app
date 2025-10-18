import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
  Button,
  Dimensions,
} from "react-native";
import {
  Camera,
  CameraType,
  useCameraPermissions,
  CameraView,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { useContext, useEffect, useRef, useState } from "react";
import * as FileSystem from "expo-file-system/legacy";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../contextos/UserProvider";
import { API_URL } from "@env";
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

export default function Camara({ navigation }) {
  const route = useRoute();
  const { onSelfie } = route.params || {};
  const { dataUsuario } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [facing, setFacing] = useState("back");
  const [permissionCamera, requestPermissionCamera] = useCameraPermissions();
  const [cedula, setCedula] = useState(null);
  const [sizeHeight, setSizeHeight] = useState(0);
  const [sizeWidth, setSizeWidth] = useState(0);
  const cameraRef = useRef(null);

  const handleInformation = async () => {
    const ced = await AsyncStorage.getItem("identificador");
    setCedula(ced);
  };

  useEffect(() => {
    async () => {
      MediaLibrary.requestPermissionsAsync();
    };
    handleInformation();
  }, []);

  useEffect(() => {
    if (onSelfie) {
      setFacing("front")
    }
  }, [onSelfie]);

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        const formData = new FormData();
        formData.append("foto", {
          uri: image,
          name: "imagen.jpg",
          type: "image/jpeg",
        });
        const isSavedImg = await imgToBackend(formData);
        setImage(null);
        await dataUsuario();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const imgToBackend = async (formData) => {
    try {
      const response = await fetch(
        `${API_URL}/usuarios/actualizar-foto/${cedula}`,
        {
          method: "PUT",
          headers: { "Content-Type": "multipart/form-data" },
          body: formData,
        }
      );
    } catch (error) {
      console.log("error" + error);
    }
  };
  const takePicture = async () => {
    try {
      const data = await cameraRef.current.takePictureAsync({
        quality: 0.5, // entre 0 y 1 (30% calidad)
      });

      setImage(data.uri);
    } catch (error) {
      console.log(error);
    }
  };

  if (!permissionCamera) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permissionCamera.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button
          onPress={requestPermissionCamera}
          title="grant permission to camera"
        />
      </View>
    );
  }

  if (image) {
    return (
      <View style={styles.container}>
        <Image style={styles.completeImage} source={{ uri: image }} />

        <View style={styles.actionOverlay}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setImage(null)}
          >
            <Text style={styles.actionText}>📸 Volver a tomar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={saveImage}>
            <Text style={styles.actionText}>💾 Guardar foto</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      {/* <View >
        <Text style={{color: "#fff"}}>ghoa</Text>
      </View> */}

      {onSelfie && <View style={styles.slefieBobble}></View>}

      {/* Controles inferiores estilo iPhone */}
      <View style={styles.frontViewCam}>
        {/* Miniatura de la última foto */}
        <View
          style={{
            ...styles.insadeFrontViewCam,
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.thumbnail,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0,
              width: 80,
              height: 60,
            }}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="arrow-left-bold"
              size={35}
              color="#ffffffab"
            />
            <Text
              style={{
                color: "#ffffffab",
                textAlign: "center",
              }}
            >
              Regresar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.thumbnail,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0,
              width: 80,
              height: 60,
            }}
          >
            {/* <MaterialCommunityIcons
              name="image-refresh"
              size={30}
              color="#fff"
            /> */}
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.insadeFrontViewCam }}>
          <TouchableOpacity style={styles.thumbnail} onPress={saveImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.thumbnailImage} />
            ) : (
              <View style={styles.thumbnailPlaceholder}>
                {image ? (
                  <>
                    <Image source={{ uri: image }} />
                  </>
                ) : (
                  <>
                    <Text style={styles.icon}>🖼️</Text>
                  </>
                )}
              </View>
            )}
          </TouchableOpacity>

          {/* Botón de captura */}
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffffff",
                fontSize: 20,
              }}
            >
              Foto
            </Text>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.innerCircle} />
            </TouchableOpacity>
          </View>

          {/* Botón de cambio de cámara */}
          <TouchableOpacity
            style={styles.switchButton}
            onPress={toggleCameraFacing}
          >
            <Text style={styles.icon}>🔄</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Selector de modo (solo visual) */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  frontViewCam: {
    // backgroundColor: "white",
    position: "absolute",

    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
  },
  insadeFrontViewCam: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#fff",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  thumbnailPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff33",
    justifyContent: "center",
    alignItems: "center",
  },
  switchButton: {
    backgroundColor: "#ffffff33",
    padding: 10,
    borderRadius: 25,
  },
  icon: {
    fontSize: 20,
    color: "#fff",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#696868ff",
  },
  modeSelector: {
    position: "absolute",
    bottom: 110,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  mode: {
    color: "#aaa",
    fontSize: 14,
  },
  modeSelected: {
    color: "#fff",
    fontWeight: "bold",
  },

  completeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  actionOverlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: "#173151",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  slefieBobble: {
    position: "absolute",
    width: "70%",
    height: "40%",
    borderColor: "#fff",
    borderWidth: 2,
    top: "40%",
    left: "50%",
    transform: [{ translateX: -width * 0.34 }, { translateY: -height * 0.15 }],
    borderRadius: 150,
  },
});
