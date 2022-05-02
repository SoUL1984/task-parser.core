import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ParserModule } from './parser/parser.module';
import { Product } from './product/product.model';
import { ProductModule } from './product/product.module';
import { Seller } from './seller/seller.model';
import { SellerModule } from './seller/seller.module';
import 'dotenv/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Seller, Product],
            autoLoadModels: true,
        }),
        ParserModule,
        SellerModule,
        ProductModule,
    ],
})
export class AppModule {}
