import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ParserService } from './parser.service';
import * as _ from 'lodash';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { SellerService } from 'src/seller/seller.service';
import { ProductService } from 'src/product/product.service';
import { ParamParserDto } from './dto/select-data-parser.dto';

@Controller('parser')
export class ParserController {
    constructor(
        private parserService: ParserService,
        private sellerService: SellerService,
        private productService: ProductService,
    ) {}

    @Post()
    async parserController(@Body() param?: ParamParserDto) {
        let allParserData: {
            seller: string;
            title: string;
            price: number;
        }[] = [];
        const lastPage = param.first_page + param.number_pages;
        for (
            let currentPage = param.first_page;
            currentPage < lastPage;
            currentPage++
        ) {
            const parserData = await this.parserService.getDataOzon(
                param.url,
                currentPage,
            );
            const ixProduct = _.groupBy(parserData, 'seller');

            // get unique sellers
            const uniqSeller = _.uniqBy(parserData, 'seller').map((el) => ({
                name: el.seller,
            }));
            const sUniqSeller = uniqSeller.map((el) => el.name);

            // get a sellers in the database and add the difference
            const hdbkSeller = await this.sellerService.getSellerByName(
                sUniqSeller,
            );

            const diffSeller = _.differenceBy(uniqSeller, hdbkSeller, 'name');

            const newSeller = await this.sellerService.createSeller(diffSeller);

            // all unique sellers
            const allSeller = [...hdbkSeller, ...newSeller];
            const ixAllSeller = _.keyBy(allSeller, 'name');

            // get an array to add products
            const aProductOnPage: CreateProductDto[] = [];
            uniqSeller.forEach((el) => {
                const aProduct = ixProduct[el.name];
                for (let i = 0; i < aProduct.length; i++) {
                    const el = aProduct[i];
                    const newEl = {
                        sellerId: ixAllSeller[el.seller].id,
                        title: el.title,
                        price: el.price,
                    };
                    aProductOnPage.push(newEl);
                }
            });

            await this.productService.createProduct(aProductOnPage);

            allParserData = [...allParserData, ...parserData];
        }

        return {
            page: allParserData,
            count: allParserData.length,
        };
    }
}
