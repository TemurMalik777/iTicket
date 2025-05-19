import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeDto } from './create-types.dto';

export class UpdateTypeDto extends PartialType(CreateTypeDto) {}