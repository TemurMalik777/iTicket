import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Region } from "../../region/schemas/region.schema";

export type PaymentMethodDocument = HydratedDocument<PaymentMethod>;

@Schema()
export class PaymentMethod {
  @Prop()
  name: string;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
