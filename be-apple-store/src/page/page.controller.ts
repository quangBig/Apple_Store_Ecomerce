import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from "@nestjs/common";
import { PageService } from "./page.service";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";
import { CreateAboutUsDto } from "./dto/create-aboutus.dto";
import { UpdateAboutUsDto } from "./dto/update-aboutus.dto";
import { CreateMainHeaderDto } from "./dto/create-main-header.dto";
import { UpdateMainHeaderDto } from "./dto/update-main-header.dto";

@Controller("pages")
export class PageController {
    constructor(private readonly pageService: PageService) { }

    /** ----- PAGE ----- **/
    @Post()
    createPage() {
        return this.pageService.create();
    }

    @Get(":id")
    getPage(@Param("id") id: string) {
        return this.pageService.getById(id);
    }

    /** ----- MAIN HEADER ----- **/
    @Get(":id/main-header")
    getMainHeader(@Param("id") pageId: string) {
        return this.pageService.getMainHeader(pageId);
    }

    @Post(":id/main-header")
    addMainHeader(
        @Param("id") pageId: string,
        @Body() dto: CreateMainHeaderDto
    ) {
        return this.pageService.addMainHeader(pageId, dto);
    }

    @Put(":id/main-header")
    updateMainHeader(
        @Param("id") pageId: string,
        @Body() dto: UpdateMainHeaderDto
    ) {
        return this.pageService.updateMainHeader(pageId, dto);
    }

    @Delete(":id/main-header")
    deleteMainHeader(@Param("id") pageId: string) {
        return this.pageService.deleteMainHeader(pageId);
    }

    /** ----- SECTIONS ----- **/
    @Get(":id/sections")
    getSections(@Param("id") pageId: string) {
        return this.pageService.getSections(pageId);
    }

    @Post(":id/sections")
    addSection(
        @Param("id") pageId: string,
        @Body() dto: CreateSectionDto
    ) {
        return this.pageService.addSection(pageId, dto);
    }

    @Put(":id/sections/:sectionId")
    updateSection(
        @Param("id") pageId: string,
        @Param("sectionId") sectionId: string,
        @Body() dto: UpdateSectionDto
    ) {
        return this.pageService.updateSection(pageId, sectionId, dto);
    }

    @Delete(":id/sections/:sectionId")
    deleteSection(
        @Param("id") pageId: string,
        @Param("sectionId") sectionId: string
    ) {
        return this.pageService.deleteSection(pageId, sectionId);
    }

    /** ----- ABOUT US ----- **/
    @Get(":id/about-us")
    getAboutUs(@Param("id") pageId: string) {
        return this.pageService.getAboutUs(pageId);
    }

    @Post(":id/about-us")
    addAboutUs(
        @Param("id") pageId: string,
        @Body() dto: CreateAboutUsDto
    ) {
        return this.pageService.addAboutUs(pageId, dto);
    }

    @Put(":id/about-us/:aboutId")
    updateAboutUs(
        @Param("id") pageId: string,
        @Param("aboutId") aboutId: string,
        @Body() dto: UpdateAboutUsDto
    ) {
        return this.pageService.updateAboutUs(pageId, aboutId, dto);
    }

    @Delete(":id/about-us/:aboutId")
    deleteAboutUs(
        @Param("id") pageId: string,
        @Param("aboutId") aboutId: string
    ) {
        return this.pageService.deleteAboutUs(pageId, aboutId);
    }
}