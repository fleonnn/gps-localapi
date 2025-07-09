# Guía para Conectar y Visualizar la Base de Datos en DBeaver

DBeaver es una herramienta de administración de bases de datos que te permite conectarte y gestionar PostgreSQL y muchos otros sistemas de bases de datos. Esta guía te ayudará a configurar correctamente DBeaver para ver las tablas de la API GPS.

## Requisitos Previos

1. Asegúrate de que DBeaver esté instalado en tu sistema. Si no lo tienes, puedes descargarlo desde [https://dbeaver.io/download/](https://dbeaver.io/download/)
2. Verifica que el contenedor Docker con PostgreSQL esté en ejecución:
   ```
   docker-compose ps
   ```

## Pasos para Conectar DBeaver con PostgreSQL

### 1. Crear una Nueva Conexión

1. Abre DBeaver
2. Haz clic en "Nueva Conexión" (icono de enchufe en la esquina superior izquierda)
3. Selecciona "PostgreSQL" y haz clic en "Siguiente"

### 2. Configurar la Conexión

Utiliza los siguientes parámetros (deben coincidir con los definidos en tu `.env` y `docker-compose.yml`):

- **Host**: `localhost` 
- **Puerto**: `5432` (o el puerto que hayas configurado)
- **Base de datos**: `gps_db` (o el nombre que hayas configurado)
- **Usuario**: `postgres` (o el usuario que hayas configurado)
- **Contraseña**: `postgres` (o la contraseña que hayas configurado)

### 3. Probar la Conexión

1. Haz clic en "Probar Conexión" para verificar que los parámetros son correctos
2. Si la conexión es exitosa, verás un mensaje de confirmación
3. Haz clic en "Finalizar" para crear la conexión

## Solución a Problemas Comunes

### Las tablas no aparecen en DBeaver

Si te has conectado correctamente pero no puedes ver las tablas `DispositivoGPS` y `PosicionGPS`, sigue estos pasos:

#### 1. Verifica que las migraciones se hayan aplicado

Ejecuta el siguiente comando en la terminal:
```
npx prisma migrate status
```

Esto mostrará si tus migraciones están aplicadas correctamente. Si no es así, ejecuta:
```
npx prisma migrate deploy
```

#### 2. Actualiza/Actualiza la vista en DBeaver

1. Haz clic derecho en la conexión y selecciona "Actualizar" o "Refresh"
2. Si sigues sin ver las tablas, verifica el esquema:
   - Las tablas pueden estar en un esquema específico (normalmente "public")
   - En el panel izquierdo, expande tu conexión > Bases de Datos > gps_db > Esquemas > public > Tablas
   - Deberías ver allí `DispositivoGPS` y `PosicionGPS`

#### 3. Verifica la visibilidad del esquema

1. Haz clic derecho en tu conexión y selecciona "Propiedades de Conexión"
2. Ve a la pestaña "PostgreSQL" 
3. Asegúrate de que la opción "Mostrar todos los esquemas" esté activada
4. Haz clic en "OK" y actualiza la vista

#### 4. Verifica el esquema correcto

Si has configurado un esquema personalizado en tu archivo `schema.prisma`, asegúrate de buscarlo en DBeaver:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Verifica si tienes un esquema definido aquí
  // schema = "mi_esquema"
}
```

Si tienes un esquema definido, deberías buscar tus tablas bajo ese esquema específico en DBeaver.

#### 5. Genera las tablas manualmente si es necesario

Si las tablas aún no existen, ejecuta:

```
npx prisma db push
```

o

```
npx prisma migrate dev --name init
```

## Visualizar y Gestionar Datos

Una vez conectado y con las tablas visibles:

1. **Explorar tablas**: Haz doble clic en una tabla para ver su estructura y datos
2. **Ejecutar consultas**: Haz clic derecho en la conexión y selecciona "SQL Editor" para escribir y ejecutar consultas
3. **Añadir datos de prueba**: Puedes insertar datos directamente usando el editor SQL o la vista de tabla

### Consultas SQL Útiles

Aquí hay algunas consultas útiles para verificar tus datos:

```sql
-- Ver todos los dispositivos GPS
SELECT * FROM "DispositivoGPS";

-- Ver todas las posiciones GPS
SELECT * FROM "PosicionGPS";

-- Ver las posiciones de un dispositivo específico
SELECT p.* 
FROM "PosicionGPS" p
JOIN "DispositivoGPS" d ON p."dispositivoId" = d.id
WHERE d."nombreVehiculo" = 'Nombre del Vehículo';

-- Ver la última posición de cada dispositivo
SELECT d."nombreVehiculo", p.*
FROM "DispositivoGPS" d
JOIN (
    SELECT DISTINCT ON ("dispositivoId") *
    FROM "PosicionGPS"
    ORDER BY "dispositivoId", "fechaHora" DESC
) p ON d.id = p."dispositivoId";
```

## Resolución de problemas adicionales

### Error de conexión rechazada

Si DBeaver muestra un error como "Connection refused":
1. Verifica que el contenedor Docker esté en ejecución
2. Comprueba si PostgreSQL está escuchando en el puerto correcto:
   ```
   docker-compose logs db
   ```
3. Asegúrate de que no hay un firewall bloqueando la conexión

### Error de autenticación

Si tienes errores de autenticación:
1. Verifica las credenciales en tu archivo `.env`
2. Asegúrate de que coinciden con las que usas en DBeaver

### Esquema no visible

Si no puedes ver el esquema:
1. Haz clic derecho en la conexión > Editar Conexión > Filtros
2. Asegúrate de que no hay filtros activos que puedan estar ocultando tu esquema

## Conclusión

Si has seguido todos estos pasos y aún tienes problemas para ver las tablas, puede que:
1. Las tablas realmente no existan en la base de datos
2. Estés conectado a la instancia incorrecta de PostgreSQL
3. Haya un problema con los permisos del usuario de la base de datos

Para verificar el primer caso, puedes ejecutar la siguiente consulta SQL en DBeaver:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

Esto mostrará todas las tablas en el esquema público, donde deberían estar tus tablas si no has configurado un esquema personalizado.
