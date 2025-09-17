import {
    IsArray,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsOptional()
    @IsString()
    variantName?: string;

    @IsOptional()
    @IsString()
    color?: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number; // giá đã giảm

    @IsOptional()
    @IsNumber()
    originalPrice?: number;

    @IsOptional()
    @IsString()
    image?: string;
}

class ShippingAddressDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    address: string;

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

class PaymentDto {
    @IsEnum(["cod", "momo"])
    method: "cod" | "momo";

    @IsOptional()
    @IsEnum(["pending", "paid", "failed"])
    status?: "pending" | "paid" | "failed";
}

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @ValidateNested()
    @Type(() => ShippingAddressDto)
    shippingAddress: ShippingAddressDto;

    @ValidateNested()
    @Type(() => PaymentDto)
    payment: PaymentDto;

    @IsOptional()
    @IsString()
    note?: string;

    @IsNumber()
    subtotal: number;

    @IsNumber()
    total: number;
}
