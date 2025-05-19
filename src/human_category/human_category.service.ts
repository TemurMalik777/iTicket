import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateHumanCategoryDto } from "./dto/create-human_category.dto";
import { UpdateHumanCategoryDto } from "./dto/update-human_category.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { HumanCategory } from "./schemas/human_category.schema";

@Injectable()
export class HumanCategoryService {
  constructor(
    @InjectModel(HumanCategory.name)
    private humanCategoryModel: Model<HumanCategory>
  ) {}

  async create(createHumanCategoryDto: CreateHumanCategoryDto) {
    const existing = await this.humanCategoryModel.findOne({
      name: createHumanCategoryDto.name,
    });

    if (existing) {
      throw new BadRequestException("Bu nomdagi kategoriya allaqachon mavjud");
    }

    return this.humanCategoryModel.create(createHumanCategoryDto);
  }

  async findAll() {
    return this.humanCategoryModel.find();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto‘g‘ri formatda");
    }

    const item = await this.humanCategoryModel.findById(id);
    if (!item) {
      throw new NotFoundException("Kategoriya topilmadi");
    }

    return item;
  }

  async update(id: string, updateHumanCategoryDto: UpdateHumanCategoryDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto‘g‘ri formatda");
    }

    const updated = await this.humanCategoryModel.findByIdAndUpdate(
      id,
      updateHumanCategoryDto,
      { new: true }
    );

    if (!updated) {
      throw new NotFoundException("Kategoriya topilmadi");
    }

    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID notogri formatda");
    }

    const deleted = await this.humanCategoryModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Kategoriya topilmadi");
    }

    return { message: "Kategoriya ochirildi" };
  }
}
