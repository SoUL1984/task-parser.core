import { IsNumber, IsString } from "class-validator";

export class SelectProductDto {
    @IsNumber({}, { message: 'expected number' })
    readonly sellerId: number;

    @IsString({ message: 'string expected' })
    readonly title: string;

    @IsNumber({}, { message: 'expected number' })
    readonly price: number;
}
