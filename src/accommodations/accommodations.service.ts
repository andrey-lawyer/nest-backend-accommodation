import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll(
    cost: string,
    accommodationType: string,
  ): Promise<Accommodation[]> {
    const query =
      this.accommodationsRepository.createQueryBuilder('accommodation');

    if (cost) {
      const numericCost = parseFloat(cost);
      if (!isNaN(numericCost)) {
        query.andWhere('CAST(accommodation.cost AS DECIMAL) <= :cost', {
          cost: numericCost,
        });
      } else {
        throw new BadRequestException('Invalid cost value');
      }
    }

    if (accommodationType) {
      query.andWhere('accommodation.accommodation = :accommodationType', {
        accommodationType,
      });
    }

    return query.getMany();
  }

  async findById(id: number): Promise<Accommodation> {
    const accommodation = await this.accommodationsRepository.findOneBy({ id });
    if (!accommodation) {
      throw new NotFoundException('Оголошення не знайдено');
    }
    return accommodation;
  }
}
