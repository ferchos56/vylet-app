import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export const configurarNotificaciones = async (identificador) => {
  if (identificador){
    const cedula = identificador
  }else{
    const cedula = await AsyncStorage.getItem("identificador");
    if (!cedula) return; // aún no logeado
  }


  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") return;

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  const tokenGuardado = await AsyncStorage.getItem("expoPushToken");

  if (token !== tokenGuardado) {
    await fetch(`${API_URL}/app/guardar-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cedula, token }),
    });

    await AsyncStorage.setItem("expoPushToken", token);
  }
};
