import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Product } from 'src/product/product.model';

interface SellerCreationAttrs {
    name: string;
}

@Table({ tableName: 'seller' })
export class Seller extends Model<Seller, SellerCreationAttrs> {
    @ApiProperty({ example: '1', description: 'unique id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 'Powerman',
        description: 'seller name',
    })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @HasMany(() => Product)
    product: Product[];
}
