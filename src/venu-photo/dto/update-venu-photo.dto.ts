import { PartialType } from '@nestjs/mapped-types';
import { CreateVenuPhotoDto } from './create-venu-photo.dto';

export class UpdateVenuPhotoDto extends PartialType(CreateVenuPhotoDto) {}
