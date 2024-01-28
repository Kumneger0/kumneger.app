import NotFound from "@/components/404";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Page Not Found",
    openGraph: { images: [{ url: "/api/gen-og-images/page-not-found" }] }
  };
}

function Page() {
  return <NotFound />;
}

export default Page;
