import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const Configuración = new DocumentBuilder()
    .setTitle('GPS Local API')
    .setDescription('API para interactuar con el GPS local')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, Configuración);
  SwaggerModule.setup('api', app, document);

  // Configuración global de ValidationPipe para validar DTOs automáticamente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no decoradas en DTOs
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no decoradas
      transform: true, // Transforma los datos recibidos al tipo definido en el DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
