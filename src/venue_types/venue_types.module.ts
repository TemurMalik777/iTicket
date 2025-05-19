import { Module } from "@nestjs/common";
import { VenueTypesService } from "./venue_types.service";
import { VenueTypesController } from "./venue_types.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Venue_type, Venue_typeSchema } from "./schemas/venue_type.schema";
import { Venue, VenueSchema } from "../venue/schemas/venue.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Venue_type.name,
        schema: Venue_typeSchema,
      },
      {
        name: Venue.name,
        schema: VenueSchema,
      },
    ]),
  ],
  controllers: [VenueTypesController],
  providers: [VenueTypesService],
})
export class VenueTypesModule {}
