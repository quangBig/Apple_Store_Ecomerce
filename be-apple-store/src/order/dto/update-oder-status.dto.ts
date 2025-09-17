import { IsEnum } from "class-validator";

export class UpdateOrderStatusDto {
    @IsEnum(["pending", "processing", "shipping", "completed", "cancelled"])
    status: "pending" | "processing" | "shipping" | "completed" | "cancelled";
}
