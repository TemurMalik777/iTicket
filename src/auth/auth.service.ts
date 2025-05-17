import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminDocument } from "../admin/schemas/admin.schema";
import { LoginDto } from "./dto/login.dto";
import { AdminService } from "../admin/admin.service";
import { Response } from "express";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}

  //================================== ADMIN =================================
  private async generateTokenAdmin(admin: AdminDocument) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creater: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async loginAdmin(loginDto: LoginDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException("Email yoki parol xato");
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      admin.hashed_password
    );

    if (!admin) {
      throw new UnauthorizedException("Email yoki parol xato");
    }

    const { accessToken, refreshToken } = await this.generateTokenAdmin(admin);
    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.hashed_refresh_token = hashed_refresh_token;
    await admin.save();
    return {
      message: "Xush kelibsiz",
      admin: admin.id,
      accessToken,
    };
  }

  async logoutAdmin(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!adminData) {
      throw new ForbiddenException("Admin not verifayed");
    }
    const hashed_refresh_token = "";
    await this.adminService.updateRefreshToken(
      adminData.id,
      hashed_refresh_token
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "admin logged succesfully",
    };
    return response;
  }

  async refreshToken(adminId: string, refresh_token: string, res: Response) {
    // 1. Tokenni decode qilamiz
    const decodeToken: any = this.jwtService.decode(refresh_token);

    if (!decodeToken || adminId !== decodeToken['id']) {
      throw new ForbiddenException('Ruxsat etilmagan');
    }

    // 2. Admin bazadan topiladi
    const admin = await this.adminService.findOne(adminId);
    if (!admin || !admin.hashed_refresh_token) {
      throw new NotFoundException('Admin topilmadi');
    }

    // 3. Hashed tokenni tekshiradi
    const tokenMatch = await bcrypt.compare(
      refresh_token,
      admin.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Refresh token mos emas');
    }

    // 4. Yangi tokenlar generatsiya qilinadi
    const payload = { id: admin._id, email: admin.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    const newRefreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    // 5. Refresh tokenni hashlab bazaga saqlash
    const hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await this.adminService.updateRefreshToken(admin.id, hashed_refresh_token);

    // 6. Cookie'ga refresh tokenni yozish
    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: true, // HTTPS uchun true
      sameSite: 'strict',
      maxAge: Number(process.env.COOKIE_TIME) || 7 * 24 * 60 * 60 * 1000,
    });

    // 7. Javob
    return {
      message: 'Tokenlar yangilandi',
      adminId: admin._id,
      access_token: accessToken,
    };
  }
  //================================== ADMIN =================================
  //================================== CUSTOMER ==============================


}
