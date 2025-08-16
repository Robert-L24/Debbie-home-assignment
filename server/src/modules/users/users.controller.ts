import { Controller, Delete, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard, JwtRequest } from "../auth/jwt.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Delete("me")
  async deleteMe(@Req() req: JwtRequest) {
    await this.users.deleteUser(req.user.sub);
    return { success: true };
  }
}