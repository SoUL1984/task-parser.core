import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        example: '1',
        description: 'seller id',
    })
    @IsNumber({}, { message: 'expected number' })
    readonly sellerId: number;

    @ApiProperty({
        example: '',
        description: 'title product',
    })
    @IsString({ message: 'string expected' })
    readonly title: string;

    @ApiProperty({
        example: '10100.10',
        description: 'price of the product',
    })
    @IsNumber({}, { message: 'expected number' })
    readonly price: number;
}
