import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link href="/">
          <Button className="yellow-btn">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
