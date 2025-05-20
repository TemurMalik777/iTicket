import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type CartiTemDocument = HydratedDocument<CartiTem>;

@Schema()
export class CartiTem {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Region" })
  regionId: "Region";
}

export const CartiTemSchema = SchemaFactory.createForClass(CartiTem);
