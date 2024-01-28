import NotFound from "@/components/404";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Not Found"
  };
}

function Page() {
  return <NotFound />;
}

export default Page;
