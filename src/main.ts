import { NestFactory } from '@nestjs/core'

import { VersioningType } from '@nestjs/common'
import { AppModule } from '@/app.module'
import { HttpExceptionFilter } from '@/common/filter/all-exception.filter'
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(3000);
}
bootstrap();
