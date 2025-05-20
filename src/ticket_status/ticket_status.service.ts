import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketStatusDto } from './dto/create-ticket_status.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket_status.dto';
import { TicketStatus, TicketStatusDocument } from './schemas/ticket_status.entity';
// import { TicketStatus, TicketStatusDocument } from './schemas/ticket_status.schema';

@Injectable()
export class TicketStatusService {
  constructor(
    @InjectModel(TicketStatus.name)
    private readonly ticketStatusModel: Model<TicketStatusDocument>,
  ) {}

  async create(createTicketStatusDto: CreateTicketStatusDto): Promise<TicketStatus> {
    const newStatus = new this.ticketStatusModel(createTicketStatusDto);
    return newStatus.save();
  }

  async findAll(): Promise<TicketStatus[]> {
    return this.ticketStatusModel.find();
  }

  async findOne(id: string): Promise<TicketStatus> {
    const status = await this.ticketStatusModel.findById(id);
    if (!status) {
      throw new NotFoundException('Ticket status topilmadi');
    }
    return status;
  }

  async update(id: string, updateTicketStatusDto: UpdateTicketStatusDto): Promise<TicketStatus> {
    const updated = await this.ticketStatusModel.findByIdAndUpdate(id, updateTicketStatusDto, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException('Ticket status yangilanishi muvaffaqiyatsiz');
    }
    return updated;
  }

  async remove(id: string): Promise<TicketStatus> {
    const deleted = await this.ticketStatusModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('Ticket status o‘chirilmadi');
    }
    return deleted;
  }
}
