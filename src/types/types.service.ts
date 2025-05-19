import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Types } from "./schemas/types.schema";
import { CreateTypeDto } from "./dto/create-types.dto";
import { UpdateTypeDto } from "./dto/update-region.dto";

@Injectable()
export class TypesService {
  constructor(@InjectModel(Types.name) private schemaTypes: Model<Types>) {}

  async create(createTypesDto: CreateTypeDto) {
    const Types = await this.schemaTypes.findOne({
      name: createTypesDto.name,
    });
    if (Types) {
      throw new BadRequestException("Bunday Types nomi allaqachon mavjud");
    }
    return await this.schemaTypes.create(createTypesDto);
  }

  findAll() {
    return this.schemaTypes.find().populate("districts");
  }

  findOne(id: string) {
    return this.schemaTypes.findById(id);
  }

  async update(id: string, updateTypesDto: UpdateTypeDto) {
    const updatedTypes = await this.schemaTypes.findByIdAndUpdate(
      id,
      updateTypesDto,
      { new: true } // yangi holatini qaytarsin
    );

    if (!updatedTypes) {
      throw new NotFoundException(`Types with id ${id} not found`);
    }

    return {
      message: "Types updated successfully",
      data: updatedTypes,
    };
  }

  async remove(id: string) {
    const deletedTypes = await this.schemaTypes.findByIdAndDelete(id);

    if (!deletedTypes) {
      throw new NotFoundException(`Types with id ${id} not found`);
    }

    return {
      message: "Types deleted successfully",
      data: deletedTypes,
    };
  }
}
