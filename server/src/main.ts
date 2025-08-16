import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { ValidationPipe } from "@nestjs/common";

function parseOrigins(input?: string): boolean | string[] {
  if (!input) return true;
  return input.split(",").map((s) => s.trim());
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: parseOrigins(process.env.CORS_ORIGINS),
      credentials: true
    }
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();