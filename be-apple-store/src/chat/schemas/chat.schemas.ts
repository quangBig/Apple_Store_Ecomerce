import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";



export type ChatDocument = Chat & Document & {
    createdAt: Date;
    updatedAt: Date;
};
@Schema({ timestamps: true })
export class Chat {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    userId: string;

    @Prop({ required: true })
    message: string;

    @Prop({ required: true })
    reply: string;

    @Prop({ default: "neutral" })
    sentiment: string;

    @Prop({ default: "other" })
    intent: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);