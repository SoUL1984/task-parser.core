import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { Seller } from 'src/seller/seller.model';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
    providers: [ProductService],
    controllers: [ProductController],
    imports: [SequelizeModule.forFeature([Seller, Product])],
    exports: [ProductService],
})
export class ProductModule {}
