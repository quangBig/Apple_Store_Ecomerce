import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    message: string;

    @Prop({ required: true })
    reply: string;

    @Prop({ default: "neutral" }) // good | bad | neutral
    sentiment: string;

    @Prop({ default: "other" }) // product_info | stock | combo | policy | shipping_payment | promotion | other
    intent: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
