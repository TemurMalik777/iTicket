import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Booking, BookingDocument } from "./schemas/booking.schema";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>
  ) {}

  create(createBookingDto: CreateBookingDto) {
    const newBooking = new this.bookingModel(createBookingDto);
    return newBooking.save();
  }

  findAll() {
    return this.bookingModel.find().exec();
  }

  findOne(id: string) {
    return this.bookingModel
      .findById(id)
      .exec()
      .then((booking) => {
        if (!booking) {
          throw new NotFoundException(`Booking with id ${id} not found`);
        }
        return booking;
      });
  }

  update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.bookingModel
      .findByIdAndUpdate(id, updateBookingDto, {
        new: true,
      })
      .exec()
      .then((updated) => {
        if (!updated) {
          throw new NotFoundException(`Booking with id ${id} not found`);
        }
        return updated;
      });
  }

  remove(id: string) {
    return this.bookingModel
      .findByIdAndDelete(id)
      .exec()
      .then((deleted) => {
        if (!deleted) {
          throw new NotFoundException(`Booking with id ${id} not found`);
        }
        return deleted;
      });
  }
}
