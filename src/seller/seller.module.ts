import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SellerController } from './seller.controller';
import { Seller } from './seller.model';
import { SellerService } from './seller.service';

@Module({
    providers: [SellerService],
    controllers: [SellerController],
    imports: [SequelizeModule.forFeature([Seller])],
    exports: [SellerService],
})
export class SellerModule {}
