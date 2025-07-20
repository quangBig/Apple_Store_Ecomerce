import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, trim: true })
    lastname: string;

    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, unique: true, trim: true, lowercase: true })
    email: string;

    @Prop({ required: true, unique: true, trim: true })
    phonenumber: string;

    @Prop({ required: true })
    @Exclude() // Ẩn password khi trả về JSON
    password: string;
    @Prop({ required: true, default: 'user' })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
