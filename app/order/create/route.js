import Product from "@/app/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {

        const {userId} = getAuth(request);

        const {address , items } = await request.json();

        if(!address || items.length == 0) {
            return NextResponse.json({ success: false , message : 'Invalid data' })
        }

        let amount = 0;

        for (const item of items) {
        const product = await Product.findById(item.product);
        amount += product.offerPrice * item.quantity;
        }

        

        
    } catch (error) {
        
    }

}