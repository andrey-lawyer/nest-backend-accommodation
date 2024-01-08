import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccommodationsController } from './accommodations.controller';
import { AccommodationsService } from './accommodations.service';
import { FilesModule } from 'src/files/files.module';

import { Accommodation } from './accommodation.entity';

@Module({
  controllers: [AccommodationsController],
  providers: [AccommodationsService],
  imports: [TypeOrmModule.forFeature([Accommodation]), FilesModule],
})
export class AccommodationsModule {}
