import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import { Venue } from "./schemas/venue.schema";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class VenueService {
  constructor(@InjectModel(Venue.name) private schemaVenue: Model<Venue>) {}

  async create(createVenueDto: CreateVenueDto) {
    return await this.schemaVenue.create(createVenueDto);
  }

  findAll() {
    return this.schemaVenue.find().populate("districtId");
  }

  findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid ID");
    }
    const venue = this.schemaVenue.findById(id);
    if (!venue) {
      throw new NotFoundException("Customer not found");
    }
    return venue;
  }

  update(id: string, updateVenueDto: UpdateVenueDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid ID");
    }

    const update = this.schemaVenue.findByIdAndUpdate(id, updateVenueDto, {
      new: true,
    });

    if (!update) {
      throw new NotFoundException("Venum not found");
    }
    return update;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Venue not found");
    }

    const deleted = this.schemaVenue.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Venue not found");
    }
    return { message: "Venue deleted successfully" };
  }
}
