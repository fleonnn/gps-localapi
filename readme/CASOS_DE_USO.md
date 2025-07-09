# Guía de Casos de Uso de la API GPS

Esta guía muestra ejemplos prácticos de cómo usar la API GPS para diferentes escenarios. Utilizaremos Thunder Client (o cualquier cliente HTTP como Postman o cURL) para realizar las peticiones.

## Casos de Uso para Dispositivos GPS

### 1. Obtener todos los dispositivos GPS

**Petición:**
```
GET http://localhost:3000/gps/dispositivos
```

**Uso:** Ideal para mostrar una lista de todos los dispositivos disponibles en un panel de control.

### 2. Crear un nuevo dispositivo GPS

**Petición:**
```
POST http://localhost:3000/gps/dispositivos
```

**Cuerpo de la petición:**
```json
{
  "numeroIdentificador": "GPS005",
  "nombreVehiculo": "Camioneta de Entrega",
  "tipoVehiculo": "Camioneta",
  "proveedor": "Vista",
  "estadoActual": "activo",
  "fechaUltimaActualizacion": "2025-07-07T10:00:00Z"
}
```

**Uso:** Cuando se adquiere un nuevo dispositivo GPS y necesita ser registrado en el sistema.

### 3. Buscar dispositivos por proveedor

**Petición:**
```
GET http://localhost:3000/gps/dispositivos/proveedor/Vista
```

**Uso:** Útil para filtrar dispositivos según el proveedor del servicio GPS, por ejemplo, para analizar cobertura por proveedor.

### 4. Actualizar estado de un dispositivo

**Petición:**
```
PUT http://localhost:3000/gps/dispositivos/1
```

**Cuerpo de la petición:**
```json
{
  "estadoActual": "mantenimiento"
}
```

**Uso:** Cuando un dispositivo necesita mantenimiento, está temporalmente fuera de servicio o vuelve a estar activo.

### 5. Eliminar un dispositivo

**Petición:**
```
DELETE http://localhost:3000/gps/dispositivos/5
```

**Uso:** Cuando un dispositivo se da de baja, se pierde o se retira del servicio.

## Casos de Uso para Posiciones GPS

### 1. Registrar una nueva posición

**Petición:**
```
POST http://localhost:3000/gps/posicion
```

**Cuerpo de la petición:**
```json
{
  "dispositivoId": 1,
  "latitud": -33.4372,
  "longitud": -70.6506,
  "velocidad": 65,
  "direccion": 90,
  "fechaHora": "2025-07-07T10:15:00Z",
  "nombreUbicacion": "Autopista Central, Santiago",
  "estadoMotor": "encendido"
}
```

**Uso:** Para actualizar la ubicación de un vehículo, típicamente enviado periódicamente por el dispositivo GPS.

### 2. Obtener la posición actual de un dispositivo

**Petición:**
```
GET http://localhost:3000/gps/posicion/1
```

**Uso:** Para ver dónde está actualmente un vehículo específico, útil para rastreo en tiempo real.

### 3. Obtener todas las posiciones

**Petición:**
```
GET http://localhost:3000/gps/posiciones
```

**Uso:** Para análisis general de todas las posiciones registradas, útil para paneles de administración.

## Escenarios Prácticos

### Escenario 1: Seguimiento de una Flota de Reparto

1. Obtener todos los dispositivos para visualizar la flota completa
2. Filtrar dispositivos por tipo "Camión" para centrarse en vehículos de reparto
3. Obtener la posición actual de cada camión para visualizar en un mapa
4. Actualizar el estado a "inactivo" cuando un camión termina su ruta

### Escenario 2: Mantenimiento de Dispositivos

1. Filtrar dispositivos por proveedor para programar mantenimiento por proveedor
2. Actualizar el estado a "mantenimiento" mientras se realiza el servicio
3. Actualizar el estado a "activo" cuando el mantenimiento está completo
4. Verificar que se están recibiendo nuevas posiciones después del mantenimiento

### Escenario 3: Análisis de Rutas

1. Obtener todas las posiciones de un dispositivo específico
2. Analizar la velocidad promedio y distancia recorrida
3. Identificar áreas de congestión basadas en velocidades bajas
4. Optimizar rutas para futuras entregas

## Ejemplos con Thunder Client

### Crear un nuevo dispositivo GPS

1. Abre Thunder Client en VS Code
2. Crea una nueva petición
3. Configura:
   - Método: POST
   - URL: http://localhost:3000/gps/dispositivos
   - Body (JSON):
     ```json
     {
       "numeroIdentificador": "GPS006",
       "nombreVehiculo": "Furgoneta de Servicio",
       "tipoVehiculo": "Furgoneta",
       "proveedor": "Geotab",
       "estadoActual": "activo",
       "fechaUltimaActualizacion": "2025-07-07T12:00:00Z"
     }
     ```
4. Envía la petición
5. Deberías recibir una respuesta con el dispositivo creado, incluyendo su ID asignado

### Seguimiento de un Vehículo en Tiempo Real

Para simular el seguimiento en tiempo real:

1. Registra una posición inicial:
   - POST a /gps/posicion con coordenadas iniciales
2. Espera unos segundos (simulando el paso del tiempo)
3. Registra una nueva posición con coordenadas actualizadas
4. Obtén la posición actual con GET /gps/posicion/{id}
5. Verás la posición más reciente

## Integración con Sistemas Externos

Esta API podría integrarse con:

1. **Aplicaciones de mapas**: Para visualizar la ubicación de los dispositivos en tiempo real
2. **Sistemas de gestión de flotas**: Para optimizar rutas y asignar vehículos
3. **Aplicaciones móviles**: Para que los conductores registren incidencias o reciban instrucciones
4. **Sistemas de alertas**: Para notificar sobre excesos de velocidad o desvíos de ruta

## Próximos Pasos

1. **Implementar filtrado por fecha**: Para buscar posiciones históricas
2. **Añadir autenticación**: Para proteger el acceso a la API
3. **Crear endpoints para estadísticas**: Como distancia recorrida, tiempo de actividad, etc.
4. **Implementar notificaciones**: Para alertar sobre eventos importantes (batería baja, salida de una zona geográfica, etc.)
