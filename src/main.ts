import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MockAPIService } from './mocked-api/mocked-api.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    await app.get(MockAPIService).mockAPI();
  } catch (error) {
    console.log(error);
  }
  await app.listen(3000);
}
bootstrap();
