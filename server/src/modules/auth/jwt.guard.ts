import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

export type JwtRequest = Request & { user: { sub: string; email: string } };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) throw new UnauthorizedException();

    const token = auth.slice("Bearer ".length);
    try {
      const payload = await this.jwt.verifyAsync(token);
      (req as JwtRequest).user = { sub: payload.sub, email: payload.email };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}