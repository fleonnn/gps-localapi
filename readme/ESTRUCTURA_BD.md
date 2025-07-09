## Estructura de Base de Datos - Diagrama ER

```
┌───────────────────────┐          ┌───────────────────────┐
│    DispositivoGPS     │          │     PosicionGPS       │
├───────────────────────┤          ├───────────────────────┤
│ id (PK)               │◄─────────┤ dispositivoId (FK)    │
│ numeroIdentificador   │          │ id (PK)               │
│ nombreVehiculo        │          │ latitud               │
│ tipoVehiculo          │          │ longitud              │
│ proveedor             │          │ velocidad             │
│ estadoActual          │          │ direccion             │
│ fechaUltimaActualiz...│          │ fechaHora             │
│ createdAt             │          │ nombreUbicacion       │
│ updatedAt             │          │ estadoMotor           │
└───────────────────────┘          │ createdAt             │
                                  └───────────────────────┘
```

### Descripción de las Tablas

#### DispositivoGPS
- **id**: Identificador único del dispositivo (clave primaria, autoincremento)
- **numeroIdentificador**: Número o código único del dispositivo (como IMEI o serial)
- **nombreVehiculo**: Nombre descriptivo del vehículo al que está asociado
- **tipoVehiculo**: Tipo de vehículo (camión, automóvil, motocicleta, etc.)
- **proveedor**: Proveedor del servicio GPS (Vista, Entel, Geotab, Copiloto)
- **estadoActual**: Estado actual del dispositivo (activo, inactivo, mantenimiento)
- **fechaUltimaActualizacion**: Fecha de la última actualización del dispositivo
- **createdAt**: Fecha de creación del registro
- **updatedAt**: Fecha de última actualización del registro

#### PosicionGPS
- **id**: Identificador único de la posición (clave primaria, autoincremento)
- **dispositivoId**: ID del dispositivo GPS al que pertenece esta posición (clave foránea)
- **latitud**: Coordenada de latitud
- **longitud**: Coordenada de longitud
- **velocidad**: Velocidad registrada en km/h
- **direccion**: Dirección en grados (0-359)
- **fechaHora**: Fecha y hora en que se registró la posición
- **nombreUbicacion**: Nombre descriptivo de la ubicación (dirección o punto de interés)
- **estadoMotor**: Estado del motor del vehículo (encendido/apagado)
- **createdAt**: Fecha de creación del registro

### Relaciones

- Un **DispositivoGPS** puede tener múltiples **PosicionGPS** (relación uno a muchos)
- Cada **PosicionGPS** pertenece a un único **DispositivoGPS**

Este modelo permite:
- Registrar y rastrear múltiples dispositivos GPS
- Almacenar el historial de posiciones para cada dispositivo
- Consultar la última posición de cada dispositivo
- Filtrar dispositivos por proveedor, tipo o estado
- Analizar recorridos y patrones de movimiento a lo largo del tiempo
