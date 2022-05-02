import { IsNumber, IsString } from "class-validator";

export class SelectSellerDto {
    @IsNumber({}, { message: 'expected number' })
    readonly id: number;

    @IsString({ message: 'string expected' })
    readonly name: string;
}
