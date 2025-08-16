import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/modules/app.module";

describe("E2E", () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const mod = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = mod.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => { await app.close(); });

  it("POST /auth/login", async () => {
    const res = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email: "demo@myapp.ai", password: "demo1234" })
      .expect(201);
    token = res.body.access_token;
    expect(token).toBeDefined();
  });

  it("DELETE /users/me", async () => {
    await request(app.getHttpServer())
      .delete("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});