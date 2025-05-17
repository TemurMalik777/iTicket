import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CustomerAddressDocument = HydratedDocument<CustomerAddress>;

@Schema()
export class CustomerAddress {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Customer" })
  customer_id: "Customer";

  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Region" })
  region_id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Des" })
  distric_id: number;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  house: string;

  @Prop({ required: true })
  flat: number;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  post_index: string;

  @Prop({ required: true })
  info: string;
}

export const CustomerAddressSchema =
  SchemaFactory.createForClass(CustomerAddress);
