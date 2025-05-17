import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AdminService } from "../admin/admin.service";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService
  ) {}

  @Post("admin/login")
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginAdmin(loginDto, res);
  }

  @Post("admin/logout")
  @HttpCode(200)
  async logout(
    @Body("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutAdmin(refreshToken, res);
  }

  @Post("customer/login")
  @HttpCode(200)
  async customerLogin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginAdmin(loginDto, res);
  }
}
