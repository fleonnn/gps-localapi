# Guía de Validaciones en NestJS

Este documento explica cómo se implementan las validaciones en el proyecto GPS-LocalAPI utilizando NestJS y class-validator.

## Configuración de Validaciones

### 1. Configuración Global

Las validaciones están configuradas a nivel global en `src/main.ts` utilizando `ValidationPipe`:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,        // Elimina propiedades no decoradas
    forbidNonWhitelisted: true,  // Lanza error si hay propiedades extra
    transform: true,        // Transforma los datos al tipo definido en el DTO
  }),
);
```

### 2. DTOs con Validaciones

Los Data Transfer Objects (DTOs) en `src/gps/gps.interface.ts` utilizan decoradores de `class-validator` para validar los datos de entrada:

#### Dispositivos GPS

- **CrearDispositivoDTO**: Para crear un nuevo dispositivo (sin ID)
- **ActualizarDispositivoDTO**: Para actualizar un dispositivo (campos opcionales)
- **DispositivoGPSDto**: Para respuestas (todos los campos, incluyendo ID)

#### Posiciones GPS

- **CrearPosicionDTO**: Para crear una nueva posición
- **ActualizarPosicionDTO**: Para actualizar una posición (campos opcionales)
- **PosicionGPSDto**: Para respuestas

## Decoradores de Validación Utilizados

| Decorador | Descripción | Ejemplo |
|-----------|-------------|---------|
| `@IsNotEmpty()` | Verifica que el campo no esté vacío | `@IsNotEmpty({ message: 'El campo no puede estar vacío' })` |
| `@IsString()` | Verifica que sea una cadena de texto | `@IsString({ message: 'Debe ser texto' })` |
| `@IsNumber()` | Verifica que sea un número | `@IsNumber({}, { message: 'Debe ser un número' })` |
| `@IsDateString()` | Verifica que sea una fecha en formato ISO | `@IsDateString({}, { message: 'Formato de fecha inválido' })` |
| `@IsIn()` | Verifica que el valor esté en una lista | `@IsIn(['Vista', 'Entel'], { message: 'Valor no permitido' })` |
| `@IsOptional()` | Marca el campo como opcional | `@IsOptional()` |

## Ejemplos de Uso

### Crear un dispositivo (validaciones aplicadas)

```json
POST /gps/dispositivos
{
  "numeroIdentificador": "GPS001",
  "nombreVehiculo": "Camioneta 1",
  "tipoVehiculo": "Camioneta",
  "proveedor": "Vista",
  "estadoActual": "activo",
  "fechaUltimaActualizacion": "2025-07-08T12:00:00Z"
}
```

Si envías un valor inválido, por ejemplo:

```json
{
  "numeroIdentificador": "",  // Vacío (viola @IsNotEmpty)
  "nombreVehiculo": "Camioneta 1",
  "tipoVehiculo": "Camioneta",
  "proveedor": "Otro",  // No está en la lista (viola @IsIn)
  "estadoActual": "activo",
  "fechaUltimaActualizacion": "fecha-invalida"  // Formato incorrecto (viola @IsDateString)
}
```

Recibirás errores de validación:

```json
{
  "statusCode": 400,
  "message": [
    "El número identificador no puede estar vacío.",
    "El proveedor debe ser \"Vista\", \"Entel\", \"Geotab\" o \"Copiloto\".",
    "La fecha de última actualización debe ser una cadena de fecha ISO 8601 válida."
  ],
  "error": "Bad Request"
}
```

## Solución de problemas comunes

1. **Las validaciones no funcionan**: Asegúrate de:
   - Usar clases en lugar de interfaces para los DTOs
   - Tener configurado ValidationPipe (global o en el controlador)
   - Importar correctamente los decoradores de class-validator

2. **Error "Class constructor cannot be invoked without 'new'"**:
   - Asegúrate de usar `class` y no `interface` para los DTOs

3. **Los mensajes de error no son personalizados**:
   - Añade la opción `message` a cada decorador

4. **La validación no transforma los tipos**:
   - Asegúrate de que `transform: true` esté configurado en ValidationPipe

## Referencias

- [Class Validator](https://github.com/typestack/class-validator)
- [NestJS Validation](https://docs.nestjs.com/techniques/validation)
