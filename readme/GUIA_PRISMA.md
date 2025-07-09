# Guía de Comandos Prisma

Prisma es un ORM (Object-Relational Mapping) moderno que facilita el trabajo con bases de datos. Esta guía te ayudará a entender los comandos más importantes de Prisma que se utilizan en este proyecto.

## Comandos Básicos de Prisma

### Inicializar Prisma en un Proyecto

```bash
npx prisma init
```
Este comando crea un directorio `prisma` con un archivo `schema.prisma` inicial y un archivo `.env` para las variables de entorno.

### Generar el Cliente Prisma

```bash
npx prisma generate
```
Genera el cliente de Prisma basado en el esquema. Debes ejecutar este comando cada vez que modifiques el esquema para actualizar el cliente.

### Crear una Migración

```bash
npx prisma migrate dev --name <nombre-de-la-migracion>
```
Crea una nueva migración basada en los cambios realizados al esquema y la aplica a la base de datos.

Ejemplo:
```bash
npx prisma migrate dev --name add-dispositivo-gps
```

### Ver el Estado de las Migraciones

```bash
npx prisma migrate status
```
Muestra el estado actual de las migraciones aplicadas a la base de datos.

### Abrir Prisma Studio

```bash
npx prisma studio
```
Abre una interfaz gráfica en el navegador para explorar y manipular los datos de tu base de datos. Es muy útil para visualizar y editar datos rápidamente.

## Comandos para el Desarrollo

### Restablecer la Base de Datos

```bash
npx prisma migrate reset
```
Elimina toda la base de datos, vuelve a aplicar todas las migraciones y ejecuta el script de semilla. Útil durante el desarrollo para empezar de nuevo.

### Aplicar el Script de Semilla

```bash
npx prisma db seed
```
Ejecuta el script de semilla definido en `package.json` para cargar datos iniciales.

## Uso del Cliente Prisma en el Código

El cliente de Prisma generado proporciona una API tipada para interactuar con la base de datos:

```typescript
// Crear un registro
const nuevoDispositivo = await prisma.dispositivoGPS.create({
  data: {
    numeroIdentificador: 'GPS001',
    nombreVehiculo: 'Camión 1',
    // ...otros campos
  },
});

// Buscar registros
const dispositivos = await prisma.dispositivoGPS.findMany({
  where: {
    proveedor: 'Vista',
  },
});

// Actualizar un registro
const dispositivoActualizado = await prisma.dispositivoGPS.update({
  where: { id: 1 },
  data: { estadoActual: 'inactivo' },
});

// Eliminar un registro
const dispositivoEliminado = await prisma.dispositivoGPS.delete({
  where: { id: 1 },
});

// Relaciones - Obtener un dispositivo con sus posiciones
const dispositivoConPosiciones = await prisma.dispositivoGPS.findUnique({
  where: { id: 1 },
  include: { posiciones: true },
});
```

## Estructura del Archivo schema.prisma

El archivo `schema.prisma` define tus modelos de datos y la configuración de la base de datos:

```prisma
// Define el proveedor del cliente
generator client {
  provider = "prisma-client-js"
}

// Define la fuente de datos (base de datos)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Define los modelos de datos
model DispositivoGPS {
  id                     Int          @id @default(autoincrement())
  numeroIdentificador    String       @unique
  nombreVehiculo         String
  tipoVehiculo           String
  proveedor              String
  estadoActual           String
  fechaUltimaActualizacion DateTime
  createdAt              DateTime     @default(now())
  updatedAt              DateTime     @updatedAt
  
  // Relación con posiciones GPS
  posiciones             PosicionGPS[]
}

model PosicionGPS {
  // ... definición del modelo
}
```

## Consejos para Usar Prisma

1. **Mantén tu esquema actualizado**: Cada vez que necesites cambiar la estructura de la base de datos, modifica tu archivo schema.prisma y crea una nueva migración.

2. **Usa relaciones**: Prisma hace muy fácil trabajar con relaciones entre tablas.

3. **Aprovecha Prisma Studio**: Es una herramienta visual muy útil para explorar tus datos.

4. **Consulta la documentación**: La [documentación de Prisma](https://www.prisma.io/docs/) es excelente y contiene muchos ejemplos.

5. **Tipado estricto**: Aprovecha el sistema de tipos de TypeScript junto con Prisma para obtener autocompletado y verificación de tipos.

## Solución de Problemas Comunes

### Error: No se puede conectar a la base de datos
- Verifica que PostgreSQL esté en ejecución (docker-compose ps)
- Verifica la URL de conexión en el archivo .env

### Error: Esquema no encontrado
- Ejecuta `npx prisma generate` para regenerar el cliente

### Error: La migración falló
- Lee el mensaje de error para entender el problema
- Revisa tu esquema en busca de errores
- Considera usar `prisma migrate reset` para empezar de nuevo durante el desarrollo

## Más Recursos

- [Documentación oficial de Prisma](https://www.prisma.io/docs/)
- [Ejemplos de Prisma](https://github.com/prisma/prisma-examples)
- [Curso de Prisma en Prisma.io](https://www.prisma.io/learn)
