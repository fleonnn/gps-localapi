# Documentación de API con Swagger en GPS-LocalAPI

Esta guía explica cómo se ha implementado y configurado Swagger en la API de GPS-LocalAPI para proporcionar documentación interactiva de todos los endpoints.

## ¿Qué es Swagger?

Swagger (ahora parte de OpenAPI) es una herramienta que permite documentar APIs REST de manera interactiva. Con Swagger, puedes:

- Visualizar todos los endpoints disponibles
- Probar los endpoints directamente desde la interfaz
- Ver los modelos de datos y esquemas
- Entender los parámetros requeridos y opcionales

## Configuración de Swagger en GPS-LocalAPI

Swagger está configurado en el archivo `src/main.ts`. La configuración incluye:

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// En la función bootstrap
const Configuración = new DocumentBuilder()
  .setTitle('GPS Local API')
  .setDescription('API para interactuar con el GPS local')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, Configuración);
SwaggerModule.setup('api', app, document);
```

## Acceder a la Documentación Swagger

Una vez que la aplicación está en funcionamiento, puedes acceder a la documentación Swagger en:

```
http://localhost:3000/api
```

O si tienes configurado un puerto diferente:

```
http://localhost:[PUERTO]/api
```

## Documentar Controladores y DTOs

### 1. Decoradores para Controladores

Para mejorar la documentación de los endpoints, puedes usar los siguientes decoradores:

```typescript
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('dispositivos')
@Controller('gps')
export class GPSController {
  @ApiOperation({ summary: 'Obtener todos los dispositivos GPS' })
  @ApiResponse({ status: 200, description: 'Lista de dispositivos obtenida correctamente' })
  @Get('dispositivos')
  async obtenerTodosLosDispositivos() {
    // ...
  }
}
```

### 2. Decoradores para DTOs

Para documentar los modelos de datos, puedes usar los siguientes decoradores:

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CrearDispositivoDTO {
  @ApiProperty({
    description: 'Identificador único del dispositivo',
    example: 'GPS001',
  })
  @IsString()
  numeroIdentificador: string;

  @ApiProperty({
    description: 'Nombre del vehículo',
    example: 'Camioneta 1',
  })
  @IsString()
  nombreVehiculo: string;
  
  // Otros campos...
}
```

## Ejemplo de Implementación en DTOs Existentes

Para implementar la documentación Swagger en los DTOs existentes, debes agregar el decorador `@ApiProperty` a cada propiedad:

### Ejemplo para DispositivoGPSDto:

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class DispositivoGPSDto {
  @ApiProperty({
    description: 'ID único del dispositivo',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Número identificador único del dispositivo',
    example: 'GPS001'
  })
  numeroIdentificador: string;

  // Otros campos...
}
```

## Agrupación de Endpoints

Puedes agrupar los endpoints por categorías usando `@ApiTags`:

```typescript
@ApiTags('dispositivos')
@Controller('gps/dispositivos')
export class DispositivosController {
  // ...
}

@ApiTags('posiciones')
@Controller('gps/posiciones')
export class PosicionesController {
  // ...
}
```

## Documentación de Parámetros

Para documentar parámetros de ruta o consulta:

```typescript
@ApiParam({ name: 'id', description: 'ID del dispositivo' })
@Get(':id')
async obtenerDispositivoPorId(@Param('id') id: string) {
  // ...
}

@ApiQuery({ name: 'fecha', required: false, description: 'Filtrar por fecha (YYYY-MM-DD)' })
@Get()
async obtenerConFiltro(@Query('fecha') fecha?: string) {
  // ...
}
```

## Seguridad en Swagger (para implementaciones futuras)

Si implementas autenticación, puedes documentarla así:

```typescript
const config = new DocumentBuilder()
  .setTitle('GPS Local API')
  .setDescription('API para interactuar con el GPS local')
  .setVersion('1.0')
  .addBearerAuth() // Para autenticación JWT
  .build();
```

Y luego en los controladores:

```typescript
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('gps/protegido')
export class ProtegidoController {
  // ...
}
```

## Recomendaciones para Mantener la Documentación

1. **Actualiza la documentación cuando cambies los endpoints**: Mantén sincronizados los cambios en el código y en la documentación.

2. **Proporciona ejemplos claros**: Los ejemplos ayudan a los usuarios a entender cómo usar la API.

3. **Documenta los códigos de estado**: Indica qué códigos de estado pueden devolver tus endpoints y qué significan.

4. **Agrupa los endpoints de manera lógica**: Usa `@ApiTags` para organizar los endpoints en grupos coherentes.

## Conclusión

La implementación de Swagger en GPS-LocalAPI proporciona una documentación interactiva y actualizada de la API. Esto facilita que los desarrolladores entiendan cómo utilizar la API y prueben los endpoints directamente desde la interfaz de Swagger.
