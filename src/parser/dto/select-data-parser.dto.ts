import { ApiProperty } from '@nestjs/swagger';

export class ParamParserDto {
    @ApiProperty({
        example: 'https://www.ozon.ru/category/tehnika-dlya-kuhni-10523/',
        description: 'url',
    })
    readonly url: string;

    @ApiProperty({
        example: '1',
        description: 'first page',
    })
    readonly first_page: number;

    @ApiProperty({
        example: '1',
        description: 'number of pages',
    })
    readonly number_pages: number;
}
