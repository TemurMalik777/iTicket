import { Module } from "@nestjs/common";
import { VenuPhotoService } from "./venu-photo.service";
import { VenuPhotoController } from "./venu-photo.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VenuePhoto, VenuePhotoSchema } from "./schemas/venu-photo.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: VenuePhoto.name,
        schema: VenuePhotoSchema,
      },
    ]),
  ],
  controllers: [VenuPhotoController],
  providers: [VenuPhotoService],
})
export class VenuPhotoModule {}
