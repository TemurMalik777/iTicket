import { Module } from "@nestjs/common";
import { CardItemService } from "./card_item.service";
import { CardItemController } from "./card_item.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CartiTem, CartiTemSchema } from "./schemas/card_item.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CartiTem.name,
        schema: CartiTemSchema,
      },
    ]),
  ],
  controllers: [CardItemController],
  providers: [CardItemService],
})
export class CardItemModule {}
