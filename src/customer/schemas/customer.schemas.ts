import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { CustomerCard } from "../../customer_card/schemas/customer_card.schema";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop()
  first_naem: string;

  @Prop()
  last_name: string;

  @Prop()
  full_name: string;

  @Prop()
  phone: string;

  @Prop()
  hashed_password: string;

  @Prop()
  email: string;

  @Prop()
  birth_date: Date;

  @Prop()
  gender: "male" | "female";

  @Prop()
  lang_id: string;

  @Prop()
  hashed_refresh_token: string;

  
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
