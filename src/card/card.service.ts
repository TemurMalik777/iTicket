import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Cart } from "./schemas/card.schema";
// import { Card } from './schemas/card.schema'; // to'g'ri yo'lni tekshiring

@Injectable()
export class CardService {
  constructor(@InjectModel(Cart.name) private cardModel: Model<Cart>) {}

  async create(createCardDto: CreateCardDto): Promise<Cart> {
    const newCard = new this.cardModel(createCardDto);
    return newCard.save();
  }

  async findAll(): Promise<Cart[]> {
    return this.cardModel.find().populate("customerId");
  }

  async findOne(id: string): Promise<Cart> {
    const card = await this.cardModel.findById(id).exec();
    if (!card) {
      throw new NotFoundException("Card topilmadi");
    }
    return card;
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const updated = await this.cardModel
      .findByIdAndUpdate(id, updateCardDto, {
        new: true,
      })
      .exec();

    if (!updated) {
      throw new NotFoundException("Card yangilanishi bajarilmadi");
    }

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.cardModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException("Card o‘chirishda xatolik");
    }
    return { message: "Card o‘chirildi" };
  }
}
