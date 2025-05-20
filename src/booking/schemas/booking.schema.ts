import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Cart" })
  cardId: "Cart";

  @Prop()
  createdAt: string;

  @Prop()
  fineshed: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "PaymentMethod" })
  payment_methodId: "PaymentMethod";

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "DeliveryMethod" })
  discount_couponId: "DeliveryMethod";
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
