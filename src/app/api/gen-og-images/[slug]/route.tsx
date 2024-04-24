import { NextRequest } from "next/server";
import { ImageResponse } from 'next/og'

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
          fontSize: 80,
          padding: "20px",
          textAlign: "center",
          fontFamily: 'sans-serif',
          background: "lavender",
        }}>
        {params.slug}
      </div>
    )
  );
}
