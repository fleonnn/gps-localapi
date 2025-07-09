import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  DispositivoGPSDto,
  PosicionGPSDto,
  CrearDispositivoDTO,
  ActualizarDispositivoDTO,
  CrearPosicionDTO,
} from './gps.interface';

// Interfaces para los modelos de Prisma
interface DispositivoPrisma {
  id: number;
  numeroIdentificador: string;
  nombreVehiculo: string;
  tipoVehiculo: string;
  proveedor: string;
  estadoActual: string;
  fechaUltimaActualizacion: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface PosicionPrisma {
  id: number;
  dispositivoId: number;
  latitud: number;
  longitud: number;
  velocidad: number;
  direccion: number;
  fechaHora: Date;
  nombreUbicacion: string;
  estadoMotor: string;
  createdAt: Date;
}

// Funciones para convertir entre modelos Prisma y DTOs
function convertToDispositivoDTO(
  dispositivo: DispositivoPrisma,
): DispositivoGPSDto {
  return {
    id: dispositivo.id,
    numeroIdentificador: dispositivo.numeroIdentificador,
    nombreVehiculo: dispositivo.nombreVehiculo,
    tipoVehiculo: dispositivo.tipoVehiculo,
    proveedor: dispositivo.proveedor as
      | 'Vista'
      | 'Entel'
      | 'Geotab'
      | 'Copiloto',
    estadoActual: dispositivo.estadoActual as
      | 'activo'
      | 'inactivo'
      | 'mantenimiento',
    fechaUltimaActualizacion:
      dispositivo.fechaUltimaActualizacion.toISOString(),
    createdAt: dispositivo.createdAt,
    updatedAt: dispositivo.updatedAt,
  };
}

function convertToPosicionDTO(posicion: PosicionPrisma): PosicionGPSDto {
  return {
    id: posicion.id,
    dispositivoId: posicion.dispositivoId,
    latitud: posicion.latitud,
    longitud: posicion.longitud,
    velocidad: posicion.velocidad,
    direccion: posicion.direccion,
    fechaHora: posicion.fechaHora.toISOString(),
    nombreUbicacion: posicion.nombreUbicacion,
    estadoMotor: posicion.estadoMotor as 'encendido' | 'apagado',
    createdAt: posicion.createdAt,
  };
}

@Injectable()
export class GPSService {
  constructor(private prisma: PrismaService) {}

  // Métodos para dispositivos GPS
  async obtenerTodosLosDispositivos(): Promise<DispositivoGPSDto[]> {
    const dispositivos = await this.prisma.dispositivoGPS.findMany();
    return dispositivos.map((dispositivo) =>
      convertToDispositivoDTO(dispositivo),
    );
  }

  async obtenerDispositivoPorId(id: number): Promise<DispositivoGPSDto> {
    const dispositivo = await this.prisma.dispositivoGPS.findUnique({
      where: { id },
    });

    if (!dispositivo) {
      throw new NotFoundException(`Dispositivo con ID ${id} no encontrado`);
    }

    return convertToDispositivoDTO(dispositivo);
  }

  async obtenerDispositivosPorProveedor(
    proveedor: string,
  ): Promise<DispositivoGPSDto[]> {
    const dispositivos = await this.prisma.dispositivoGPS.findMany({
      where: { proveedor },
    });

    return dispositivos.map((dispositivo) =>
      convertToDispositivoDTO(dispositivo),
    );
  }

  async crearNuevoDispositivo(
    datos: CrearDispositivoDTO,
  ): Promise<DispositivoGPSDto> {
    const nuevoDispositivo = await this.prisma.dispositivoGPS.create({
      data: {
        ...datos,
        fechaUltimaActualizacion: new Date(datos.fechaUltimaActualizacion),
      },
    });
    return convertToDispositivoDTO(nuevoDispositivo);
  }

  async actualizarDispositivoExistente(
    id: number,
    datos: ActualizarDispositivoDTO,
  ): Promise<DispositivoGPSDto> {
    // Verificar que el dispositivo existe
    await this.obtenerDispositivoPorId(id);

    // Convertir fechaUltimaActualizacion a Date si existe
    const datosActualizados: Record<string, unknown> = { ...datos };
    if (datos.fechaUltimaActualizacion) {
      datosActualizados.fechaUltimaActualizacion = new Date(
        datos.fechaUltimaActualizacion,
      );
    }

    const dispositivoActualizado = await this.prisma.dispositivoGPS.update({
      where: { id },
      data: datosActualizados,
    });

    return convertToDispositivoDTO(dispositivoActualizado);
  }

  async eliminarDispositivo(id: number): Promise<{ mensaje: string }> {
    // Verificar que el dispositivo existe
    await this.obtenerDispositivoPorId(id);

    // Eliminar el dispositivo
    await this.prisma.dispositivoGPS.delete({
      where: { id },
    });

    return { mensaje: `Dispositivo con ID ${id} eliminado con éxito` };
  }

  // Métodos para posiciones GPS
  async obtenerTodasLasPosiciones(): Promise<PosicionGPSDto[]> {
    const posiciones = await this.prisma.posicionGPS.findMany();
    return posiciones.map((posicion) => convertToPosicionDTO(posicion));
  }

  async obtenerPosicionActual(id: number): Promise<PosicionGPSDto> {
    // Obtener la posición más reciente para un dispositivo
    const posicion = await this.prisma.posicionGPS.findFirst({
      where: { dispositivoId: id },
      orderBy: { fechaHora: 'desc' },
    });

    if (!posicion) {
      throw new NotFoundException(
        `No se encontraron posiciones para el dispositivo con ID ${id}`,
      );
    }
    return convertToPosicionDTO(posicion);
  }

  async obtenerPosicionesPorDispositivo(
    dispositivoId: number,
  ): Promise<PosicionGPSDto[]> {
    const posiciones = await this.prisma.posicionGPS.findMany({
      where: { dispositivoId },
      orderBy: { fechaHora: 'desc' },
    });
    return posiciones.map((posicion) => convertToPosicionDTO(posicion));
  }

  async actualizarPosicion(
    nuevaPosicion: CrearPosicionDTO,
  ): Promise<PosicionGPSDto> {
    const posicionCreada = await this.prisma.posicionGPS.create({
      data: {
        ...nuevaPosicion,
        fechaHora: new Date(nuevaPosicion.fechaHora),
      },
    });
    return convertToPosicionDTO(posicionCreada);
  }

  async eliminarPosicion(id: number): Promise<{ mensaje: string }> {
    // Verificar que la posición existe
    const posicion = await this.prisma.posicionGPS.findUnique({
      where: { id },
    });
    if (!posicion) {
      throw new NotFoundException(`Posición con ID ${id} no encontrada`);
    }
    // Eliminar la posición
    await this.prisma.posicionGPS.delete({
      where: { id },
    });
    return { mensaje: `Posición con ID ${id} eliminada con éxito` };
  }
}
