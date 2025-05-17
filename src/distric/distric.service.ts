import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDistricDto } from "./dto/create-distric.dto";
import { UpdateDistricDto } from "./dto/update-distric.dto";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Distric } from "./schemas/distric.schema";
import { Region } from "../region/schemas/region.schema";

@Injectable()
export class DistricService {
  constructor(
    @InjectModel(Distric.name) private readonly scheamDistric: Model<Distric>,
    @InjectModel(Region.name) private regionSchema: Model<Region>
  ) {}

  //  async findAllWithRegion(): Promise<Distric[]> {
  //   return this.scheamDistric.find().populate('regionId').exec();
  // }

  async create(createDistricDto: CreateDistricDto) {
    const { regionId } = createDistricDto;
    if (!mongoose.isValidObjectId(regionId)) {
      throw new BadRequestException("Region Id notugri")
    }
    const region = await this.regionSchema.findById(regionId);
    if (!region) {
      throw new BadRequestException("Bunday Region yo'q");
    }

    const distric = await this.scheamDistric.create(createDistricDto);
    region.districts.push(distric);
    await region.save();
    return distric;
  }

  // async create(createDistricDto: CreateDistricDto) {
  //   const exist = await this.scheamDistric.findOne({
  //     name: createDistricDto.name,
  //   });
  //   if (exist) {
  //     throw new BadRequestException("Bunday distric nomi allaqachon mavjud");
  //   }
  //   return await this.scheamDistric.create(createDistricDto);
  // }

  async findAll() {
    return await this.scheamDistric.find().populate("regionId");
  }

  async findOne(id: string) {
    const distric = await this.scheamDistric.findById(id).exec();
    if (!distric) {
      throw new NotFoundException(`Distric with id ${id} not found`);
    }
    return distric;
  }

  async update(id: string, updateDistricDto: UpdateDistricDto) {
    const updated = await this.scheamDistric.findByIdAndUpdate(
      id,
      updateDistricDto,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundException(`Distric with id ${id} not found`);
    }
    return {
      message: "Distric updated successfully",
      data: updated,
    };
  }

  async remove(id: string) {
    const deleted = await this.scheamDistric.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Distric with id ${id} not found`);
    }
    return {
      message: "Distric deleted successfully",
      data: deleted,
    };
  }
}
