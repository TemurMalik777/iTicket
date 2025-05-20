import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  PaymentMethod,
  PaymentMethodDocument,
} from "./schemas/payment_method.schema";
import { CreatePaymentMethodDto } from "./dto/create-payment_method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment_method.dto";

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private readonly paymentMethodModel: Model<PaymentMethodDocument>
  ) {}

  create(
    createPaymentMethodDto: CreatePaymentMethodDto
  ): Promise<PaymentMethod> {
    const newPaymentMethod = new this.paymentMethodModel(
      createPaymentMethodDto
    );
    return newPaymentMethod.save();
  }

  findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodModel.find().exec();
  }

  findOne(id: string): Promise<PaymentMethod> {
    return this.paymentMethodModel
      .findById(id)
      .exec()
      .then((method) => {
        if (!method) {
          throw new NotFoundException(`Payment method with id ${id} not found`);
        }
        return method;
      });
  }

  update(
    id: string,
    updatePaymentMethodDto: UpdatePaymentMethodDto
  ): Promise<PaymentMethod> {
    return this.paymentMethodModel
      .findByIdAndUpdate(id, updatePaymentMethodDto, {
        new: true,
      })
      .exec()
      .then((updated) => {
        if (!updated) {
          throw new NotFoundException(`Payment method with id ${id} not found`);
        }
        return updated;
      });
  }

  remove(id: string): Promise<PaymentMethod> {
    return this.paymentMethodModel
      .findByIdAndDelete(id)
      .exec()
      .then((deleted) => {
        if (!deleted) {
          throw new NotFoundException(`Payment method with id ${id} not found`);
        }
        return deleted;
      });
  }
}
