import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/product/product.model';
import { CreateSellerDto } from './dto/create-seller.dto';
import { Seller } from './seller.model';

@Injectable()
export class SellerService {
    constructor(
        @InjectModel(Seller)
        private sellerRepository: typeof Seller,
    ) {}
    async createSeller(aDto: CreateSellerDto[]) {
        return await this.sellerRepository.bulkCreate(aDto, {
            ignoreDuplicates: true,
        });
    }

    async getSellerAndProductByName(sellerName?: string) {
        let vWhere = {};
        if (sellerName) {
            vWhere = {
                where: {
                    name: sellerName,
                },
            };
        }
        const vQuery = {
            attributes: ['id', 'name'],
            include: [
                {
                    model: Product,
                    attributes: ['sellerId', 'title', 'price'],
                },
            ],
        };
        return await this.sellerRepository.findAll({ ...vQuery, ...vWhere });
    }

    async getSellerByName(aSellerName: string[]) {
        return await this.sellerRepository.findAll({
            attributes: ['id', 'name'],
            where: { name: aSellerName },
        });
    }

    async getAllSeller() {
        return await this.sellerRepository.findAll({
            attributes: ['id', 'name'],
        });
    }
}
