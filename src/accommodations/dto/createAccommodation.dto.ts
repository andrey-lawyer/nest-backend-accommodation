import { IsNotEmpty } from 'class-validator';

export class CreateAccommodationDto {
  @IsNotEmpty()
  accommodation: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  cost: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;

  @IsNotEmpty()
  place: string;
}
