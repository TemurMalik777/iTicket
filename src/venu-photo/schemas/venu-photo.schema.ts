import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type VenuPhotoDocument = HydratedDocument<VenuePhoto>;

@Schema()
export class VenuePhoto {
  @Prop({ required: true })
  name: string;

  @Prop({ VenuPhoto: mongoose.Schema.Types.ObjectId, ref: "Venue" })
  venueId: string;

  @Prop({ required: true })
  url: string;
}

export const VenuePhotoSchema = SchemaFactory.createForClass(VenuePhoto);
