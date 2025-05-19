import { Module } from "@nestjs/common";
import { VenueService } from "./venue.service";
import { VenueController } from "./venue.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Venue, VenueSchema } from "./schemas/venue.schema";
import { Distric, DistricSchema } from "../distric/schemas/distric.schema";
import { Region, RegionSchema } from "../region/schemas/region.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Venue.name,
        schema: VenueSchema,
      },
      {
        name: Distric.name,
        schema: DistricSchema,
      },
      {
        name: Region.name,
        schema: RegionSchema,
      },
    ]),
  ],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
