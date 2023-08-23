import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";

export function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "white",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          fontWeight: "bold",
          fontSize: "24px",
        }}>
        {params.slug.split(".")[0]}
      </div>
    )
  );
}
