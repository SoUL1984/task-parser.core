import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ParamParserDto {
    @ApiProperty({
        example: 'https://www.ozon.ru/category/tehnika-dlya-kuhni-10523/',
        description: 'url',
    })
    @IsString({ message: 'string expected' })
    readonly url: string;

    @ApiProperty({
        example: '1',
        description: 'first page',
    })
    @IsNumber({}, { message: 'expected number' })
    readonly first_page: number;

    @ApiProperty({
        example: '1',
        description: 'number of pages',
    })
    @IsNumber({}, { message: 'expected number' })
    readonly number_pages: number;
}
