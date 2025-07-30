import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./schemas/products.schema";
import { Model } from "mongoose";
import { CreateProductDto } from "./dto/create-products.dto";
import { UpdateProductDto } from "./dto/update-products.dto";


@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    async create(dto: CreateProductDto): Promise<Product> {
        const createdProduct = new this.productModel(dto);
        return createdProduct.save();
    }

    async finAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findOne({ id }).exec();
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        return product;
    }

    async update(id: string, dto: UpdateProductDto): Promise<Product> {
        const update = await this.productModel.findOneAndUpdate({ id }, dto, { new: true })
        if (!update) {
            throw new Error(`Product with id ${id} not found`);
        }
        return update;
    }
    async delete(id: string): Promise<void> {
        const deleted = await this.productModel.findOneAndDelete({ id });
        if (!deleted) {
            throw new Error(`Product with id ${id} not found`);
        }
    }
}