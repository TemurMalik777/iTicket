import { PartialType } from '@nestjs/mapped-types';
import { CreateCardItemDto } from './create-card_item.dto';

export class UpdateCardItemDto extends PartialType(CreateCardItemDto) {}
