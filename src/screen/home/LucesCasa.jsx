import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';
import { Card, Switch, Button, ActivityIndicator, Snackbar, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { estadoGlobal } from '../../context/contextData';

// Llama el objeto que contiene el acceso a las variables de entorno y endpoints
import { API_CONFIG, getCommonHeaders } from '../../config/apiConfig';

export default function LucesCasa() {
  const navigation = useNavigation();
  const { msg } = useContext(estadoGlobal) || {};
  
  // Estados locales
  const [luces, setLuces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingDevice, setUpdatingDevice] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // URL base de la API
  // const API_BASE_URL = 'http://192.168.1.45:4000/api/luces'; //! CAMBIA LA IP, dependiendo de la zona wifi, no aplica LOCALHOST

  // Función para obtener las luces
  const obtenerLuces = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      const response = await fetch(API_CONFIG.LUCES.GET_ALL, requestOptions);
      // const response = await fetch(`${API_BASE_URL}/`, requestOptions);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      // Verificar si la respuesta tiene la estructura esperada
      if (result && result.body) {
        setLuces(result.body);
      } else {
        setLuces(result || []);
      }
      
    } catch (error) {
      console.error('Error al obtener luces:', error);
      mostrarSnackbar('Error al cargar las luces');
      setLuces([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Función para actualizar el status de una luz
  const actualizarStatusLuz = async (id, nuevoStatus) => {
    setUpdatingDevice(id);
    
    try {
      const myHeaders = new Headers();
      Object.entries(getCommonHeaders()).forEach(([key, value]) => {
        myHeaders.append(key, value);
      });

      const raw = JSON.stringify({
        "id": id,
        "status": nuevoStatus
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch(API_CONFIG.LUCES.UPDATE_STATUS, requestOptions);
      const result = await response.json();

      if (response.ok && result.status !== false) {
        // Actualizar el estado local
        setLuces(prevLuces => 
          prevLuces.map(luz => 
            luz.id === id 
              ? { ...luz, status: nuevoStatus }
              : luz
          )
        );
        
        const luzActualizada = luces.find(luz => luz.id === id);
        mostrarSnackbar(`${luzActualizada?.nombre_dispositivo || 'Dispositivo'} ${nuevoStatus ? 'encendida' : 'apagada'}`);
      } else {
        throw new Error(result.mensaje || 'Error al actualizar el dispositivo');
      }

    } catch (error) {
      console.error('Error al actualizar status:', error);
      mostrarSnackbar('Error al actualizar el dispositivo');
      
      // Revertir el cambio en caso de error
      await obtenerLuces();
    } finally {
      setUpdatingDevice(null);
    }
  };

  // Función para manejar el cambio de switch
  const handleSwitchChange = (luz) => {
    const nuevoStatus = luz.status === 1 || luz.status === true ? false : true;
    
    Alert.alert(
      'Confirmar acción',
      `¿Deseas ${nuevoStatus ? 'encender' : 'apagar'} ${luz.nombre_dispositivo}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => actualizarStatusLuz(luz.id, nuevoStatus),
        },
      ]
    );
  };

  // Función para mostrar snackbar
  const mostrarSnackbar = (mensaje) => {
    setSnackbarMessage(mensaje);
    setSnackbarVisible(true);
  };

  // Función para refrescar
  const onRefresh = () => {
    setRefreshing(true);
    obtenerLuces();
  };

  // useEffect para cargar datos iniciales
  useEffect(() => {
    obtenerLuces();
  }, []);

  // Función para determinar el estado del switch
  const getSwitchValue = (status) => {
    return status === 1 || status === true;
  };

  // Función para obtener el color del icono según el estado
  const getIconColor = (status) => {
    return getSwitchValue(status) ? '#FFD700' : '#666';
  };

  // Componente para renderizar cada luz
  const renderLuzCard = (luz) => (
    <Card key={luz.id} style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.deviceInfo}>
          <View style={styles.deviceHeader}>
            <Text style={styles.deviceName}>{luz.nombre_dispositivo}</Text>
            <Text style={styles.deviceLocation}>{luz.lugar}</Text>
          </View>
          
          <View style={styles.deviceStatus}>
            <Text style={[
              styles.statusText, 
              { color: getSwitchValue(luz.status) ? '#4CAF50' : '#666' }
            ]}>
              {getSwitchValue(luz.status) ? 'Encendida' : 'Apagada'}
            </Text>
          </View>
        </View>

        <View style={styles.switchContainer}>
          <Switch
            value={getSwitchValue(luz.status)}
            onValueChange={() => handleSwitchChange(luz)}
            disabled={updatingDevice === luz.id}
            thumbColor={getSwitchValue(luz.status) ? '#FFD700' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#FFE082' }}
          />
          
          {updatingDevice === luz.id && (
            <ActivityIndicator 
              size="small" 
              color="#8B5CF6" 
              style={styles.loadingIndicator}
            />
          )}
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={styles.loadingText}>Cargando luces...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Control de Luces" />
        <Appbar.Action icon="refresh" onPress={() => obtenerLuces()} />
      </Appbar.Header>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>Dispositivos de Iluminación</Text>
        <Text style={styles.subtitle}>
          {luces.length} dispositivo{luces.length !== 1 ? 's' : ''} encontrado{luces.length !== 1 ? 's' : ''}
        </Text>

        {luces.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <Text style={styles.emptyText}>No hay dispositivos de iluminación registrados</Text>
              <Button 
                mode="outlined" 
                onPress={() => obtenerLuces()}
                style={styles.retryButton}
              >
                Volver a intentar
              </Button>
            </Card.Content>
          </Card>
        ) : (
          luces.map(luz => renderLuzCard(luz))
        )}
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#8B5CF6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    marginBottom: 12,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceHeader: {
    marginBottom: 8,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  deviceLocation: {
    fontSize: 14,
    color: '#666',
  },
  deviceStatus: {
    marginBottom: 12,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loadingIndicator: {
    marginLeft: 12,
  },
  emptyCard: {
    backgroundColor: 'white',
    elevation: 1,
    borderRadius: 12,
  },
  emptyContent: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    borderColor: '#8B5CF6',
  },
  snackbar: {
    backgroundColor: '#8B5CF6',
  },
});