import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { AccommodationsModule } from './accommodations/accommodations.module';
import { FilesModule } from './files/files.module';
import { ErrorFilter } from './errors-filter/errors-filter';

import { Accommodation } from './accommodations/accommodation.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Accommodation],
      synchronize: true,
      url: process.env.AWS_REGION
        ? `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@aws-0-${process.env.AWS_REGION}.pooler.supabase.com:6543/${process.env.POSTGRES_DB}?options=reference%3D${process.env.REFERENCE_ID}`
        : undefined,
    }),
    AccommodationsModule,
    FilesModule,
    CloudinaryModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule {}
