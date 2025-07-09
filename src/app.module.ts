import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GPSModule } from './gps/gps.module';

@Module({
  imports: [PrismaModule, GPSModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
