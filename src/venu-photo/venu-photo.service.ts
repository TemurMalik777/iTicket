import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateVenuPhotoDto } from "./dto/create-venu-photo.dto";
import { UpdateVenuPhotoDto } from "./dto/update-venu-photo.dto";
import { InjectModel } from "@nestjs/mongoose";
import { VenuePhoto } from "./schemas/venu-photo.schema";
import { Model } from "mongoose";
import { Types } from "mongoose";

@Injectable()
export class VenuPhotoService {
  constructor(
    @InjectModel(VenuePhoto.name) private schemaVenuPhoto: Model<VenuePhoto>
  ) {}

  async create(createVenuPhotoDto: CreateVenuPhotoDto) {
    const existing = await this.schemaVenuPhoto.findOne({
      name: createVenuPhotoDto.name,
    });
    if (existing) {
      throw new BadRequestException("Bunday rasm nomi allaqachon mavjud");
    }
    return await this.schemaVenuPhoto.create(createVenuPhotoDto);
  }

  findAll() {
    return this.schemaVenuPhoto.find().populate("districts");
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto'g'ri formatda");
    }

    const venuePhoto = await this.schemaVenuPhoto.findById(id);
    if (!venuePhoto) {
      throw new NotFoundException("Venue photo topilmadi");
    }

    return venuePhoto;
  }

  async update(id: string, updateVenuPhotoDto: UpdateVenuPhotoDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto'g'ri formatda");
    }

    const updated = await this.schemaVenuPhoto.findByIdAndUpdate(
      id,
      updateVenuPhotoDto,
      { new: true }
    );

    if (!updated) {
      throw new NotFoundException("Venue photo topilmadi");
    }

    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto'g'ri formatda");
    }

    const deleted = await this.schemaVenuPhoto.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Venue photo topilmadi");
    }

    return { message: "Venue photo o'chirildi" };
  }
}
