import { Module } from "@nestjs/common";
import { SeatTypeService } from "./seat_type.service";
import { SeatTypeController } from "./seat_type.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { SeatTypes, SeatTypeSchema } from "./schemas/seat_type.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SeatTypes.name,
        schema: SeatTypeSchema,
      },
    ]),
  ],
  controllers: [SeatTypeController],
  providers: [SeatTypeService],
})
export class SeatTypeModule {}
