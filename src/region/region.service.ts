import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Region } from "./schemas/region.schema";

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private schemaRegion: Model<Region>,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    const region = await this.schemaRegion.findOne({
      name: createRegionDto.name,
    });
    if (region) {
      throw new BadRequestException("Bunday region nomi allaqachon mavjud");
    }
    return await this.schemaRegion.create(createRegionDto);
  }

  findAll() {
    return this.schemaRegion.find().populate("districts");
  }

  findOne(id: string) {
    return this.schemaRegion.findById(id);
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const updatedRegion = await this.schemaRegion.findByIdAndUpdate(
      id,
      updateRegionDto,
      { new: true } // yangi holatini qaytarsin
    );

    if (!updatedRegion) {
      throw new NotFoundException(`Region with id ${id} not found`);
    }

    return {
      message: "Region updated successfully",
      data: updatedRegion,
    };
  }

  async remove(id: string) {
    const deletedRegion = await this.schemaRegion.findByIdAndDelete(id);

    if (!deletedRegion) {
      throw new NotFoundException(`Region with id ${id} not found`);
    }

    return {
      message: "Region deleted successfully",
      data: deletedRegion,
    };
  }
}
