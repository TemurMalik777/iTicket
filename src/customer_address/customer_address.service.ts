import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCustomerAddressDto } from "./dto/create-customer_address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer_address.dto";
import {
  CustomerAddress,
  CustomerAddressDocument,
} from "./schemas/customer_address.schema";

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress.name)
    private readonly customerAddressModel: Model<CustomerAddressDocument>
  ) {}

  // CREATE
  async create(createCustomerAddressDto: CreateCustomerAddressDto) {
    const created = new this.customerAddressModel(createCustomerAddressDto);
    return await created.save();
  }

  // READ - ALL
  async findAll() {
    return await this.customerAddressModel.find().populate("customerId");
  }

  // READ - ONE
  async findOne(id: string) {
    return await this.customerAddressModel.findById(id).populate("customerId");
  }

  // UPDATE
  async update(id: string, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    return await this.customerAddressModel.findByIdAndUpdate(
      id,
      updateCustomerAddressDto,
      { new: true }
    );
  }

  // DELETE
  async remove(id: string) {
    return await this.customerAddressModel.findByIdAndDelete(id);
  }
}
