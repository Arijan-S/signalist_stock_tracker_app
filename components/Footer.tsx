import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/icons/logo.svg"
              alt="Signalist logo"
              width={120}
              height={28}
              className="h-7 w-auto"
            />
          </Link>
          <p className="text-sm text-gray-400 text-center">
            © 2025 Signalist. All rights reserved by{" "}
            <span className="text-yellow-500 font-medium">AsDeveloped</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
