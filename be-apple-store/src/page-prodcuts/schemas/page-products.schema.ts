import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type PageProductsDocument = PageProducts & Document;
@Schema({ timestamps: true })
export class PageProducts {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    slug: string;

    @Prop({ required: true })
    image: string;
}
export const PageProductsSchema = SchemaFactory.createForClass(PageProducts);