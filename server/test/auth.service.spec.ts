import { Test } from "@nestjs/testing";
import { AuthService } from "../src/modules/auth/auth.service";
import { UsersService } from "../src/modules/users/users.service";
import { JwtModule } from "@nestjs/jwt";

describe("AuthService", () => {
  let auth: AuthService;

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: "test" })],
      providers: [AuthService, UsersService]
    }).compile();

    auth = mod.get(AuthService);
  });

  it("logs in demo user", async () => {
    const { access_token } = await auth.login("demo@myapp.ai", "demo1234");
    expect(access_token).toBeDefined();
  });

  it("rejects invalid password", async () => {
    await expect(auth.login("demo@myapp.ai", "wrong")).rejects.toBeTruthy();
  });
});