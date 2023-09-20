import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";


export const runtime = "edge";

export function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 70,
          padding: "20px",
          textAlign: "center",
          background: "lavender",
        }}>
        {params.slug.split(".")[0]}
      </div>
    )
  );
}
