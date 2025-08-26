import { InjectModel } from "@nestjs/mongoose";
import { Page, PageDocument } from "./schemas/page.schema";
import { Model } from "mongoose";
import { NotFoundException } from "@nestjs/common";
import { UpdatePageDto } from "./dto/update-page.dto";
import { CreatePageDto } from "./dto/create-page.dto";

export class PagesService {
    constructor(
        @InjectModel(Page.name) private pageModel: Model<PageDocument>
    ) { }
    async create(createPageDto: CreatePageDto): Promise<Page> {

        const existingTittle = await this.pageModel.findOne({ title: createPageDto.title }).exec();
        if (existingTittle) {
            throw new NotFoundException(`Page with title ${createPageDto.title} already exists`);
        }
        const existingLinks = await this.pageModel.findOne({ title: createPageDto.link }).exec();
        if (existingLinks) {
            throw new NotFoundException(`Page with title ${createPageDto.link} already exists`);
        }
        const createdPage = new this.pageModel(createPageDto);
        return createdPage.save();
    }
    async findAll(): Promise<Page[]> {
        return this.pageModel.find().exec();
    }

    async findOne(id: string): Promise<Page> {
        const pages = await this.pageModel.findById(id).exec();
        if (!pages) {
            throw new NotFoundException(`Page not ${id} found`);
        }
        return pages;
    }

    async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
        const existingPage = await this.pageModel.findOne({ title: updatePageDto.title }).exec();
        if (existingPage && existingPage._id.toString() !== id) {
            throw new NotFoundException(`Page with title ${updatePageDto.title} already exists`);
        }
        const updated = await this.pageModel
            .findByIdAndUpdate(id, updatePageDto, { new: true })
            .exec();

        if (!updated) {
            throw new NotFoundException(`Page with ID ${id} not found`);
        }

        return updated;
    }


    async remove(id: string): Promise<Page> {
        const deleted = await this.pageModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new NotFoundException(`Page with id ${id} not found`);
        }
        return deleted;
    }

}