import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-products.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) { }