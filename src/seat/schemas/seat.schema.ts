import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SeatDocument = HydratedDocument<Seats>;

@Schema()
export class Seats {
  @Prop({ required: true })
  sector: string;

  @Prop()
  row_number: number

  @Prop()
  number: number

  @Prop()
  venueId: string

  @Prop()
  seat_typeId: number
}

export const SeatSchema = SchemaFactory.createForClass(Seats);
