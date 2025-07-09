import { PrismaClient } from '@prisma/client';

// Crear una instancia del cliente Prisma
const prisma = new PrismaClient();

async function main() {
  try {
    // Limpiar datos existentes
    await prisma.posicionGPS.deleteMany();
    await prisma.dispositivoGPS.deleteMany();
    
    console.log('🧹 Base de datos limpiada.');

    // Crear dispositivos GPS
    const dispositivos = await Promise.all([
      prisma.dispositivoGPS.create({
        data: {
          numeroIdentificador: 'GPS001',
          nombreVehiculo: 'Camión de Reparto 1',
          tipoVehiculo: 'Camión',
          proveedor: 'Vista',
          estadoActual: 'activo',
          fechaUltimaActualizacion: new Date().toISOString(),
        },
      }),
      prisma.dispositivoGPS.create({
        data: {
          numeroIdentificador: 'GPS002',
          nombreVehiculo: 'Automóvil Ejecutivo',
          tipoVehiculo: 'Automóvil',
          proveedor: 'Entel',
          estadoActual: 'activo',
          fechaUltimaActualizacion: new Date().toISOString(),
        },
      }),
      prisma.dispositivoGPS.create({
        data: {
          numeroIdentificador: 'GPS003',
          nombreVehiculo: 'Motocicleta Delivery',
          tipoVehiculo: 'Motocicleta',
          proveedor: 'Geotab',
          estadoActual: 'inactivo',
          fechaUltimaActualizacion: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 día atrás
        },
      }),
      prisma.dispositivoGPS.create({
        data: {
          numeroIdentificador: 'GPS004',
          nombreVehiculo: 'Furgoneta Logística',
          tipoVehiculo: 'Furgoneta',
          proveedor: 'Copiloto',
          estadoActual: 'activo',
          fechaUltimaActualizacion: new Date().toISOString(),
        },
      }),
    ]);

    console.log(`✅ Creados ${dispositivos.length} dispositivos GPS.`);

    // Crear posiciones GPS
    const posiciones = await Promise.all([
      prisma.posicionGPS.create({
        data: {
          dispositivoId: dispositivos[0].id,
          latitud: -33.4489,
          longitud: -70.6693,
          velocidad: 45,
          direccion: 180,
          fechaHora: new Date().toISOString(),
          nombreUbicacion: 'Av. Providencia, Santiago',
          estadoMotor: 'encendido',
        },
      }),
      prisma.posicionGPS.create({
        data: {
          dispositivoId: dispositivos[1].id,
          latitud: -33.4378,
          longitud: -70.6504,
          velocidad: 0,
          direccion: 0,
          fechaHora: new Date().toISOString(),
          nombreUbicacion: 'Edificio Corporativo, Las Condes',
          estadoMotor: 'apagado',
        },
      }),
      prisma.posicionGPS.create({
        data: {
          dispositivoId: dispositivos[3].id,
          latitud: -33.4569,
          longitud: -70.6483,
          velocidad: 32,
          direccion: 90,
          fechaHora: new Date().toISOString(),
          nombreUbicacion: 'Av. Vitacura, Las Condes',
          estadoMotor: 'encendido',
        },
      }),
    ]);

    console.log(`✅ Creadas ${posiciones.length} posiciones GPS.`);
    console.log('✨ Datos de ejemplo cargados exitosamente.');

  } catch (error) {
    console.error('❌ Error al cargar datos de ejemplo:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
