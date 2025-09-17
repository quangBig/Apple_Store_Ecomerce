import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-oder.dto";


@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    // ===== CREATE ORDER =====
    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    // ===== GET ALL ORDERS =====
    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    // ===== GET ONE ORDER =====
    // order.controller.ts
    @Get("user/:userId")
    findByUser(@Param("userId") userId: string) {
        return this.orderService.findByUser(userId);
    }


    // ===== UPDATE ORDER (shippingAddress + note) =====
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }

    // ===== DELETE ORDER =====
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.orderService.remove(id);
    }
}
