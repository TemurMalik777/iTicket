import { Module } from "@nestjs/common";
import { CustomerAddressService } from "./customer_address.service";
import { CustomerAddressController } from "./customer_address.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CustomerAddress,
  CustomerAddressSchema,
} from "./schemas/customer_address.schema";
import { Customer, CustomerSchema } from "../customer/schemas/customer.schemas";
import { Region, RegionSchema } from "../region/schemas/region.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerAddress.name,
        schema: CustomerAddressSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Region.name,
        schema: RegionSchema,
      },
    ]),
  ],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
  exports: [],
})
export class CustomerAddressModule {}
