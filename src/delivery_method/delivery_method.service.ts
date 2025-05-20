import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  DeliveryMethod,
  DeliveryMethodDocument,
} from "./schemas/delivery_method.schema";
import { CreateDeliveryMethodDto } from "./dto/create-delivery_method.dto";
import { UpdateDeliveryMethodDto } from "./dto/update-delivery_method.dto";

@Injectable()
export class DeliveryMethodService {
  constructor(
    @InjectModel(DeliveryMethod.name)
    private readonly deliveryMethodModel: Model<DeliveryMethodDocument>
  ) {}

  create(
    createDeliveryMethodDto: CreateDeliveryMethodDto
  ): Promise<DeliveryMethod> {
    const newDeliveryMethod = new this.deliveryMethodModel(
      createDeliveryMethodDto
    );
    return newDeliveryMethod.save();
  }

  findAll(): Promise<DeliveryMethod[]> {
    return this.deliveryMethodModel.find().exec();
  }

  findOne(id: string): Promise<DeliveryMethod> {
    return this.deliveryMethodModel
      .findById(id)
      .exec()
      .then((method) => {
        if (!method) {
          throw new NotFoundException(
            `Delivery method with id ${id} not found`
          );
        }
        return method;
      });
  }

  update(
    id: string,
    updateDeliveryMethodDto: UpdateDeliveryMethodDto
  ): Promise<DeliveryMethod> {
    return this.deliveryMethodModel
      .findByIdAndUpdate(id, updateDeliveryMethodDto, { new: true })
      .exec()
      .then((updated) => {
        if (!updated) {
          throw new NotFoundException(
            `Delivery method with id ${id} not found`
          );
        }
        return updated;
      });
  }

  remove(id: string): Promise<DeliveryMethod> {
    return this.deliveryMethodModel
      .findByIdAndDelete(id)
      .exec()
      .then((deleted) => {
        if (!deleted) {
          throw new NotFoundException(
            `Delivery method with id ${id} not found`
          );
        }
        return deleted;
      });
  }
}
