import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { cn } from "@/lib/utils";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Hero({ className }: { className?: string }) {
  return (
    <MaxWidthWrapper>
      <div id="hero" className={cn("text-center", className)}>
        <div className="w-full flex justify-center">
          <Image
            className="relative"
            src="/logo1.png"
            alt="Datadrops Logo"
            width={240}
            height={54}
            priority
          />
        </div>
        <h1 className="my-5 font-display text-2xl font-extrabold leading-[1.15] text-gray-600 sm:text-6xl sm:leading-[1.15]">
          Inspect Drops of Your Data With
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Datadrops
          </span>
        </h1>
        {/* <SignedOut> */}
        <button className="btn btn-primary btn-md sm:btn-lg border-0 text-white bg-gradient-to-r from-primary to-secondary transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100">
          <Link href="/sign-in">Get Started</Link>
        </button>
        {/* </SignedOut> */}
      </div>
    </MaxWidthWrapper>
  );
}
