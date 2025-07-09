import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// DTO para respuestas que incluyen todos los campos de un dispositivo
export class DispositivoGPSDto {
  id: number;
  numeroIdentificador: string;
  nombreVehiculo: string;
  tipoVehiculo: string;
  proveedor: 'Vista' | 'Entel' | 'Geotab' | 'Copiloto';
  estadoActual: 'activo' | 'inactivo' | 'mantenimiento';
  fechaUltimaActualizacion: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// DTO para crear un nuevo dispositivo (sin ID, se genera automáticamente)
export class CrearDispositivoDTO {
  @IsString({
    message: 'El número identificador debe ser una cadena de texto.',
  })
  @IsNotEmpty({ message: 'El número identificador no puede estar vacío.' })
  numeroIdentificador: string;

  @IsString({ message: 'El nombre del vehículo debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del vehículo no puede estar vacío.' })
  nombreVehiculo: string;

  @IsString({ message: 'El tipo de vehículo debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El tipo de vehículo no puede estar vacío.' })
  tipoVehiculo: string;

  @IsIn(['Vista', 'Entel', 'Geotab', 'Copiloto'], {
    message: 'El proveedor debe ser "Vista", "Entel", "Geotab" o "Copiloto".',
  })
  @IsNotEmpty({ message: 'El proveedor no puede estar vacío.' })
  proveedor: 'Vista' | 'Entel' | 'Geotab' | 'Copiloto';

  @IsIn(['activo', 'inactivo', 'mantenimiento'], {
    message:
      'El estado actual debe ser "activo", "inactivo" o "mantenimiento".',
  })
  @IsNotEmpty({ message: 'El estado actual no puede estar vacío.' })
  estadoActual: 'activo' | 'inactivo' | 'mantenimiento';

  @IsDateString(
    {},
    {
      message:
        'La fecha de última actualización debe ser una cadena de fecha ISO 8601 válida.',
    },
  )
  @IsNotEmpty({
    message: 'La fecha de última actualización no puede estar vacía.',
  })
  fechaUltimaActualizacion: string;
}

// DTO para actualizar un dispositivo (todos los campos son opcionales)
export class ActualizarDispositivoDTO {
  @IsString({
    message: 'El número identificador debe ser una cadena de texto.',
  })
  @IsOptional()
  numeroIdentificador?: string;

  @IsString({ message: 'El nombre del vehículo debe ser una cadena de texto.' })
  @IsOptional()
  nombreVehiculo?: string;

  @IsString({ message: 'El tipo de vehículo debe ser una cadena de texto.' })
  @IsOptional()
  tipoVehiculo?: string;

  @IsIn(['Vista', 'Entel', 'Geotab', 'Copiloto'], {
    message: 'El proveedor debe ser "Vista", "Entel", "Geotab" o "Copiloto".',
  })
  @IsOptional()
  proveedor?: 'Vista' | 'Entel' | 'Geotab' | 'Copiloto';

  @IsIn(['activo', 'inactivo', 'mantenimiento'], {
    message:
      'El estado actual debe ser "activo", "inactivo" o "mantenimiento".',
  })
  @IsOptional()
  estadoActual?: 'activo' | 'inactivo' | 'mantenimiento';

  @IsDateString(
    {},
    {
      message:
        'La fecha de última actualización debe ser una cadena de fecha ISO 8601 válida.',
    },
  )
  @IsOptional()
  fechaUltimaActualizacion?: string;
}
// DTO para respuestas de posiciones GPS
export class PosicionGPSDto {
  id?: number;
  dispositivoId: number;
  latitud: number;
  longitud: number;
  velocidad: number;
  direccion: number;
  fechaHora: string;
  nombreUbicacion: string;
  estadoMotor: 'encendido' | 'apagado';
  createdAt?: Date;
}

// DTO para crear una nueva posición GPS
export class CrearPosicionDTO {
  @IsNumber({}, { message: 'El ID del dispositivo debe ser un número válido.' })
  @IsNotEmpty({ message: 'El ID del dispositivo no puede estar vacío.' })
  dispositivoId: number;

  @IsNumber({}, { message: 'La latitud debe ser un número válido.' })
  @IsNotEmpty({ message: 'La latitud no puede estar vacía.' })
  latitud: number;

  @IsNumber({}, { message: 'La longitud debe ser un número válido.' })
  @IsNotEmpty({ message: 'La longitud no puede estar vacía.' })
  longitud: number;

  @IsNumber({}, { message: 'La velocidad debe ser un número válido.' })
  @IsNotEmpty({ message: 'La velocidad no puede estar vacía.' })
  velocidad: number;

  @IsNumber({}, { message: 'La dirección debe ser un número válido.' })
  @IsNotEmpty({ message: 'La dirección no puede estar vacía.' })
  direccion: number;

  @IsDateString(
    {},
    {
      message: 'La fecha y hora debe ser una cadena de fecha ISO 8601 válida.',
    },
  )
  @IsNotEmpty({ message: 'La fecha y hora no puede estar vacía.' })
  fechaHora: string;

  @IsString({
    message: 'El nombre de la ubicación debe ser una cadena de texto.',
  })
  @IsNotEmpty({ message: 'El nombre de la ubicación no puede estar vacío.' })
  nombreUbicacion: string;

  @IsIn(['encendido', 'apagado'], {
    message: 'El estado del motor debe ser "encendido" o "apagado".',
  })
  @IsNotEmpty({ message: 'El estado del motor no puede estar vacío.' })
  estadoMotor: 'encendido' | 'apagado';
}

// DTO para actualizar una posición GPS (todos los campos son opcionales)
export class ActualizarPosicionDTO {
  @IsNumber({}, { message: 'El ID del dispositivo debe ser un número válido.' })
  @IsOptional()
  dispositivoId?: number;

  @IsNumber({}, { message: 'La latitud debe ser un número válido.' })
  @IsOptional()
  latitud?: number;

  @IsNumber({}, { message: 'La longitud debe ser un número válido.' })
  @IsOptional()
  longitud?: number;

  @IsNumber({}, { message: 'La velocidad debe ser un número válido.' })
  @IsOptional()
  velocidad?: number;

  @IsNumber({}, { message: 'La dirección debe ser un número válido.' })
  @IsOptional()
  direccion?: number;

  @IsDateString(
    {},
    {
      message: 'La fecha y hora debe ser una cadena de fecha ISO 8601 válida.',
    },
  )
  @IsOptional()
  fechaHora?: string;

  @IsString({
    message: 'El nombre de la ubicación debe ser una cadena de texto.',
  })
  @IsOptional()
  nombreUbicacion?: string;

  @IsIn(['encendido', 'apagado'], {
    message: 'El estado del motor debe ser "encendido" o "apagado".',
  })
  @IsOptional()
  estadoMotor?: 'encendido' | 'apagado';
}
