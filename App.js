import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { UserProvider } from "./contextos/UserProvider.js";
import { AuthProvider } from "./contextos/authProvider.js";
import { AdminProvider } from './contextos/AdminProvider.js';

// Screens
import HomeScreem from "./screems/HomeScreem.js";
import RegistrarUsu from "./screems/RegistrarUsu.js";
import LoginUsu from "./screems/loginUsu.js";
import PantallaUno from "./screems/PantallaUno.js";
import Ciudades from "./screems/ciudades.js";
import ciudad from "./screems/ciudad.js";
import turismo from "./screems/turismo.js";
import detalleDestino from "./screems/detalleDestino.js";
import hoteles from "./screems/hoteles.js";
import detalleHotel from "./screems/detallesHotel.js";
import detallesFiestas from "./screems/detallesFiestas.js";
import DetallesRestaurantes from "./screems/detallesRestaurantes.js";
import fiestas from "./screems/Fiestas.js";
import buses from "./screems/buses.js";
import detalleBus from "./screems/detallesBus.js";
import PerfilModal from "./componets/PerfilModal.js";
import MiInformacion from "./componets/MiInformacion.js";
import Camara from './componets/Camara.js';
import GestionUsuarios from './componets/admin/gestion_usu.js';
import EditarUsuario from './componets/admin/EditarUsuario.js';
import PanelAdmin from './componets/admin/panel_admin.js';
import DetallesMenu from './componets/DetallesMenu.js';
import Diversion from './screems/Diversion.js';
import Restaurantes from './screems/Restaurantes.js';
import Pruebas from './screems/Pruebas.js';
import FormularioEdicionCiudad from './componets/admin/formularios/FormularioEdicionCiudad.js';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// ✅ Header con ícono de perfil
const withProfileIcon = (title) => ({ navigation }) => ({
  title,
  headerStyle: {
    backgroundColor: '#061529ff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    color: '#ffffffff',
    fontWeight: 'bold',
    marginLeft: 200,
  },
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PerfilModal')}
      style={{ marginRight: 16 }}
    >
      <Icon name="account" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});

// ✅ Pantalla principal con ícono de perfil
function PantallaUnoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PantallaUno"
        component={PantallaUno}
        options={({ navigation }) => ({
          ...withProfileIcon('VILET')({ navigation }),
          headerLeft: () => null,
        })}
      />
    </Stack.Navigator>
  );
}

// ✅ Drawer envuelve PantallaUno
function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Inicio" component={PantallaUnoStack} />
    </Drawer.Navigator>
  );
}

export default function App() {
  // const { userToken } = useContext(AuthContext);
  // useEffect(() => { console.log(userToken) }, [userToken]);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AdminProvider>
          <UserProvider>
            <NavigationContainer>
              <Stack.Navigator>
                {/* Auth screens */}
                <Stack.Screen name="HomeScreem" component={HomeScreem} options={{ headerShown: false }} />
                <Stack.Screen name="LoginUsu" component={LoginUsu} options={{ headerShown: false }} />
                <Stack.Screen name="RegistrarUsu" component={RegistrarUsu} options={{ headerShown: false }} />
                {/* Modal */}
                <Stack.Screen name="PerfilModal" component={PerfilModal} options={{ presentation: 'transparentModal', headerShown: false }} />

                {/* Drawer entry point */}
                <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />

                {/* Screens con ícono de perfil */}
                <Stack.Screen name="pruebas" component={Pruebas} options={({ navigation }) => withProfileIcon('Pruebas')({ navigation })} />
                <Stack.Screen name="restaurantes" component={Restaurantes} options={({ navigation }) => withProfileIcon('Restaurantes')({ navigation })} />
                <Stack.Screen name="diversion" component={Diversion} options={({ navigation }) => withProfileIcon('Diversion')({ navigation })} />
                <Stack.Screen name="detallesMenu" component={DetallesMenu} options={({ navigation }) => withProfileIcon('Detalles del menu')({ navigation })} />
                <Stack.Screen name="GestionUsuarios" component={GestionUsuarios} options={({ navigation }) => withProfileIcon('GestionUsuarios')({ navigation })} />
                <Stack.Screen name="Ciudades" component={Ciudades} options={({ navigation }) => withProfileIcon('Ciudades')({ navigation })} />
                <Stack.Screen name="ciudad" component={ciudad} options={({ navigation }) => withProfileIcon('Ciudad')({ navigation })} />
                <Stack.Screen name="hoteles" component={hoteles} options={({ navigation }) => withProfileIcon('Hoteles')({ navigation })} />
                <Stack.Screen name="turismo" component={turismo} options={({ navigation }) => withProfileIcon('Turismo')({ navigation })} />
                <Stack.Screen name="detalleDestino" component={detalleDestino} options={({ navigation }) => withProfileIcon('Destino')({ navigation })} />
                <Stack.Screen name="detalleHotel" component={detalleHotel} options={({ navigation }) => withProfileIcon('Hotel')({ navigation })} />
                <Stack.Screen name="detallesFiestas" component={detallesFiestas} options={({ navigation }) => withProfileIcon('Fiesta')({ navigation })} />
                <Stack.Screen name="detallesRestaurantes" component={DetallesRestaurantes} options={({ navigation }) => withProfileIcon('Restaurante')({ navigation })} />
                <Stack.Screen name="fiestas" component={fiestas} options={({ navigation }) => withProfileIcon('Fiestas')({ navigation })} />
                <Stack.Screen name="buses" component={buses} options={({ navigation }) => withProfileIcon('Buses')({ navigation })} />
                <Stack.Screen name="detalleBus" component={detalleBus} options={({ navigation }) => withProfileIcon('Bus')({ navigation })} />
                <Stack.Screen name="EditarUsuario" component={EditarUsuario} options={({ navigation }) => withProfileIcon('EditarUsuario')({ navigation })} />
                <Stack.Screen name="PanelAdmin" component={PanelAdmin} options={({ navigation }) => withProfileIcon('PanelAdmin')({ navigation })} />

                <Stack.Screen name="formularioEdicionCiudad" component={FormularioEdicionCiudad} options={({ navigation }) => withProfileIcon('Edicion')({ navigation })} />
                  
               

                {/* MiInformacion SIN ícono de perfil */}
                <Stack.Screen
                  name="MiInformacion"
                  component={MiInformacion}
                  options={{
                    title: 'Mi Información',
                    headerStyle: {
                      backgroundColor: '#061529ff',
                      elevation: 0,
                      shadowOpacity: 0,
                      borderBottomWidth: 0,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      color: '#ffffffff',
                      fontWeight: 'bold',
                      marginLeft: 200,
                    },
                  }}
                />

                {/* Camara sin header */}
                <Stack.Screen name="Camara" component={Camara} options={{ headerShown: false }} />

              </Stack.Navigator>
            </NavigationContainer>
          </UserProvider>
        </AdminProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
