import { Module } from "@nestjs/common";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, CartSchema } from "./schemas/card.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
