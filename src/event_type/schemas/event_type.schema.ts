import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type EvenTypeDocument = HydratedDocument<EvenType>;

@Schema()
export class EvenType {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: "HumanCategory", default: null })
  parent_event_typeId: Types.ObjectId;
}

export const EvenTypeSchema = SchemaFactory.createForClass(EvenType);
