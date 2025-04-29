import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await prisma.$connect();
        const donors = await prisma.donor.findMany();
        return NextResponse.json({
            success: true,
            message: "Donors fetched successfully",
            donors
        });
    } catch (err) {
        console.error("GET Error:", err);
        return NextResponse.json(
            { message: "Failed to fetch donors", error: typeof err === "object" && err !== null && "message" in err ? (err as any).message : String(err) },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
} 