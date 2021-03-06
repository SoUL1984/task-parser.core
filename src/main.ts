import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const PORT = process.env.PORT || 3000;

    const config = new DocumentBuilder()
        .setTitle('parsertask.core')
        .setDescription('Документация BACKEND REST API')
        .setVersion('1.0.0')
        .addTag('Loshkarev Pavel')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () =>
        console.log(`Application running on http://localhost:${PORT}`),
    );
}
bootstrap();
