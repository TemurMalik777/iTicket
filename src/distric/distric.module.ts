import { Module } from "@nestjs/common";
import { DistricService } from "./distric.service";
import { DistricController } from "./distric.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Distric, DistricSchema } from "./schemas/distric.schema";
import { RegionModule } from "../region/region.module"; // 👈 region modulini import qilish
import { Region, RegionSchema } from "../region/schemas/region.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Distric.name,
        schema: DistricSchema,
      },
      {
        name: Region.name,
        schema: RegionSchema
      }
    ]),
    RegionModule, 
  ],
  controllers: [DistricController],
  providers: [DistricService],
  exports: [DistricService, MongooseModule],
})
export class DistricModule {}
