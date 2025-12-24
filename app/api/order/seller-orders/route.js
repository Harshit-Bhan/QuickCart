import connectDB from "@/app/config/db";
import Address from "@/app/models/Address";
import Order from "@/app/models/Order";
import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const isSeller = await authSeller(userId);
        if (!isSeller) {
            return NextResponse.json(
                { success: false, message: "Not authorized" },
                { status: 403 }
            );
        }

        Address.length;

        const orders = await Order.find({ userId }).populate('address items.product');

        return NextResponse.json({ success: true, orders });

    } catch (error) {
        console.error("SELLER ORDERS API ERROR:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
