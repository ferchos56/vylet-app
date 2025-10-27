import { useEffect, useState } from 'react';
// import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert } from 'react-native';

export function useNotifications({ onReceive }) {
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    const setupNotifications = async () => {
      if (!Device.isDevice) {
        console.warn('Las notificaciones solo funcionan en dispositivos físicos');
        return;
      }

      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status: newStatus } = await Notifications.requestPermissionsAsync();
          finalStatus = newStatus;
        }

        if (finalStatus !== 'granted') {
          Alert.alert('Permiso denegado para notificaciones');
          return;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('✅ Expo Push Token:', token);
        setExpoPushToken(token);
        // Podés enviarlo al backend aquí si querés
      } catch (error) {
        console.error('❌ Error al configurar notificaciones:', error);
        Alert.alert('Error al obtener token de notificación');
      }
    };

    // const listener = Notifications.addNotificationReceivedListener(notification => {
    //   const { title, body, data } = notification.request.content;
    //   console.log('📩 Notificación recibida:', notification);

    //   if (onReceive) {
    //     onReceive({ title, body, data });
    //   } else {
    //     Alert.alert(title, body);
    //   }
    // });

     // setupNotifications();

    // return () => listener.remove();
  }, []);

  // return expoPushToken;
}
