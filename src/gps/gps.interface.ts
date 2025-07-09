import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO para respuestas que incluyen todos los campos de un dispositivo
export class DispositivoGPSDto {
  @ApiProperty({
    description: 'ID único del dispositivo',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Número identificador único del dispositivo',
    example: 'GPS001',
  })
  numeroIdentificador: string;

  @ApiProperty({
    description: 'Nombre descriptivo del vehículo',
    example: 'Camioneta de Reparto',
  })
  nombreVehiculo: string;

  @ApiProperty({
    description: 'Tipo de vehículo',
    example: 'Camioneta',
  })
  tipoVehiculo: string;

  @ApiProperty({
    description: 'Proveedor del servicio GPS',
    enum: ['Vista', 'Entel', 'Geotab', 'Copiloto'],
    example: 'Vista',
  })
  proveedor: 'Vista' | 'Entel' | 'Geotab' | 'Copiloto';

  @ApiProperty({
    description: 'Estado actual del dispositivo',
    enum: ['activo', 'inactivo', 'mantenimiento'],
    example: 'activo',
  })
  estadoActual: 'activo' | 'inactivo' | 'mantenimiento';

  @ApiProperty({
    description: 'Fecha de la última actualización del dispositivo',
    example: '2025-07-09T12:00:00Z',
  })
  fechaUltimaActualizacion: string;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2025-07-01T10:30:00.000Z',
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Fecha de última modificación del registro',
    example: '2025-07-09T14:15:00.000Z',
    required: false,
  })
  updatedAt?: Date;
}

// DTO para crear un nuevo dispositivo (sin ID, se genera automáticamente)
export class CrearDispositivoDTO {
  @ApiProperty({
    description: 'Número identificador único del dispositivo',
    example: 'GPS001',
  })
  @IsString({
    message: 'El número identificador debe ser una cadena de texto.',
  })
  @IsNotEmpty({ message: 'El número identificador no puede estar vacío.' })
  numeroIdentificador: string;

  @ApiProperty({
    description: 'Nombre descriptivo del vehículo',
    example: 'Camioneta de Reparto',
  })
  @IsString({ message: 'El nombre del vehículo debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del vehículo no puede estar vacío.' })
  nombreVehiculo: string;

  @ApiProperty({
    description: 'Tipo de vehículo',
    example: 'Camioneta',
  })
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
        'La fecha de última actualización debe ser una cadena de fecha por ejemplo, "2025-07-09" válida.',
    },
  )
  @IsNotEmpty({
    message: 'La fecha de última actualización no puede estar vacía.',
  })
  fechaUltimaActualizacion: string;
}

// DTO para actualizar un dispositivo (todos los campos son opcionales)
export class ActualizarDispositivoDTO {
  @ApiProperty({
    description: 'Número identificador único del dispositivo',
    example: 'GPS001',
    required: false,
  })
  @IsString({
    message: 'El número identificador debe ser una cadena de texto.',
  })
  @IsOptional()
  numeroIdentificador?: string;

  @ApiProperty({
    description: 'Nombre descriptivo del vehículo',
    example: 'Camioneta de Reparto',
    required: false,
  })
  @IsString({ message: 'El nombre del vehículo debe ser una cadena de texto.' })
  @IsOptional()
  nombreVehiculo?: string;

  @ApiProperty({
    description: 'Tipo de vehículo',
    example: 'Camioneta',
    required: false,
  })
  @IsString({ message: 'El tipo de vehículo debe ser una cadena de texto.' })
  @IsOptional()
  tipoVehiculo?: string;

  @ApiProperty({
    description: 'Proveedor del servicio GPS',
    enum: ['Vista', 'Entel', 'Geotab', 'Copiloto'],
    example: 'Vista',
    required: false,
  })
  @IsIn(['Vista', 'Entel', 'Geotab', 'Copiloto'], {
    message: 'El proveedor debe ser "Vista", "Entel", "Geotab" o "Copiloto".',
  })
  @IsOptional()
  proveedor?: 'Vista' | 'Entel' | 'Geotab' | 'Copiloto';

  @ApiProperty({
    description: 'Estado actual del dispositivo',
    enum: ['activo', 'inactivo', 'mantenimiento'],
    example: 'activo',
    required: false,
  })
  @IsIn(['activo', 'inactivo', 'mantenimiento'], {
    message:
      'El estado actual debe ser "activo", "inactivo" o "mantenimiento".',
  })
  @IsOptional()
  estadoActual?: 'activo' | 'inactivo' | 'mantenimiento';

  @ApiProperty({
    description: 'Fecha de la última actualización del dispositivo',
    example: '2025-07-09T12:00:00Z',
    required: false,
  })
  @IsDateString(
    {},
    {
      message:
        'La fecha de última actualización debe ser una cadena de fecha por ejemplo, "2025-07-09" válida.',
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
