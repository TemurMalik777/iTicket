import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateEventTypeDto } from "./dto/create-event_type.dto";
import { UpdateEventTypeDto } from "./dto/update-event_type.dto";
import { EvenType } from "./schemas/event_type.schema";

@Injectable()
export class EventTypeService {
  constructor(
    @InjectModel(EvenType.name) private eventTypeModel: Model<EvenType>
  ) {}

  async create(createEventTypeDto: CreateEventTypeDto) {
    const exists = await this.eventTypeModel.findOne({
      name: createEventTypeDto.name,
    });
    if (exists) {
      throw new BadRequestException("Bunday event type allaqachon mavjud");
    }
    return this.eventTypeModel.create(createEventTypeDto);
  }

  async findAll() {
    return this.eventTypeModel.find();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto‘g‘ri");
    }
    const eventType = await this.eventTypeModel.findById(id);
    if (!eventType) {
      throw new NotFoundException("Event type topilmadi");
    }
    return eventType;
  }

  async update(id: string, updateEventTypeDto: UpdateEventTypeDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto‘g‘ri");
    }
    const updated = await this.eventTypeModel.findByIdAndUpdate(
      id,
      updateEventTypeDto,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundException("Yangilash uchun event topilmadi");
    }
    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto‘g‘ri");
    }
    const deleted = await this.eventTypeModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("O‘chirish uchun event topilmadi");
    }
    return { message: "Event type o‘chirildi", id };
  }
}
