import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Distric } from "../../distric/schemas/distric.schema";

export type RegionDocument = HydratedDocument<Region>;

@Schema()
export class Region {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Distric" }] })
  districts: Distric[];
}

export const RegionSchema = SchemaFactory.createForClass(Region);
