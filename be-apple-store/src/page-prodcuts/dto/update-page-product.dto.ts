import { PartialType } from "@nestjs/mapped-types"
import { CreatePageProductsDto } from "./create-page-products.dto"

export class UpdatePageProductDto extends PartialType(CreatePageProductsDto) { }