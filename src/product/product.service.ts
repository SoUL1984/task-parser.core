import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product) private productRepository: typeof Product,
    ) {}
    async createProduct(dto: CreateProductDto[]) {
        return await this.productRepository.bulkCreate(dto, {
            ignoreDuplicates: true,
        });
    }

    async getAllProduct() {
        return await this.productRepository.findAll({
            attributes: ['sellerId', 'title', 'price'],
        });
    }

    async getAllPoductBySellerID(sellerId: number) {
        return await this.productRepository.findAll({
            attributes: ['sellerId', 'title', 'price'],
            where: { sellerId: sellerId },
        });
    }
}
