import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
    Req,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    // 🛒 Tạo đơn hàng
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() dto: CreateOrderDto, @Req() req) {
        console.log("User trong req:", req.user); // test xem có gì
        const userId = req.user?.userId || req.user?.userId;
        return this.orderService.create(dto, userId);
    }




    // 📋 Lấy tất cả đơn hàng (admin)
    @Get()
    async findAll() {
        return this.orderService.findAll();
    }

    // 👤 Lấy đơn theo user
    @Get("user/:userId")
    async findByUser(@Param("userId") userId: string) {
        return this.orderService.findByUser(userId);
    }

    // 🔍 Lấy chi tiết 1 đơn
    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.orderService.findOne(id);
    }

    // 🚚 Update trạng thái đơn (pending → shipping → completed...)
    @Patch(":id/status")
    async updateStatus(@Param("id") id: string, @Body("status") status: string) {
        return this.orderService.updateStatus(id, status);
    }

    // 💳 Update trạng thái thanh toán (paid/failed)
    @Patch(":id/payment")
    async updatePaymentStatus(
        @Param("id") id: string,
        @Body("status") status: "pending" | "paid" | "failed",
        @Body("transactionId") transactionId?: string
    ) {
        return this.orderService.updatePaymentStatus(id, status, transactionId);
    }

    // ❌ Hủy đơn hàng
    @Delete(":id")
    async cancel(@Param("id") id: string) {
        return this.orderService.cancelOrder(id);
    }
}
