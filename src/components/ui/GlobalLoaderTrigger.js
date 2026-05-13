'use client';
import { useLoading } from "@/context/LoadingContext";
import PageLoader from "./PageLoader";

export default function GlobalLoaderTrigger() {
  const { isLoading } = useLoading();
  
  // This loader is persistent in the layout
  // It won't unmount when the page content changes
  return <PageLoader isVisible={isLoading} projectName="Portfolio" />;
}
