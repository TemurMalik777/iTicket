import { PartialType } from '@nestjs/mapped-types';
import { CreateDistricDto } from './create-distric.dto';

export class UpdateDistricDto extends PartialType(CreateDistricDto) {}
