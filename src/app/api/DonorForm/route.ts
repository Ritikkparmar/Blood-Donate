import prisma from "@/app/libs/prismadb"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    try {
        // Test database connection
        await prisma.$connect();
        console.log("Database connection successful");

        const body = await request.json();
        console.log("Received data:", body);
        
        const { firstName, lastName, phone, email, bloodGroup, age, address, state, city, gender } = body;

        // Check if email already exists
        const existingDonor = await prisma.donor.findUnique({
            where: { email }
        });
        console.log("Existing donor check:", existingDonor);

        if (existingDonor) {
            console.log("Donor already exists with email:", email);
            return NextResponse.json(
                { message: "A donor with this email already exists." },
                { status: 400 }
            );
        }

        const newDonor = await prisma.donor.create({
            data: {
                firstName,
                lastName,
                phone,
                email,
                bloodGroup,
                age: parseInt(age),
                address,
                state,
                city,
                gender
            }
        });
        console.log("Successfully created donor:", newDonor);

        return NextResponse.json({
            success: true,
            message: "Donor registered successfully",
            data: newDonor
        });
    } catch (err) {
        console.error("POST Error details:", err);
        if (typeof err === "object" && err !== null && "code" in err && "message" in err) {
            // @ts-ignore
            console.error("Prisma Error Code:", err.code);
            // @ts-ignore
            console.error("Prisma Error Message:", err.message);
        }
        return NextResponse.json(
            { message: "Failed to register donor", error: typeof err === "object" && err !== null && "message" in err ? (err as any).message : String(err) },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

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