import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle(`${process.env.PROJECT_NAME} `)
  .setDescription(`${process.env.PROJECT_NAME}`)
  .setVersion('1.0.0')
  .addBearerAuth(
    {
      in: 'header',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
    },
    'JWT-auth',
  )
  .build();



  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: 0, docExpansion: 'none' },
    customSiteTitle: process.env.PROJECT_NAME,
  });




  await app.listen(3000);
}
bootstrap();
