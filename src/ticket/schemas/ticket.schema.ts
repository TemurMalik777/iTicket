import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Distric } from "../../distric/schemas/distric.schema";

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Event" })
  eventId: "Event";

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Seat"})
  seatId: string;

  @Prop()
  price: number;

  @Prop()
  service_fee: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "TicketStatus" })
  statusId: "TicketStatus";

  @Prop()
  ticketType: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
