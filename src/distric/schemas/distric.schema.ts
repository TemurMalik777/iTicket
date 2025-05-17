import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Region } from "../../region/schemas/region.schema";

export type DistricDocument = HydratedDocument<Distric>;

@Schema()
export class Distric {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Region" })
  regionId: "Region";
}

export const DistricSchema = SchemaFactory.createForClass(Distric);
