import { connectDB } from "@/app/lib/mongodb";
import { GlobalSettings } from "@/app/models/GlobalSettings";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    await connectDB();
    const globalSettings = await GlobalSettings.findOne();
    return NextResponse.json({ success: true, data: globalSettings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// export async function POST(req: any) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//   }
//   try {
//     await connectDB();
//     const { websiteName, websiteDescription, websiteKeywords, websiteAuthor, websiteLogo, websiteFavicon, websiteUrl, websiteEmail, websitePhone, websiteAddress } = await req.json();
//     const newGlobalSettings = await GlobalSettings.create({ websiteName, websiteDescription, websiteKeywords, websiteAuthor, websiteLogo, websiteFavicon, websiteUrl, websiteEmail, websitePhone, websiteAddress });
//     return NextResponse.json({ success: true, data: newGlobalSettings });

//   } catch (error: any) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

export async function PUT(req: any) {
  try {
    await connectDB();
    const {
      websiteName,
      websiteDescription,
      websiteKeywords,
      websiteAuthor,
      websiteLogo,
      websiteFavicon,
      websiteUrl,
      websiteEmail,
      websitePhone,
      websiteAddress,
    } = await req.json();
    const updatedGlobalSettings = await GlobalSettings.findOneAndUpdate(
      {},
      {
        websiteName,
        websiteDescription,
        websiteKeywords,
        websiteAuthor,
        websiteLogo,
        websiteFavicon,
        websiteUrl,
        websiteEmail,
        websitePhone,
        websiteAddress,
      },
      { new: true }
    );
    return NextResponse.json({ success: true, data: updatedGlobalSettings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
