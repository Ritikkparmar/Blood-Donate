import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        console.log("Attempting to connect to database...");
        await prisma.$connect();
        console.log("Database connection successful");

        console.log("Fetching donors...");
        const donors = await prisma.donor.findMany();
        console.log(`Successfully fetched ${donors.length} donors`);

        return NextResponse.json({
            success: true,
            message: "Donors fetched successfully",
            donors
        });
    } catch (err) {
        console.error("GET Error:", err);
        if (err instanceof Error) {
            console.error("Error name:", err.name);
            console.error("Error message:", err.message);
            console.error("Error stack:", err.stack);
        }
        return NextResponse.json(
            { 
                success: false,
                message: "Failed to fetch donors", 
                error: err instanceof Error ? err.message : "Unknown error occurred"
            },
            { status: 500 }
        );
    } finally {
        try {
            await prisma.$disconnect();
            console.log("Database connection closed");
        } catch (disconnectError) {
            console.error("Error disconnecting from database:", disconnectError);
        }
    }
} 