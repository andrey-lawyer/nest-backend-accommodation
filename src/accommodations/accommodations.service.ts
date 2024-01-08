import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Accommodation } from './accommodation.entity';
import { FilesService } from 'src/files/files.service';
import { CreateAccommodationDto } from './dto/createAccommodation.dto';

@Injectable()
export class AccommodationsService {
  constructor(
    @InjectRepository(Accommodation)
    private accommodationsRepository: Repository<Accommodation>,
    private fileService: FilesService,
  ) {}

  async createProduct(
    dto: CreateAccommodationDto,
    photo: Express.Multer.File,
  ): Promise<Accommodation> {
    const fileName = await this.fileService.createFile(photo);
    const newAccommodation = await this.accommodationsRepository.save({
      ...dto,
      photo: fileName,
    });
    return newAccommodation;
  }

  async findAll(): Promise<Accommodation[]> {
    return this.accommodationsRepository.find({});
  }

  async findById(id: number): Promise<Accommodation> {
    const accommodation = await this.accommodationsRepository.findOneBy({ id });
    if (!accommodation) {
      throw new NotFoundException('Оголошення не знайдено');
    }
    return accommodation;
  }
}
