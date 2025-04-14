import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
      const body = await request.json();
      const {
        OrganisationName,
        OrganisationPhone,
        OrganisationEmail,
        OrganisationAddress,
        OrganisationState,
        OrganisationCity,
      } = body;
  
      // Check if the email already exists
      const existingOrg = await prisma.donorOrg.findUnique({
        where: { OrganisationEmail },
      });
  
      if (existingOrg) {
        return NextResponse.json(
          {
            success: false,
            message: "An organization with this email already exists.",
          },
          { status: 400 }
        );
      }
  
      const newOrg = await prisma.donorOrg.create({
        data: {
          OrganisationName,
          OrganisationPhone,
          OrganisationEmail,
          OrganisationAddress,
          OrganisationState,
          OrganisationCity: OrganisationCity || "",
        },
      });
  
      return NextResponse.json({
        success: true,
        message: "Organisation created successfully",
        data: newOrg,
      });
    } catch (err) {
      console.error("POST Error:", err);
      return NextResponse.json(
        { message: "Server Error", error: err },
        { status: 500 }
      );
    }
  };
  
// GET: Fetch all registered organizations
export const GET = async () => {
  try {
    const donors = await prisma.donorOrg.findMany();

    return NextResponse.json({
      success: true,
      message: "Donor organizations fetched successfully",
      donors,
    });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { message: "Server Error", error: err },
      { status: 500 }
    );
  }
};
