import { ApiProperty } from '@nestjs/swagger';
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Seller } from 'src/seller/seller.model';

interface ProductCreationAttrs {
    sellerId: number;
    title: string;
    price: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductCreationAttrs> {
    @ForeignKey(() => Seller)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: 'id seller',
    })
    sellerId: number;

    @BelongsTo(() => Seller)
    seller: Seller;

    @ApiProperty({
        example:
            'Капучинатор / вспениватель молока / мини-миксер для капучино, латте',
        description: 'title product',
    })
    @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
    title: string;

    @ApiProperty({
        example: '5 100.10',
        description: 'product price',
    })
    @Column({
        type: DataType.DECIMAL(8, 2),
        allowNull: false,
        primaryKey: true,
    })
    price: number;
}
