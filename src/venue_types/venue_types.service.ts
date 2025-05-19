import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateVenueTypeDto } from "./dto/create-venue_type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue_type.dto";
import { Venue_type } from "./schemas/venue_type.schema";

@Injectable()
export class VenueTypesService {
  constructor(
    @InjectModel(Venue_type.name) private venueTypeModel: Model<Venue_type>
  ) {}

  async create(createVenueTypeDto: CreateVenueTypeDto) {
    return await this.venueTypeModel.create(createVenueTypeDto);
  }

  async findAll() {
    return this.venueTypeModel.find().populate("districts");
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid ID");
    }

    const venueType = await this.venueTypeModel.findById(id);
    if (!venueType) {
      throw new NotFoundException("Venue type not found");
    }

    return venueType;
  }

  async update(id: string, updateVenueTypeDto: UpdateVenueTypeDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid ID");
    }

    const updated = await this.venueTypeModel.findByIdAndUpdate(
      id,
      updateVenueTypeDto,
      { new: true }
    );

    if (!updated) {
      throw new NotFoundException("Venue type not found");
    }

    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid ID");
    }

    const deleted = await this.venueTypeModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException("Venue type not found");
    }

    return { message: "Venue type deleted successfully" };
  }
}
