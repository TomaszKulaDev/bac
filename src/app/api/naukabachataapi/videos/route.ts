import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {
  BachataVideo,
  DanceLevel,
} from "@/app/nauka-tanca-bachata/types/video";

// Dodajemy cache dla odpowiedzi
export const revalidate = 3600; // odświeżaj co godzinę

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Interfejs dla zasobu z Cloudinary
interface CloudinaryResource {
  asset_id: string;
  public_id: string;
  filename?: string;
  duration?: number;
  metadata?: {
    level?: DanceLevel;
  };
  context?: {
    level?: DanceLevel;
    category?: string;
    description?: string;
    instructorProfileUrl?: string;
    instructorName?: string;
    instructorAvatarUrl?: string;
  };
  tags?: string[];
}

export async function GET(request: Request) {
  try {
    const result = await cloudinary.search
      .expression("asset_folder:NaukaZinstagrama AND resource_type:video")
      .with_field("tags")
      .with_field("context")
      .with_field("metadata")
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

    const videos = result.resources.map((resource: CloudinaryResource) => {
      // Debug logowanie dla każdego zasobu
      console.log("Resource metadata:", {
        publicId: resource.public_id,
        metadata: resource.metadata,
        context: resource.context,
      });

      // Określamy poziom z metadanych lub kontekstu 123
      let level =
        resource.metadata?.level || resource.context?.level || "BEGINNER";

      // Normalizujemy poziom do dozwolonych wartości
      if (!["BEGINNER", "INTERMEDIATE", "ADVANCED", "ALL"].includes(level)) {
        console.warn(
          `Invalid level "${level}" for video ${resource.public_id}, defaulting to BEGINNER`
        );
        level = "BEGINNER";
      }

      return {
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
        category: resource.context?.category || "BASIC",
        level: level as DanceLevel,
        tags: resource.tags || [],
        instructorProfileUrl: resource.context?.instructorProfileUrl || "",
        instructorName: resource.context?.instructorName || "",
        instructorAvatarUrl: resource.context?.instructorAvatarUrl || "",
      };
    });

    // Debug logowanie wszystkich filmów
    console.log(
      "Processed videos:",
      videos.map((v: BachataVideo) => ({
        title: v.title,
        level: v.level,
      }))
    );

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
