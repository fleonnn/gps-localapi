# API de Gestión de Dispositivos GPS

## Descripción General

Este proyecto es una API REST desarrollada con NestJS que permite gestionar dispositivos GPS y sus posiciones. La API proporciona endpoints para crear, leer, actualizar y eliminar dispositivos GPS, así como para registrar y consultar las posiciones de estos dispositivos. El proyecto utiliza PostgreSQL como base de datos y Prisma como ORM.

## Tecnologías Utilizadas

- **NestJS**: Framework de desarrollo para Node.js basado en TypeScript
- **PostgreSQL**: Base de datos relacional para almacenamiento persistente
- **Prisma**: ORM (Object-Relational Mapping) para interactuar con la base de datos
- **Docker**: Para contenerizar la base de datos PostgreSQL
- **TypeScript**: Lenguaje de programación tipado que compila a JavaScript

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
├── .env                   # Variables de entorno (conexión a BD, etc.)
├── package.json           # Dependencias y scripts del proyecto
├── tsconfig.json          # Configuración de TypeScript
└── README.md              # Este archivo de documentación
```

## Explicación de Componentes Clave

### 1. Prisma

Prisma es un ORM (Object-Relational Mapping) que facilita la interacción con la base de datos PostgreSQL:

- **schema.prisma**: Define los modelos de datos (tablas) de la base de datos.
- **migrations/**: Contiene las migraciones que se han aplicado a la base de datos.
- **seed.js**: Script que carga datos de ejemplo en la base de datos.

### 2. Módulos NestJS

NestJS utiliza un sistema de módulos para organizar la aplicación:

- **AppModule**: Es el módulo principal que importa todos los demás módulos.
- **GPSModule**: Gestiona los dispositivos GPS y sus posiciones.
- **PrismaModule**: Proporciona servicios para conectarse a la base de datos.

### 3. Servicios

Los servicios contienen la lógica de negocio:

- **GPSPrismaService**: Implementa operaciones CRUD para dispositivos y posiciones GPS utilizando Prisma para interactuar con la base de datos.
- **PrismaService**: Maneja la conexión con la base de datos PostgreSQL.

### 4. Controladores

Los controladores gestionan las peticiones HTTP:

- **GPSController**: Maneja todas las rutas relacionadas con dispositivos GPS y posiciones.

### 5. Interfaces y DTOs

- **gps.interface.ts**: Define los tipos de datos (DTOs - Data Transfer Objects) utilizados para la comunicación entre cliente y servidor.

### 6. Docker y Base de Datos

- **docker-compose.yml**: Configura un contenedor Docker para PostgreSQL.
- **.env**: Contiene las variables de entorno, incluida la conexión a la base de datos.

## Endpoints de la API

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

## Cómo Ejecutar el Proyecto

### Requisitos Previos

1. Node.js (v18 o superior)
2. Docker y Docker Compose
3. PostgreSQL (se instala mediante Docker)

### Pasos para Ejecutar

1. Clona el repositorio
2. Instala las dependencias:
   ```
   npm install
   ```
3. Inicia PostgreSQL con Docker:
   ```
   docker-compose up -d
   ```
4. Ejecuta las migraciones de Prisma:
   ```
   npx prisma migrate dev
   ```
5. Carga los datos de ejemplo:
   ```
   npm run db:seed
   ```
6. Inicia el servidor:
   ```
   npm run start:dev
   ```

## Comandos Útiles

- **npm run start:dev**: Inicia el servidor en modo desarrollo con recarga automática
- **npm run build**: Compila el proyecto
- **npm run lint**: Ejecuta el linter para verificar el código
- **npm run format**: Formatea el código con Prettier
- **npx prisma migrate dev**: Crea y aplica migraciones de la base de datos
- **npx prisma generate**: Genera el cliente Prisma basado en el esquema
- **npm run db:seed**: Carga datos de ejemplo en la base de datos

## ¿Qué Puedes Hacer Ahora?

1. **Explorar los endpoints con Thunder Client u otra herramienta similar**:
   - Prueba los diferentes endpoints para entender cómo funcionan
   - Crea nuevos dispositivos GPS y registra posiciones para ellos

2. **Extender la funcionalidad**:
   - Agregar autenticación para proteger los endpoints
   - Implementar filtros adicionales (por fecha, por ubicación, etc.)
   - Crear un panel de administración frontend que consuma esta API

3. **Aprender más sobre los componentes**:
   - Estudiar la documentación de NestJS: https://docs.nestjs.com/
   - Aprender más sobre Prisma: https://www.prisma.io/docs/
   - Explorar características avanzadas de PostgreSQL

4. **Optimizar el rendimiento**:
   - Implementar caché para consultas frecuentes
   - Añadir índices a la base de datos para búsquedas más rápidas

## Modificaciones que Hemos Realizado

1. **Limpieza de código**: Eliminamos variables no utilizadas y archivos innecesarios.
2. **Migración a Prisma**: Configuramos Prisma para usar PostgreSQL como base de datos.
3. **Correcciones de formato**: Resolvimos problemas con los finales de línea y mejoramos la legibilidad del código.
4. **Estructura de módulos**: Organizamos el código en módulos cohesivos y desacoplados.

## Conceptos Importantes

### NestJS
- **Módulos**: Organizan la aplicación en bloques funcionales
- **Controladores**: Manejan las peticiones HTTP
- **Servicios**: Contienen la lógica de negocio
- **Inyección de dependencias**: Permite desacoplar componentes

### Prisma
- **Esquema**: Define la estructura de la base de datos
- **Migraciones**: Mantienen la base de datos actualizada
- **Cliente**: Proporciona una API tipada para interactuar con la base de datos

### TypeScript
- **Tipos e interfaces**: Proporcionan seguridad de tipos en tiempo de compilación
- **Decoradores**: Utilizados por NestJS para metaprogramación

## Conclusión

Este proyecto te proporciona una base sólida para aprender desarrollo backend con NestJS, TypeScript y bases de datos relacionales. Te animo a que explores el código, hagas modificaciones y aprendas cómo funciona cada componente. ¡Buena suerte con tu viaje de aprendizaje!
