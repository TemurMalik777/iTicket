import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSeatTypeDto } from "./dto/create-seat_type.dto";
import { UpdateSeatTypeDto } from "./dto/update-seat_type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { SeatTypes } from "./schemas/seat_type.schema";
import { Model } from "mongoose";

@Injectable()
export class SeatTypeService {
  constructor(
    @InjectModel(SeatTypes.name) private schemaSeatTypes: Model<SeatTypes>
  ) {}

  async create(createSeatTypeDto: CreateSeatTypeDto) {
    const SeatTypes = await this.schemaSeatTypes.create({
      name: createSeatTypeDto.name,
    });
    if (SeatTypes) {
      throw new BadRequestException(
        "Bunday Seat Types nomi allaqachon qo'shilgan"
      );
    }
    return;
  }

  findAll() {
    return this.schemaSeatTypes.find().populate("districts");
  }

  findOne(id: string) {
    return this.schemaSeatTypes.findById(id);
  }

  async update(id: string, updateSeatTypeDto: UpdateSeatTypeDto) {
    const updatedSeatType = await this.schemaSeatTypes.findByIdAndUpdate(
      id,
      updateSeatTypeDto,
      { new: true }
    );

    if (!updateSeatTypeDto) {
      throw new NotFoundException(`Seat Types with id ${id} not found`);
    }
    return {
      message: "Seat Types updated successfully",
    };
  }

  async remove(id: string) {
    const deletedSeatTypes = await this.schemaSeatTypes.findByIdAndDelete(id);

    if (!deletedSeatTypes) {
      throw new NotFoundException(`Seat Types with id ${id} not found`);
    }
    return {
      message: "Seat Types deleted successfully",
      data: deletedSeatTypes,
    };
  }
}
