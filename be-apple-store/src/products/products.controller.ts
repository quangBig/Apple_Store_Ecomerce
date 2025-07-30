import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-products.dto";



@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.productsService.create(dto);
    }

    @Get()
    findAll() {
        return this.productsService.finAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: CreateProductDto) {
        return this.productsService.update(id, dto);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.delete(id);
    }
}