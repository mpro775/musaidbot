// src/main.ts

import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger as PinoLogger } from 'nestjs-pino';
import { randomUUID } from 'crypto';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // نطبّق الــ global prefix "api" على كل المسارات ما عدا /api/metrics
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'api/metrics', method: RequestMethod.GET }],
  });
  if (typeof globalThis.crypto === 'undefined') {
    // نعرف كائن crypto عالمي يستخدم دالة randomUUID من Node
    (globalThis as any).crypto = { randomUUID };
  }
  app.useWebSocketAdapter(new IoAdapter(app));

  app.use(helmet());
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 60,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // ← هذا مهم جداً
    }),
  );

  const logger = app.get(PinoLogger);
  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('MusaidBot API')
    .setDescription('API documentation for MusaidBot')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .setContact(
      'Smart Academy',
      'https://smartacademy.sa',
      'support@smartacademy.sa',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:5000', 'Local environment')
    .addServer('https://api.musaidbot.com', 'Production')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true, // يضمن اكتشاف جميع المسارات
  });
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // يبقي التوكن محفوظاً
      docExpansion: 'list', // يفتح التصنيفات تلقائياً
      displayRequestDuration: true,
    },
    customSiteTitle: 'MusaidBot API Docs',
    customfavIcon: 'https://smartacademy.sa/favicon.ico',
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  });

  // مسار مخصص لتخفيف الضغط على WhatsApp
  app.use('/api/whatsapp/reply', rateLimit({ windowMs: 1000, max: 20 }));

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 Backend running on http://localhost:${port}/api`);
}

void bootstrap();
