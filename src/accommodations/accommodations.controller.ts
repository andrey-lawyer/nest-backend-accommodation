import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AccommodationsService } from './accommodations.service';
import { CreateAccommodationDto } from './dto/createAccommodation.dto';

@Controller('accommodations')
export class AccommodationsController {
  constructor(private readonly accommodationService: AccommodationsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createAccommodationDto: CreateAccommodationDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const accommodation = await this.accommodationService.createProduct(
      createAccommodationDto,
      photo,
    );
    return { message: 'Adverts created successfully', accommodation };
  }

  @Get()
  async findAll(
    @Query('cost') cost: string,
    @Query('accommodationType') accommodationType: string,
  ) {
    const accommodations = this.accommodationService.findAll(
      cost,
      accommodationType,
    );
    return accommodations;
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const accommodation = await this.accommodationService.findById(id);

    return accommodation;
  }
}
