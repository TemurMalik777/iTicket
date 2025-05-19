import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type HumanCategoryDocument = HydratedDocument<HumanCategory>;

@Schema()
export class HumanCategory {
  @Prop()
  name: string;

  @Prop()
  start_age: string;

  @Prop()
  finsh_age: string;

  @Prop()
  gender: string;
}

export const HumanCategorySchema = SchemaFactory.createForClass(HumanCategory);
