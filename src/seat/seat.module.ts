import { Module } from "@nestjs/common";
import { SeatService } from "./seat.service";
import { SeatController } from "./seat.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Seats, SeatSchema } from "./schemas/seat.schema";
import {
  SeatTypes,
  SeatTypeSchema,
} from "../seat_type/schemas/seat_type.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Seats.name,
        schema: SeatSchema,
      },
      {
        name: SeatTypes.name,
        schema: SeatTypeSchema,
      },
    ]),
  ],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}
