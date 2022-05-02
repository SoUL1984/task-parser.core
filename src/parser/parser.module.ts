import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { SellerModule } from 'src/seller/seller.module';
import { ParserController } from './parser.controller';
import { ParserService } from './parser.service';

@Module({
    controllers: [ParserController],
    providers: [ParserService],
    imports: [SellerModule, ProductModule],
})
export class ParserModule {}
