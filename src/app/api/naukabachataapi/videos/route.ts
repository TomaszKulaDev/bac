import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Dodajemy cache dla odpowiedzi
export const revalidate = 3600; // odświeżaj co godzinę

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  try {
    const result = await cloudinary.search
      .expression("asset_folder:TopSocialDance AND resource_type:video")
      .with_field("tags")
      .with_field("context")
      .sort_by("created_at", "desc")
      .max_results(30)
      .execute();

    // Sprawdzamy pozostały limit
    const remainingCalls = result.rate_limit_remaining;
    if (remainingCalls < 50) {
      // Ostrzeżenie przy niskim limicie
      console.warn(
        `Uwaga: pozostało tylko ${remainingCalls} zapytań do API Cloudinary`
      );
    }

    const videos = result.resources.map((resource: any) => ({
      id: resource.asset_id,
      publicId: resource.public_id,
      title: resource.filename || resource.public_id.split("/").pop(),
      description: resource.context?.description || "",
      thumbnailUrl: cloudinary.url(resource.public_id, {
        resource_type: "video",
        transformation: [
          { width: 480, height: 270, crop: "fill" },
          { format: "jpg" },
        ],
      }),
      duration: resource.duration || 0,
      category: resource.context?.category || "BASICS",
      tags: resource.tags || [],
      instructorProfileUrl: resource.context?.instructorProfileUrl || "",
      instructorName: resource.context?.instructorName || "",
      instructorAvatarUrl: resource.context?.instructorAvatarUrl || "",
    }));

    // Dodajemy cache-control do odpowiedzi
    return NextResponse.json(
      {
        videos,
        totalCount: result.total_count,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Błąd pobierania filmów: " + (error as Error).message },
      { status: 500 }
    );
  }
}
