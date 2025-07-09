-- CreateTable
CREATE TABLE "DispositivoGPS" (
    "id" SERIAL NOT NULL,
    "numeroIdentificador" TEXT NOT NULL,
    "nombreVehiculo" TEXT NOT NULL,
    "tipoVehiculo" TEXT NOT NULL,
    "proveedor" TEXT NOT NULL,
    "estadoActual" TEXT NOT NULL,
    "fechaUltimaActualizacion" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DispositivoGPS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PosicionGPS" (
    "id" SERIAL NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "velocidad" DOUBLE PRECISION NOT NULL,
    "direccion" INTEGER NOT NULL,
    "fechaHora" TIMESTAMP(3) NOT NULL,
    "nombreUbicacion" TEXT NOT NULL,
    "estadoMotor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dispositivoId" INTEGER NOT NULL,

    CONSTRAINT "PosicionGPS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DispositivoGPS_numeroIdentificador_key" ON "DispositivoGPS"("numeroIdentificador");

-- AddForeignKey
ALTER TABLE "PosicionGPS" ADD CONSTRAINT "PosicionGPS_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "DispositivoGPS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
