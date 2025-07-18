import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, trim: true })
    LastName: string;

    @Prop({ required: true, trim: true })
    Name: string;

    @Prop({ required: true, unique: true, trim: true, lowercase: true })
    Email: string;

    @Prop({ required: true, unique: true, trim: true })
    PhoneNumber: string;

    @Prop({ required: true })
    @Exclude() // Ẩn password khi trả về JSON
    Password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
