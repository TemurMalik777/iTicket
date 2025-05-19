import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateLangDto } from "./dto/create-lang.dto";
import { UpdateLangDto } from "./dto/update-lang.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Lang } from "./schemas/lang.schema";

@Injectable()
export class LangService {
  constructor(@InjectModel(Lang.name) private langModel: Model<Lang>) {}

  async create(createLangDto: CreateLangDto) {
    const existing = await this.langModel.findOne({ name: createLangDto.name });
    if (existing) {
      throw new BadRequestException("Bunday til nomi allaqachon mavjud");
    }
    return this.langModel.create(createLangDto);
  }

  async findAll() {
    return this.langModel.find();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto‘g‘ri formatda");
    }

    const lang = await this.langModel.findById(id);
    if (!lang) {
      throw new NotFoundException("Til topilmadi");
    }

    return lang;
  }

  async update(id: string, updateLangDto: UpdateLangDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID notogri formatda");
    }

    const updated = await this.langModel.findByIdAndUpdate(id, updateLangDto, {
      new: true,
    });

    if (!updated) {
      throw new NotFoundException("Til topilmadi");
    }

    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID notogri formatda");
    }

    const deleted = await this.langModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Til topilmadi");
    }

    return { message: "Til ochirildi" };
  }
}
