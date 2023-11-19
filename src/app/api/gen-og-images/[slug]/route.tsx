import type { NextApiRequest } from "next";
import { ImageResponse } from 'next/og'

export const runtime = "edge";

export function GET(
  req: NextApiRequest,
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
