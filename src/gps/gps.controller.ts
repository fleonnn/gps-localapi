import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GPSService } from './gps.service';
import {
  DispositivoGPSDto,
  PosicionGPSDto,
  CrearDispositivoDTO,
  ActualizarDispositivoDTO,
  CrearPosicionDTO,
} from './gps.interface';

@Controller('gps')
@UsePipes(
  new ValidationPipe({
    whitelist: true, // Permite solo las propiedades definidas en el DTO
    forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no definidas en el DTO
    transform: true, // Transforma los datos de entrada a los tipos definidos en el DTO
  }),
)
export class GPSController {
  constructor(private readonly gpsService: GPSService) {}

  // GET /gps/dispositivos - Obtiene todos los dispositivos GPS
  @Get('dispositivos')
  async obtenerTodosLosDispositivos(): Promise<DispositivoGPSDto[]> {
    return await this.gpsService.obtenerTodosLosDispositivos();
  }

  // GET /gps/dispositivos/:id - Obtiene un dispositivo específico por ID
  @Get('dispositivos/:id')
  async obtenerDispositivoPorId(
    @Param('id') id: string,
  ): Promise<DispositivoGPSDto> {
    const numeroId = parseInt(id);
    return await this.gpsService.obtenerDispositivoPorId(numeroId);
  }

  // GET /gps/dispositivos/proveedor/:proveedor - Obtiene dispositivos por proveedor
  @Get('dispositivos/proveedor/:proveedor')
  async obtenerDispositivosPorProveedor(
    @Param('proveedor') proveedor: string,
  ): Promise<DispositivoGPSDto[]> {
    return await this.gpsService.obtenerDispositivosPorProveedor(proveedor);
  }

  // POST /gps/dispositivos - Crea un nuevo dispositivo
  @Post('dispositivos')
  async crearNuevoDispositivo(
    @Body() datosDelDispositivo: CrearDispositivoDTO,
  ): Promise<DispositivoGPSDto> {
    return await this.gpsService.crearNuevoDispositivo(datosDelDispositivo);
  }

  // PUT /gps/dispositivos/:id - Actualiza un dispositivo existente
  @Put('dispositivos/:id')
  async actualizarDispositivoExistente(
    @Param('id') id: string,
    @Body() datosActualizados: ActualizarDispositivoDTO,
  ): Promise<DispositivoGPSDto> {
    const numeroId = parseInt(id);
    return await this.gpsService.actualizarDispositivoExistente(
      numeroId,
      datosActualizados,
    );
  }

  // DELETE /gps/dispositivos/:id - Elimina un dispositivo
  @Delete('dispositivos/:id')
  async eliminarDispositivo(
    @Param('id') id: string,
  ): Promise<{ mensaje: string }> {
    const numeroId = parseInt(id);
    return await this.gpsService.eliminarDispositivo(numeroId);
  }

  // DELETE /gps/posicion/:id - Elimina una posición
  @Delete('posicion/:id')
  async eliminarPosicion(
    @Param('id') id: string,
  ): Promise<{ mensaje: string }> {
    const numeroId = parseInt(id);
    return await this.gpsService.eliminarPosicion(numeroId);
  }

  // GET /gps/posicion/:id - Obtiene la posición actual de un dispositivo
  @Get('posicion/:id')
  async obtenerPosicionActual(
    @Param('id') id: string,
  ): Promise<PosicionGPSDto> {
    const numeroId = parseInt(id);
    return await this.gpsService.obtenerPosicionActual(numeroId);
  }

  // GET /gps/dispositivos/:id/posiciones - Obtiene todas las posiciones de un dispositivo
  @Get('dispositivos/:id/posiciones')
  async obtenerPosicionesPorDispositivo(
    @Param('id') id: string,
  ): Promise<PosicionGPSDto[]> {
    const numeroId = parseInt(id);
    return await this.gpsService.obtenerPosicionesPorDispositivo(numeroId);
  }

  // GET /gps/posiciones - Obtiene todas las posiciones actuales
  @Get('posiciones')
  async obtenerTodasLasPosiciones(): Promise<PosicionGPSDto[]> {
    return await this.gpsService.obtenerTodasLasPosiciones();
  }

  // POST /gps/posicion - Registra una nueva posición de un dispositivo
  @Post('posicion')
  async actualizarPosicion(
    @Body() nuevaPosicion: CrearPosicionDTO,
  ): Promise<PosicionGPSDto> {
    return await this.gpsService.actualizarPosicion(nuevaPosicion);
  }
}
