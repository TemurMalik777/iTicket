import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCustomerCardDto } from "./dto/create-customer_card.dto";
import { UpdateCustomerCardDto } from "./dto/update-customer_card.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CustomerCard } from "./schemas/customer_card.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(CustomerCard.name)
    private readonly schemaCusotmerCard: Model<CustomerCard>
  ) {}

  async create(createCustomerCardDto: CreateCustomerCardDto) {
    return await this.schemaCusotmerCard.create(createCustomerCardDto);
  }

  async findAll() {
    return await this.schemaCusotmerCard.find().populate('customerId');
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    const card = await this.schemaCusotmerCard.findById(id);
    if (!card) {
      throw new NotFoundException('CustomerCard not found');
    }

    return card;
  }

  async update(id: string, updateCustomerCardDto: UpdateCustomerCardDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    const updated = await this.schemaCusotmerCard.findByIdAndUpdate(
      id,
      updateCustomerCardDto,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('CustomerCard not found');
    }

    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    const deleted = await this.schemaCusotmerCard.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('CustomerCard not found');
    }

    return { message: 'CustomerCard deleted successfully' };
  }
}
