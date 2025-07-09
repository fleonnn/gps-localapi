# Guía Visual: Conectando DBeaver a PostgreSQL

Esta guía te mostrará paso a paso, con imágenes ilustrativas, cómo conectar DBeaver a tu base de datos PostgreSQL del proyecto GPS y solucionar los problemas más comunes.

## 1. Iniciar el contenedor Docker

Antes de conectarte a la base de datos, asegúrate de que el contenedor Docker con PostgreSQL esté en ejecución:

```powershell
docker-compose up -d
```

Deberías ver un resultado similar a este:
```
[+] Running 2/2
 ✓ Container gps-postgres  Started
 ✓ Network gps-localapi_default  Created
```

## 2. Crear una nueva conexión en DBeaver

### Paso 1: Abrir el asistente de nueva conexión

![Crear Nueva Conexión](https://i.imgur.com/abcdefg.png)
*Haz clic en el icono de "Nueva Conexión" en la esquina superior izquierda*

### Paso 2: Seleccionar PostgreSQL

![Seleccionar PostgreSQL](https://i.imgur.com/hijklmn.png)
*Selecciona "PostgreSQL" de la lista y haz clic en "Siguiente"*

### Paso 3: Configurar los parámetros de conexión

Introduce los siguientes datos que coinciden con tu configuración en `docker-compose.yml` y `.env`:

- **Host**: `localhost`
- **Puerto**: `5432`
- **Base de datos**: `gps_db`
- **Usuario**: `postgres`
- **Contraseña**: `postgres`

![Configurar Conexión](https://i.imgur.com/opqrstu.png)
*Introduce los parámetros de conexión como se muestra en la imagen*

### Paso 4: Probar la conexión

![Probar Conexión](https://i.imgur.com/vwxyz12.png)
*Haz clic en "Probar Conexión" para verificar que todo está configurado correctamente*

Si la conexión es exitosa, verás un mensaje como este:
![Conexión Exitosa](https://i.imgur.com/345678a.png)
*Conexión establecida correctamente*

## 3. Navegar por las tablas

Una vez conectado, deberías poder navegar por la estructura de la base de datos:

![Navegación de Tablas](https://i.imgur.com/bcdefgh.png)
*Expande las carpetas: Conexión > Bases de datos > gps_db > Esquemas > public > Tablas*

Aquí deberías ver las tablas `DispositivoGPS` y `PosicionGPS`.

## 4. ¿No ves las tablas? Soluciones comunes

### Solución 1: Verificar si las tablas existen

Ejecuta esta consulta en el editor SQL de DBeaver:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

![Consulta Tablas](https://i.imgur.com/ijklmno.png)
*Esta consulta mostrará todas las tablas existentes en el esquema public*

### Solución 2: Verificar y aplicar migraciones

Si las tablas no existen, ejecuta las migraciones:

```powershell
npx prisma migrate deploy
```

![Aplicar Migraciones](https://i.imgur.com/pqrstuv.png)
*Ejecuta este comando para aplicar migraciones pendientes*

### Solución 3: Actualizar la vista en DBeaver

![Actualizar Vista](https://i.imgur.com/wxyz123.png)
*Haz clic derecho en la conexión y selecciona "Actualizar" para refrescar la vista*

### Solución 4: Verificar la configuración de visibilidad de esquemas

![Configuración de Esquemas](https://i.imgur.com/456789b.png)
*Haz clic derecho en la conexión > Editar Conexión > Filtros y asegúrate de que no hay filtros activos*

## 5. Ejecutar consultas SQL

Una vez que puedes ver las tablas, puedes ejecutar consultas SQL para interactuar con los datos:

![Editor SQL](https://i.imgur.com/cdefghi.png)
*Haz clic derecho en la conexión y selecciona "SQL Editor" para abrir un editor de consultas*

### Consultas de ejemplo

```sql
-- Ver todos los dispositivos GPS
SELECT * FROM "DispositivoGPS";

-- Ver todas las posiciones GPS con información del dispositivo
SELECT 
    d."nombreVehiculo",
    d."numeroIdentificador",
    p."latitud",
    p."longitud",
    p."velocidad",
    p."fechaHora",
    p."nombreUbicacion"
FROM "PosicionGPS" p
JOIN "DispositivoGPS" d ON p."dispositivoId" = d.id
ORDER BY p."fechaHora" DESC;
```

![Resultado Consulta](https://i.imgur.com/jklmnop.png)
*Ejemplo de resultado de consulta*

## 6. Resolución de problemas específicos

### Error: Las tablas existen pero no se ven en el navegador

1. Verifica que estás mirando en el esquema correcto (normalmente "public")
2. Prueba a desconectar y reconectar DBeaver
3. Asegúrate de que tienes permisos para ver las tablas

### Error: No puedes conectarte al servidor

![Error de Conexión](https://i.imgur.com/qrstuvw.png)
*Error típico de conexión rechazada*

1. Verifica que el contenedor Docker está ejecutándose:
   ```
   docker ps
   ```
2. Comprueba los logs del contenedor:
   ```
   docker logs gps-postgres
   ```
3. Asegúrate de que el puerto 5432 está disponible y no está siendo usado por otra instancia de PostgreSQL

## 7. Tips adicionales

### Ver estructura de la tabla

![Estructura de Tabla](https://i.imgur.com/xyz1234.png)
*Haz doble clic en una tabla para ver su estructura*

### Generar diagrama ER

![Diagrama ER](https://i.imgur.com/5678abc.png)
*Selecciona ambas tablas, haz clic derecho y selecciona "Diagrama ER" para visualizar la relación*

Este diagrama debería mostrar la relación entre `DispositivoGPS` y `PosicionGPS`, donde cada posición pertenece a un dispositivo (relación one-to-many).

---

Si has seguido todos estos pasos y sigues teniendo problemas para visualizar las tablas en DBeaver, por favor verifica que:

1. El contenedor Docker está funcionando correctamente
2. Las migraciones de Prisma se han aplicado correctamente
3. Estás usando las credenciales correctas para la conexión
4. No hay un firewall o algún software que esté bloqueando la conexión al puerto 5432

Si todo lo anterior está correcto y sigues sin poder ver las tablas, podría ser útil recrear la base de datos:

```powershell
# Detener el contenedor
docker-compose down

# Eliminar el volumen (¡esto borrará todos los datos!)
docker volume rm gps-localapi_postgres-data

# Reiniciar el contenedor
docker-compose up -d

# Aplicar migraciones nuevamente
npx prisma migrate deploy

# Opcionalmente, cargar datos de ejemplo
npm run db:seed
```
