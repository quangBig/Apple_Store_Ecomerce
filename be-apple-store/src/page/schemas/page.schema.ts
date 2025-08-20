import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type PageDocument = Page & Document;
@Schema({ timestamps: true })
export class Page {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    decs: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    link: string;

    @Prop({ required: true })
    reverse: boolean;
}

export const PageSchema = SchemaFactory.createForClass(Page);