import { IsString } from 'class-validator';

export class CreateSellerDto {
    @IsString({ message: 'string expected' })
    readonly name: string;
}
