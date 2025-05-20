import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  photo: string;

  @Prop()
  start_date: string;

  @Prop()
  start_time: string;

  @Prop()
  finish_date: string;

  @Prop()
  finish_time: string;

  @Prop()
  info: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "EvenType" })
  event_typeId: "EvenType";

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "HumanCategory" })
  human_categoryId: "HumanCategory";

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Venue" })
  venueId: "Venue";

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Lang" })
  langId: "Lang";

  @Prop()
  release_date: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
