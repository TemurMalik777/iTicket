import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { InjectModel } from "@nestjs/mongoose";
import { SeatTypes } from "../seat_type/schemas/seat_type.schema";
import { Model, Types } from "mongoose";
import { Seats } from "./schemas/seat.schema";

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(SeatTypes.name) private schemaSeatTypes: Model<SeatTypes>,
    @InjectModel(Seats.name) private schemaSeat: Model<Seats>
  ) {}

  async create(createSeatDto: CreateSeatDto) {
    const type = await this.schemaSeatTypes.findById(createSeatDto.seat_typeId);
    if (!type) {
      throw new NotFoundException("Seat turi topilmadi");
    }

    const seat = await this.schemaSeat.create(createSeatDto);
    return seat;
  }

  async findAll() {
    return this.schemaSeat.find().populate("seat_type_id");
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto‘g‘ri formatda");
    }

    const seat = await this.schemaSeat.findById(id).populate("seat_type_id");
    if (!seat) {
      throw new NotFoundException("Seat topilmadi");
    }

    return seat;
  }

  async update(id: string, updateSeatDto: UpdateSeatDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto‘g‘ri formatda");
    }

    const updated = await this.schemaSeat.findByIdAndUpdate(
      id,
      updateSeatDto,
      { new: true }
    ).populate("seat_type_id");

    if (!updated) {
      throw new NotFoundException("Seat topilmadi");
    }

    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto‘g‘ri formatda");
    }

    const deleted = await this.schemaSeat.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Seat topilmadi");
    }

    return { message: "Seat o‘chirildi" };
  }
}
