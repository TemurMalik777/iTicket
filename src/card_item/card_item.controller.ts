import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CardItemService } from "./card_item.service";
import { CreateCardItemDto } from "./dto/create-card_item.dto";
import { UpdateCardItemDto } from "./dto/update-card_item.dto";

@Controller("card-item")
export class CardItemController {
  constructor(private readonly cardItemService: CardItemService) {}

  @Post()
  create(@Body() createCardItemDto: CreateCardItemDto) {
    return this.cardItemService.create(createCardItemDto);
  }

  @Get()
  findAll() {
    return this.cardItemService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cardItemService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCardItemDto: UpdateCardItemDto
  ) {
    return this.cardItemService.update(id, updateCardItemDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cardItemService.remove(id);
  }
}
