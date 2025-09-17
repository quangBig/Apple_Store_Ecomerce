import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateOrderDto } from "./dto/create-order.dto";
import { Order, OrderDocument } from "./schemas/orser.schemas";
import { UpdateOrderDto } from "./dto/update-oder.dto";


@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>
    ) { }

    // ===== CREATE ORDER =====
    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const subtotal = createOrderDto.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        const total = subtotal; // sau này nếu có phí ship, giảm giá thì cộng/trừ vào đây

        const newOrder = new this.orderModel({
            ...createOrderDto,
            subtotal,
            total,
        });

        return newOrder.save();
    }

    // ===== FIND ALL ORDERS =====
    async findAll(): Promise<Order[]> {
        return this.orderModel
            .find()
            .populate("userId", "name email") // populate thông tin user
            .populate("items.productId", "name images") // populate sản phẩm
            .exec();
    }

    // ===== FIND ONE ORDER =====
    // order.service.ts
    async findByUser(userId: string): Promise<Order[]> {
        return this.orderModel
            .find({ userId }) // đúng là "userId", không phải "user"
            .populate("userId", "name email")
            .populate("items.productId", "name images")
            .exec();
    }



    // ===== UPDATE ORDER (shippingAddress + note) =====
    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const order = await this.orderModel.findByIdAndUpdate(
            id,
            { $set: updateOrderDto },
            { new: true }
        );
        if (!order) throw new NotFoundException(`Order #${id} not found`);
        return order;
    }

    // ===== DELETE ORDER =====
    async remove(id: string): Promise<Order> {
        const order = await this.orderModel.findByIdAndDelete(id);
        if (!order) throw new NotFoundException(`Order #${id} not found`);
        return order;
    }
}
