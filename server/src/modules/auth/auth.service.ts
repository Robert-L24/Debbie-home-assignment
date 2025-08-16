import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException("Invalid credentials");
    const ok = await this.users.validatePassword(user, password);
    if (!ok) throw new UnauthorizedException("Invalid credentials");

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwt.signAsync(payload);
    return { access_token };
  }
}