import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop()
    Outstandingfeatures: string;

    @Prop()
    category: string;

    @Prop([String])
    images: string[];

    @Prop([
        {
            // id: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: String, required: true },
            config: { type: String },
            colors: [
                {
                    name: { type: String },
                    value: { type: String },
                    hex: { type: String },
                    image: { type: String },
                    price: { type: String }
                }
            ]
        }
    ])
    variants: {
        // id: string;
        name: string;
        price: string;
        config: string;
        colors: {
            name: string;
            value: string;
            hex: string;
            image: string;
            price: string;
        }[];
    }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

