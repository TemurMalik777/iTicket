import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({required: true})
  full_name: string;

  @Prop({ require: true })
  email: string;

  @Prop({required: true})
  phone_number: string;

  @Prop({required: true})
  hashed_password: string;

  @Prop({required: true})
  hashed_refresh_token: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_creator: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
