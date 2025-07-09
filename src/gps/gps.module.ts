import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GPSService } from './gps.service';
import { GPSController } from './gps.controller';

@Module({
  imports: [PrismaModule],
  controllers: [GPSController],
  providers: [GPSService],
  exports: [GPSService],
})
export class GPSModule {}
