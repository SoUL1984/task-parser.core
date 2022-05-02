import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './product.model';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @ApiOperation({ summary: 'get all product' })
    @ApiResponse({ status: 200, type: [Product] })
    @Get()
    getALL() {
        return this.productService.getAllProduct();
    }
}
