import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';
import { Card, Switch, Button, ActivityIndicator, Snackbar, Appbar, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { estadoGlobal } from '../../context/contextData';

export default function PuertaCasa() {
  const navigation = useNavigation();
  const { msg } = useContext(estadoGlobal) || {};
  
  // Estados locales
  const [puertas, setPuertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingDoor, setUpdatingDoor] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // URL base de la API
  const API_BASE_URL = 'http://192.168.1.45:4000/api/puertas'; //! CAMBIA LA IP, dependiendo de la zona wifi, no aplica LOCALHOST

  // Función para obtener las puertas
  const obtenerPuertas = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      const response = await fetch(`${API_BASE_URL}/`, requestOptions);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      // Verificar si la respuesta tiene la estructura esperada
      if (result && result.body) {
        setPuertas(result.body);
      } else {
        setPuertas(result || []);
      }
      
    } catch (error) {
      console.error('Error al obtener puertas:', error);
      mostrarSnackbar('Error al cargar las puertas');
      setPuertas([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Función para actualizar el status de una puerta
  const actualizarStatusPuerta = async (nombrePuerta, nuevoStatus) => {
    setUpdatingDoor(nombrePuerta);
    
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "nombre_puerta": nombrePuerta,
        "status": nuevoStatus
      });

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch(`${API_BASE_URL}/actualizar_status`, requestOptions);
      const result = await response.json();

      if (response.ok && result.status !== false) {
        // Actualizar el estado local
        setPuertas(prevPuertas => 
          prevPuertas.map(puerta => 
            puerta.nombre_puerta === nombrePuerta 
              ? { ...puerta, status: nuevoStatus }
              : puerta
          )
        );
        
        mostrarSnackbar(`${nombrePuerta} ${nuevoStatus ? 'abierta' : 'cerrada'}`);
      } else {
        throw new Error(result.mensaje || 'Error al actualizar la puerta');
      }

    } catch (error) {
      console.error('Error al actualizar status:', error);
      mostrarSnackbar('Error al actualizar la puerta');
      
      // Revertir el cambio en caso de error
      await obtenerPuertas();
    } finally {
      setUpdatingDoor(null);
    }
  };

  // Función para manejar el cambio de switch
  const handleSwitchChange = (nombrePuerta, currentStatus) => {
    const nuevoStatus = currentStatus === 1 || currentStatus === true ? false : true;
    
    Alert.alert(
      'Confirmar acción',
      `¿Deseas ${nuevoStatus ? 'abrir' : 'cerrar'} ${nombrePuerta}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => actualizarStatusPuerta(nombrePuerta, nuevoStatus),
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
    obtenerPuertas();
  };

  // useEffect para cargar datos iniciales
  useEffect(() => {
    obtenerPuertas();
  }, []);

  // Función para determinar el estado del switch
  const getSwitchValue = (status) => {
    return status === 1 || status === true;
  };

  // Función para obtener el icono según el estado
  const getDoorIcon = (status) => {
    return getSwitchValue(status) ? 'door-open' : 'door-closed';
  };

  // Función para obtener el color del icono según el estado
  const getIconColor = (status) => {
    return getSwitchValue(status) ? '#4CAF50' : '#F44336';
  };

  // Componente para renderizar cada puerta
  const renderPuertaCard = (puerta) => (
    <Card key={puerta.id} style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Icon
            source={getDoorIcon(puerta.status)}
            size={40}
            color={getIconColor(puerta.status)}
          />
        </View>

        <View style={styles.doorInfo}>
          <View style={styles.doorHeader}>
            <Text style={styles.doorName}>{puerta.nombre_puerta}</Text>
            <Text style={styles.doorLocation}>{puerta.lugar}</Text>
          </View>
          
          <View style={styles.doorStatus}>
            <Text style={[
              styles.statusText, 
              { color: getSwitchValue(puerta.status) ? '#4CAF50' : '#F44336' }
            ]}>
              {getSwitchValue(puerta.status) ? 'Abierta' : 'Cerrada'}
            </Text>
          </View>
        </View>

        <View style={styles.switchContainer}>
          <Switch
            value={getSwitchValue(puerta.status)}
            onValueChange={() => handleSwitchChange(puerta.nombre_puerta, puerta.status)}
            disabled={updatingDoor === puerta.nombre_puerta}
            thumbColor={getSwitchValue(puerta.status) ? '#4CAF50' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#C8E6C9' }}
          />
          
          {updatingDoor === puerta.nombre_puerta && (
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
        <Text style={styles.loadingText}>Cargando puertas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Control de Puertas" />
        <Appbar.Action icon="refresh" onPress={() => obtenerPuertas()} />
      </Appbar.Header>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerContent}>
          <Icon source="door" size={32} color="#8B5CF6" />
          <Text style={styles.title}>Control de Acceso</Text>
        </View>
        
        <Text style={styles.subtitle}>
          {puertas.length} puerta{puertas.length !== 1 ? 's' : ''} encontrada{puertas.length !== 1 ? 's' : ''}
        </Text>

        {puertas.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <Icon source="door" size={48} color="#666" />
              <Text style={styles.emptyText}>No hay puertas registradas en el sistema</Text>
              <Button 
                mode="outlined" 
                onPress={() => obtenerPuertas()}
                style={styles.retryButton}
              >
                Volver a intentar
              </Button>
            </Card.Content>
          </Card>
        ) : (
          puertas.map(puerta => renderPuertaCard(puerta))
        )}

        {/* Información adicional */}
        {puertas.length > 0 && (
          <Card style={styles.infoCard}>
            <Card.Content>
              <Text style={styles.infoTitle}>Información</Text>
              <Text style={styles.infoText}>• Toca el interruptor para cambiar el estado</Text>
              <Text style={styles.infoText}>• Verde: Puerta abierta</Text>
              <Text style={styles.infoText}>• Rojo: Puerta cerrada</Text>
              <Text style={styles.infoText}>• Desliza hacia abajo para actualizar</Text>
            </Card.Content>
          </Card>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    marginRight: 16,
  },
  doorInfo: {
    flex: 1,
  },
  doorHeader: {
    marginBottom: 8,
  },
  doorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  doorLocation: {
    fontSize: 14,
    color: '#666',
  },
  doorStatus: {
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  loadingIndicator: {
    marginTop: 8,
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
    marginVertical: 16,
  },
  retryButton: {
    borderColor: '#8B5CF6',
  },
  infoCard: {
    marginTop: 16,
    backgroundColor: '#E3F2FD',
    elevation: 1,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1565C0',
    marginBottom: 4,
  },
  snackbar: {
    backgroundColor: '#8B5CF6',
  },
});