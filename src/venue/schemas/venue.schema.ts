import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type VenueDocument = HydratedDocument<Venue>;

@Schema()
export class Venue {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  location: string;

  @Prop()
  stie: string;

  @Prop()
  phone: string;

  @Prop()
  schema: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Region" })
  regionId: "Region";

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "District" })
  districId: "District";
}

//Muxlisa Tarbiyachi

export const VenueSchema = SchemaFactory.createForClass(Venue);
