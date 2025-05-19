import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Region } from "../../region/schemas/region.schema";

export type Venue_typeDocument = HydratedDocument<Venue_type>;

@Schema()
export class Venue_type {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Venue" })
  venueld: "Venue";

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Type" })
  typeid: "Type";
}

export const Venue_typeSchema = SchemaFactory.createForClass(Venue_type);
