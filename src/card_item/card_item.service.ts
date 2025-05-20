import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
// import { CardItem, CardItemDocument } from "./schemas/card-item.schema";
import { CreateCardItemDto } from "./dto/create-card_item.dto";
import { UpdateCardItemDto } from "./dto/update-card_item.dto";
import { CartiTem, CartiTemDocument } from "./schemas/card_item.schema";

@Injectable()
export class CardItemService {
  constructor(
    @InjectModel(CartiTem.name)
    private readonly cardItemModel: Model<CartiTemDocument>
  ) {}

  async create(createCardItemDto: CreateCardItemDto): Promise<CartiTem> {
    const createdItem = new this.cardItemModel(createCardItemDto);
    return createdItem.save();
  }

  async findAll() {
    return this.cardItemModel.find().exec();
  }

  async findOne(id: string) {
    const item = await this.cardItemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`CardItem with id ${id} not found`);
    }
    return item;
  }

  async update(id: string, updateCardItemDto: UpdateCardItemDto) {
    const updatedItem = await this.cardItemModel
      .findByIdAndUpdate(id, updateCardItemDto, {
        new: true,
      })
      .exec();
    if (!updatedItem) {
      throw new NotFoundException(`CardItem with id ${id} not found`);
    }
    return updatedItem;
  }

  async remove(id: string) {
    const deletedItem = await this.cardItemModel.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException(`CardItem with id ${id} not found`);
    }
    return deletedItem;
  }
}
