import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

type User = {
  id: string;
  email: string;
  passwordHash: string;
};

@Injectable()
export class UsersService {
  private users = new Map<string, User>();

  constructor() {
    const demoId = "u_demo";
    const passwordHash = bcrypt.hashSync("demo1234", 10);
    this.users.set(demoId, {
      id: demoId,
      email: "demo@myapp.ai",
      passwordHash
    });
  }

  async findByEmail(email: string) {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return null;
  }

  async validatePassword(user: User, password: string) {
    return bcrypt.compare(password, user.passwordHash);
  }

  async deleteUser(userId: string) {
    if (!this.users.has(userId)) {
      throw new NotFoundException("User not found");
    }
    this.users.delete(userId);
    return { deleted: true };
  }
}