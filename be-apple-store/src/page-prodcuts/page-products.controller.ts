import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PageProductsService } from "./page-products.service";
import { CreatePageProductsDto } from "./dto/create-page-products.dto";


@Controller('page-products')
export class PageProductsController {
    constructor(private readonly PageProductsService: PageProductsService) { }

    @Post()
    create(@Body() createPageProductsDto: CreatePageProductsDto) {
        return this.PageProductsService.create(createPageProductsDto);
    }

    @Get()
    findAll() {
        return this.PageProductsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.PageProductsService.findOne(id);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updatePageProductsDto:
        CreatePageProductsDto) {
        return this.PageProductsService.update(id, updatePageProductsDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.PageProductsService.remove(id);
    }
}
