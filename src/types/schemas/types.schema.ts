import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TypeDocument = HydratedDocument<Types>;

@Schema()
export class Types {
  @Prop({ required: true })
  name: string;
}

export const TypeSchema = SchemaFactory.createForClass(Types);
