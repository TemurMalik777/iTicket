import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { Ticket, TicketDocument } from "./schemas/ticket.schema";

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newTicket = new this.ticketModel(createTicketDto);
    return newTicket.save();
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec();
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket) {
      throw new NotFoundException("Ticket topilmadi");
    }
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const updatedTicket = await this.ticketModel.findByIdAndUpdate(
      id,
      updateTicketDto,
      {
        new: true,
      }
    );
    if (!updatedTicket) {
      throw new NotFoundException("Ticket yangilanishi muvaffaqiyatsiz");
    }
    return updatedTicket;
  }

  async remove(id: string): Promise<Ticket> {
    const deleted = await this.ticketModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Ticket o‘chirilmadi");
    }
    return deleted;
  }
}
