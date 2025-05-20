import { Module } from "@nestjs/common";
import { PaymentMethodService } from "./payment_method.service";
import { PaymentMethodController } from "./payment_method.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentMethod } from "./schemas/payment_method.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PaymentMethod.name,
        schema: PaymentMethod,
      },
    ]),
  ],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
})
export class PaymentMethodModule {}
