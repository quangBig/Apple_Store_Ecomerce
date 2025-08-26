import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PageDocument = Page & Document;

@Schema({ timestamps: true })
export class Page {
    @Prop(raw({
        nameTitle: { type: String },
        description: { type: String },
    }))
    mainHeader?: {
        nameTitle?: string;
        description?: string;
    };

    @Prop({
        type: [raw({
            // 👇 Mongoose sẽ tự sinh _id cho từng section
            _id: { type: Types.ObjectId, auto: true },
            nameSection: { type: String },
            description: { type: String },
            image: { type: String },
            link: { type: String },
            reverse: { type: Boolean },
        })],
        default: [],
    })
    sections: {
        _id?: Types.ObjectId;   // 👈 optional
        nameSection?: string;
        description?: string;
        image?: string;
        link?: string;
        reverse?: boolean;
    }[];

    @Prop({
        type: [raw({
            _id: { type: Types.ObjectId, auto: true },  // 👈 tương tự cho AboutUs
            nameaboutUs: { type: String },
            description: { type: String },
            image: { type: String },
        })],
        default: [],
    })
    aboutUs?: {
        _id?: Types.ObjectId;   // 👈 optional
        nameaboutUs?: string;
        description?: string;
        image?: string;
    }[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
