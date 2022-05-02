import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { validateOrReject } from 'class-validator';
import { Seller } from './seller.model';
import { SellerService } from './seller.service';

@ApiTags('seller')
@Controller('seller')
export class SellerController {
    constructor(private sellerService: SellerService) {}

    @ApiOperation({ summary: 'get all sellers' })
    @ApiResponse({ status: 200, type: [Seller] })
    @Get()
    getALL() {
        return this.sellerService.getAllSeller();
    }

    @ApiOperation({ summary: 'get all sellers and products' })
    @ApiResponse({ status: 200, type: [Seller] })
    @Get('/seller-and-product-by-name/:seller_name?')
    getSellerAndProduct(@Param('seller_name') sellerName?: string) {
        return this.sellerService.getSellerAndProductByName(sellerName);
    }
}
