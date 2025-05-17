import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "./schemas/customer.schemas";
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerSchema: Model<Customer>
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { password, confirm_password, email } = createCustomerDto;

    const customer = await this.customerSchema.findOne({ email });
    if (customer) {
      throw new BadRequestException("Bunday email allaqachon mavjud");
    }

    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    return this.customerSchema.create({
      ...createCustomerDto,
      password: hashedPassword,
    });

    // const hashedPassword = await bcrytp.hash(createCustomerDto.password, 7);
    // const customer = await this.customerSchema.create({
    //   ...createCustomerDto,
    //   hashed_password: hashedPassword,
    // });

    // return customer;
  }

  async findAll() {
    return await this.customerSchema.find();
  }

  findOne(id: string) {
    return this.customerSchema.findById(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerSchema.findByIdAndUpdate(id, updateCustomerDto);
  }

  remove(id: string) {
    return this.customerSchema.findByIdAndDelete(id);
  }
}
