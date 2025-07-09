<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# API de Gestión de Dispositivos GPS

## Descripción General

Este proyecto es una API REST desarrollada con NestJS que permite gestionar dispositivos GPS y sus posiciones geográficas. La API proporciona endpoints para crear, leer, actualizar y eliminar dispositivos GPS, así como para registrar y consultar las posiciones de estos dispositivos. El proyecto utiliza PostgreSQL como base de datos y Prisma como ORM.

## Características

- ✅ CRUD completo para dispositivos GPS
- ✅ Seguimiento de posiciones GPS
- ✅ Soporte para múltiples proveedores (Vista, Entel, Geotab, Copiloto)
- ✅ Persistencia de datos con PostgreSQL usando Prisma
- ✅ Docker para facilitar el despliegue

## Documentación Detallada

- 📘 [README Completo](README_COMPLETO.md) - Guía completa del proyecto
- 📊 [Estructura de Base de Datos](ESTRUCTURA_BD.md) - Diagrama ER y descripción de tablas
- 🛠️ [Guía de Prisma](GUIA_PRISMA.md) - Comandos y funcionalidades de Prisma
- 🔍 [Casos de Uso](CASOS_DE_USO.md) - Ejemplos prácticos de uso de la API
- ✅ [Guía de Validaciones](GUIA_VALIDACIONES.md) - Implementación de validaciones con class-validator
- 🔌 [Conexión DBeaver](CONEXION_DBEAVER.md) - Guía para conectar y visualizar la base de datos en DBeaver
- 🖼️ [Guía Visual DBeaver](GUIA_VISUAL_DBEAVER.md) - Tutorial con imágenes para configurar DBeaver
- 🔄 [Solución de Importaciones](SOLUCION_IMPORTACIONES.md) - Resolver problemas con módulos faltantes

## Tecnologías Utilizadas

- **NestJS**: Framework de desarrollo para Node.js basado en TypeScript
- **PostgreSQL**: Base de datos relacional para almacenamiento persistente
- **Prisma**: ORM (Object-Relational Mapping) para interactuar con la base de datos
- **Docker**: Para contenerizar la base de datos PostgreSQL
- **DBeaver**: Herramienta de administración de bases de datos (guía de conexión disponible)

## Solución Rápida: Problemas con DBeaver

Si no puedes ver las tablas en DBeaver, sigue estos pasos:

1. **Verifica que Docker esté en ejecución**:
   ```powershell
   docker ps
   ```
   Deberías ver un contenedor llamado `gps-postgres`.

2. **Asegúrate de que las migraciones se hayan aplicado**:
   ```powershell
   npx prisma migrate deploy
   ```

3. **Consulta las tablas directamente con SQL**:
   En el editor SQL de DBeaver, ejecuta:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

4. **Actualiza la vista en DBeaver**:
   - Haz clic derecho en la conexión
   - Selecciona "Actualizar" o "Refresh"
   - Navega a: Bases de Datos > gps_db > Esquemas > public > Tablas

5. **Información de conexión correcta**:
   - Host: `localhost`
   - Puerto: `5432`
   - Base de datos: `gps_db`
   - Usuario: `postgres`
   - Contraseña: `postgres`

Para instrucciones detalladas, consulta [CONEXION_DBEAVER.md](CONEXION_DBEAVER.md) o [GUIA_VISUAL_DBEAVER.md](GUIA_VISUAL_DBEAVER.md).
- **Docker**: Para contenerizar la base de datos PostgreSQL
- **TypeScript**: Lenguaje de programación tipado que compila a JavaScript

## Configuración del Proyecto

```bash
$ npm install
```

## Ejecución del Proyecto

### Requisitos Previos

1. Node.js (v18 o superior)
2. Docker y Docker Compose
3. PostgreSQL (se instala mediante Docker)

### Pasos para Ejecutar

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia PostgreSQL con Docker:
   ```bash
   docker-compose up -d
   ```
4. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Carga los datos de ejemplo (opcional):
   ```bash
   npm run db:seed
   ```
6. Inicia el servidor:
   ```bash
   # Modo desarrollo con recarga automática
   npm run start:dev

   # Modo producción
   npm run start:prod
   ```

## Estructura del Proyecto

```
/
├── prisma/               # Esquemas y migraciones de la base de datos
│   ├── schema.prisma     # Define los modelos de datos para Prisma
│   ├── migrations/       # Historial de migraciones de la base de datos
│   └── seed.js           # Script para poblar la base de datos con datos iniciales
├── src/
│   ├── gps/              # Módulo de gestión de GPS
│   │   ├── gps.controller.ts    # Controlador que maneja las peticiones HTTP
│   │   ├── gps.interface.ts     # Define los tipos de datos (DTOs)
│   │   ├── gps.prisma.service.ts # Servicio para operaciones con la base de datos
│   │   └── gps.module.ts        # Define el módulo de GPS
│   ├── prisma/           # Módulo de conexión con Prisma
│   │   ├── prisma.service.ts    # Servicio para la conexión a la base de datos
│   │   └── prisma.module.ts     # Configuración del módulo de Prisma
│   ├── app.controller.ts  # Controlador principal de la aplicación
│   ├── app.module.ts      # Módulo principal que importa otros módulos
│   ├── app.service.ts     # Servicio principal de la aplicación
│   └── main.ts            # Punto de entrada de la aplicación
├── docker-compose.yml     # Configuración de Docker para PostgreSQL
└── .env                   # Variables de entorno (conexión a BD, etc.)
```

## API Endpoints

### Dispositivos GPS

- **GET /gps/dispositivos**: Obtiene todos los dispositivos GPS
- **GET /gps/dispositivos/:id**: Obtiene un dispositivo específico por ID
- **GET /gps/dispositivos/proveedor/:proveedor**: Filtra dispositivos por proveedor
- **POST /gps/dispositivos**: Crea un nuevo dispositivo GPS
- **PUT /gps/dispositivos/:id**: Actualiza un dispositivo existente
- **DELETE /gps/dispositivos/:id**: Elimina un dispositivo

### Posiciones GPS

- **GET /gps/posiciones**: Obtiene todas las posiciones GPS
- **GET /gps/posicion/:id**: Obtiene la posición actual de un dispositivo específico
- **POST /gps/posicion**: Registra una nueva posición para un dispositivo

## Comandos Útiles

- **npm run start:dev**: Inicia el servidor en modo desarrollo con recarga automática
- **npm run build**: Compila el proyecto
- **npm run lint**: Ejecuta el linter para verificar el código
- **npm run format**: Formatea el código con Prettier
- **npx prisma migrate dev**: Crea y aplica migraciones de la base de datos
- **npx prisma generate**: Genera el cliente Prisma basado en el esquema
- **npx prisma studio**: Abre una interfaz gráfica para explorar la base de datos
- **npm run db:seed**: Carga datos de ejemplo en la base de datos

## Próximos Pasos y Mejoras

Aquí hay algunas ideas para extender y mejorar el proyecto:

1. **Autenticación y Autorización**:
   - Implementar JWT para autenticar usuarios
   - Definir roles y permisos

2. **Características Adicionales**:
   - Filtros avanzados para búsqueda de dispositivos y posiciones
   - Paginación de resultados
   - Endpoints para estadísticas (distancia recorrida, tiempo activo, etc.)

3. **Frontend**:
   - Desarrollar una interfaz de usuario con React, Angular o Vue
   - Implementar mapas interactivos para visualizar posiciones

4. **Optimizaciones**:
   - Implementar caché para mejorar el rendimiento
   - Compresión de respuestas
   - Logging avanzado

## Recursos

- [Documentación de NestJS](https://docs.nestjs.com/)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
