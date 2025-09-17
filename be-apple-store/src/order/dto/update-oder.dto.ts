import {
    IsOptional,
    IsString,
    IsEmail,
    IsNumber,
    IsNotEmpty,
    ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class ShippingAddressDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    firstName?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    lastName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsNumber()
    provinceCode?: number;

    @IsOptional()
    @IsString()
    provinceName?: string;

    @IsOptional()
    @IsNumber()
    districtCode?: number;

    @IsOptional()
    @IsString()
    districtName?: string;

    @IsOptional()
    @IsNumber()
    wardCode?: number;

    @IsOptional()
    @IsString()
    wardName?: string;
}

export class UpdateOrderDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ShippingAddressDto)
    shippingAddress?: ShippingAddressDto;

    @IsOptional()
    @IsString()
    note?: string;
}
