import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Page, PageDocument } from "./schemas/page.schema";

import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";
import { CreateAboutUsDto } from "./dto/create-aboutus.dto";
import { UpdateAboutUsDto } from "./dto/update-aboutus.dto";
import { CreateMainHeaderDto } from "./dto/create-main-header.dto";
import { UpdateMainHeaderDto } from "./dto/update-main-header.dto";

@Injectable()
export class PageService {
    constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) { }

    /** ----- PAGE ----- **/
    async create(): Promise<PageDocument> {
        const page = new this.pageModel({});
        return page.save();
    }

    async getById(id: string): Promise<PageDocument> {
        const page = await this.pageModel.findById(id).exec();
        if (!page) throw new NotFoundException("Page not found");
        return page;
    }

    /** ----- MAIN HEADER ----- **/
    async getMainHeader(pageId: string) {
        const page = await this.getById(pageId);
        return page.mainHeader;
    }

    async addMainHeader(pageId: string, dto: CreateMainHeaderDto) {
        return this.pageModel.findByIdAndUpdate(
            pageId,
            { $set: { mainHeader: dto } },
            { new: true }
        );
    }

    async updateMainHeader(pageId: string, dto: UpdateMainHeaderDto) {
        return this.pageModel.findByIdAndUpdate(
            pageId,
            { $set: { mainHeader: dto } },
            { new: true }
        );
    }

    async deleteMainHeader(pageId: string) {
        return this.pageModel.findByIdAndUpdate(
            pageId,
            { $unset: { mainHeader: "" } },
            { new: true }
        );
    }

    /** ----- SECTIONS ----- **/
    async getSections(pageId: string) {
        const page = await this.getById(pageId);
        return page.sections;
    }

    async addSection(pageId: string, dto: CreateSectionDto) {
        const page = await this.getById(pageId);

        // check duplicate
        if (page.sections?.find((s) => s.nameSection === dto.nameSection)) {
            throw new BadRequestException("Section name already exists");
        }
        if (page.sections?.find((s) => s.link === dto.link)) {
            throw new BadRequestException("Section link already exists");
        }

        page.sections.push(dto as any);
        return page.save();
    }

    async updateSection(pageId: string, sectionId: string, dto: UpdateSectionDto) {
        const page = await this.getById(pageId);

        // check duplicate except current
        if (
            page.sections?.find(
                (s) =>
                    s.nameSection === dto.nameSection &&
                    s._id?.toString() !== sectionId
            )
        ) {
            throw new BadRequestException("Section name already exists");
        }
        if (
            page.sections?.find(
                (s) => s.link === dto.link && s._id?.toString() !== sectionId
            )
        ) {
            throw new BadRequestException("Section link already exists");
        }

        return this.pageModel.findOneAndUpdate(
            { _id: pageId, "sections._id": sectionId },
            { $set: { "sections.$": { _id: new Types.ObjectId(sectionId), ...dto } } },
            { new: true }
        );
    }

    async deleteSection(pageId: string, sectionId: string) {
        return this.pageModel.findByIdAndUpdate(
            pageId,
            { $pull: { sections: { _id: sectionId } } },
            { new: true }
        );
    }

    /** ----- ABOUT US ----- **/
    async getAboutUs(pageId: string) {
        const page = await this.getById(pageId);
        return page.aboutUs;
    }

    async addAboutUs(pageId: string, dto: CreateAboutUsDto) {
        const page = await this.getById(pageId);

        // check duplicate name
        if (page.aboutUs?.find((a) => a.nameaboutUs === dto.nameaboutUs)) {
            throw new BadRequestException("AboutUs name already exists");
        }

        if (!page.aboutUs) {
            page.aboutUs = [];
        }

        page.aboutUs.push(dto as any);
        return page.save();
    }

    async updateAboutUs(pageId: string, aboutId: string, dto: UpdateAboutUsDto) {
        const page = await this.getById(pageId);

        // Kiểm tra trùng tên (trừ bản ghi hiện tại)
        if (
            page.aboutUs?.find(
                (a) =>
                    a.nameaboutUs === dto.nameaboutUs &&
                    a._id?.toString() !== aboutId
            )
        ) {
            throw new BadRequestException("AboutUs name already exists");
        }

        // Tạo object update động
        const updateFields: any = {};

        if (dto.nameaboutUs !== undefined) {
            updateFields["aboutUs.$.nameaboutUs"] = dto.nameaboutUs;
        }

        if (dto.description !== undefined) {
            updateFields["aboutUs.$.description"] = dto.description;
        }

        if (dto.image !== undefined) {
            updateFields["aboutUs.$.image"] = dto.image;
        }

        // Nếu không có field nào để update
        if (Object.keys(updateFields).length === 0) {
            throw new BadRequestException("No valid fields to update");
        }

        return this.pageModel.findOneAndUpdate(
            { _id: pageId, "aboutUs._id": new Types.ObjectId(aboutId) },
            { $set: updateFields },
            { new: true }
        );
    }

    async deleteAboutUs(pageId: string, aboutId: string) {
        return this.pageModel.findByIdAndUpdate(
            pageId,
            { $pull: { aboutUs: { _id: aboutId } } },
            { new: true }
        );
    }
}
