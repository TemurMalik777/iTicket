import { Module } from "@nestjs/common";
import { EventTypeService } from "./event_type.service";
import { EventTypeController } from "./event_type.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { EvenType, EvenTypeSchema } from "./schemas/event_type.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EvenType.name,
        schema: EvenTypeSchema,
      },
    ]),
  ],
  controllers: [EventTypeController],
  providers: [EventTypeService],
})
export class EventTypeModule {}
