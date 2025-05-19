import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SeatTypeDocument = HydratedDocument<SeatTypes>;

@Schema()
export class SeatTypes {
  @Prop({ required: true })
  name: string;
}

export const SeatTypeSchema = SchemaFactory.createForClass(SeatTypes);
