import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
        <h1 className="text-4xl font-black tracking-tight mb-4">About MathStack</h1>
        <Button asChild>
          <Link href="/notes">Start Learning <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </div>
    </div>
  );
}
