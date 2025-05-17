import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CustomerCardDocument = HydratedDocument<CustomerCard>;

@Schema()
export class CustomerCard {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Customer" })
  customerId: "Customer";

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  year: string;

  @Prop({ required: true })
  month: string;

  @Prop({ default: false })
  is_active: boolean;

  @Prop({ default: false })
  is_main: boolean;
}

export const CustomerCardSchema = SchemaFactory.createForClass(CustomerCard);
