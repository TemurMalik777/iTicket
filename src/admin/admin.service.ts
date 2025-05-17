import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin, AdminDocument } from "./schemas/admin.schema";
import { isValidObjectId, Model } from "mongoose";

import * as bcrytp from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminSchema: Model<Admin>) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, email } = createAdminDto;
    const admin = await this.adminSchema.findOne({ email });
    if (admin) {
      throw new BadRequestException("Bunday email li foydalanuchi mavjud emas");
    }
    if (password !== confirm_password) {
      throw new BadRequestException("Paroll mos emas");
    }
    const hashed_password = await bcrytp.hash(password, 7);
    return this.adminSchema.create({ ...createAdminDto, hashed_password });
  }

  async findAll() {
    return await this.adminSchema.find().select("-hashed_password -__v");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("ID notogri");
    const admin = await this.adminSchema
      .findById(id)
      .select("-hashed_password -__v");
    if (!admin) throw new NotFoundException("Admin topilmadi");
    return admin;
  }

  async findByEmail(email: string) {
    return this.adminSchema.findOne({ email });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("ID notogri");
    const updated = await this.adminSchema
      .findByIdAndUpdate(id, updateAdminDto, {
        new: true,
      })
      .select("-hashed_password -__v");
    if (!updated) throw new NotFoundException("Admin topilmadi");
    return updated;
  }

  

  async remove(id: number) {
    if (!isValidObjectId(id)) throw new BadRequestException("ID notogri");
    const deleted = await this.adminSchema.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException("Admin topilmadi");
    return { message: "Admin ochirildi", id };
    // return this.adminSchema.deleteOne({_id:id})
  }

  async updateRefreshToken(id: string, hashed_refresh_token: string) {
  const updatedAdmin = await this.adminSchema.findByIdAndUpdate(
    id,
    { hashed_refresh_token },
    { new: true }
  );
  return updatedAdmin;
}

}
