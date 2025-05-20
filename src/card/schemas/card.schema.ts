import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ type: Types.ObjectId, ref: "Customer" })
  customerId: "Customer";

  @Prop()
  createdAt: string;

  @Prop()
  fineshedAt: string;

  @Prop()
  statusId: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
