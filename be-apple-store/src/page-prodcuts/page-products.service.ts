import { InjectModel } from "@nestjs/mongoose";
import { PageProducts, PageProductsDocument } from "./schemas/page-products.schema";
import { Model } from "mongoose";
import { CreatePageProductsDto } from "./dto/create-page-products.dto";


export class PageProductsService {
    constructor(
        @InjectModel(PageProducts.name) private pageProductsModel: Model<PageProductsDocument>
    ) { }
    async create(createPageProductsDto: CreatePageProductsDto): Promise<PageProducts> {
        const existingName = await this.pageProductsModel.findOne({ name: createPageProductsDto.name }).exec();
        if (existingName) {
            throw new Error(`Page with name ${createPageProductsDto.name} already exists`);
        }

        const existingSlug = await this.pageProductsModel.findOne({ slug: createPageProductsDto.slug }).exec();
        if (existingSlug) {
            throw new Error(`Page with slug ${createPageProductsDto.slug} already exists`);
        }
        const createdPageProducts = new this.pageProductsModel(createPageProductsDto);
        return createdPageProducts.save();
    }

    async findAll(): Promise<PageProducts[]> {
        return this.pageProductsModel.find().exec();
    }

    async findOne(id: string): Promise<PageProducts> {
        const pageProducts = await this.pageProductsModel.findById(id).exec();
        if (!pageProducts) {
            throw new Error(`PageProducts with id ${id} not found`);
        }
        return pageProducts;
    }

    async update(id: string, updatePageProductsDto: CreatePageProductsDto): Promise<PageProducts> {
        const existingPageProducts = await this.pageProductsModel.findOne({ name: updatePageProductsDto.name }).exec();
        if (existingPageProducts && existingPageProducts._id.toString() !== id) {
            throw new Error(`PageProducts with name ${updatePageProductsDto.name} already exists`);
        }

        const existingSlug = await this.pageProductsModel.findOne({ slug: updatePageProductsDto.slug }).exec();
        if (existingSlug && existingSlug._id.toString() !== id) {
            throw new Error(`PageProducts with slug ${updatePageProductsDto.slug} already exists`);
        }

        const updated = await this.pageProductsModel
            .findByIdAndUpdate(id, updatePageProductsDto, { new: true })
            .exec();

        if (!updated) {
            throw new Error(`PageProducts with ID ${id} not found`);
        }

        return updated;
    }

    async remove(id: string): Promise<PageProducts> {
        const deleted = await this.pageProductsModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new Error(`PageProducts with id ${id} not found`);
        }
        return deleted;
    }
}