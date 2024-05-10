import connectMongoDB from "@/libs/database/mongodb";
import { NextResponse } from "next/server";

export function GET() {
    connectMongoDB()
    return NextResponse.json({test: "apa coba"}, {status: 200})
}