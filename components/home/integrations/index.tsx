"use client";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";

export default function Integrations({ className }: { className?: string }) {
  const { isMobile } = useMediaQuery();
  return (
    <MaxWidthWrapper>
      <div
        id="integrations"
        className={cn("flex flex-col md:flex-row-reverse", className)}
      >
        <div className="w-full md:w-1/2 md:flex md:items-center text-center mb-10">
          <h2 className="my-5 font-display font-extrabold leading-[1.15] text-gray-600 text-2xl sm:text-4xl sm:leading-[1.15]">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Integrate&nbsp;
            </span>
            your data with few clicks
          </h2>
        </div>
        <div
          id="images"
          className="w-full md:w-1/2 flex flex-wrap gap-x-16 gap-y-8 items-center justify-center px-12"
        >
          <CldImage
            className="relative"
            src="datadrops/gmail_qb5b6q"
            alt="Integrate with Gmail"
            width={isMobile ? 50 : 100}
            height={isMobile ? 50 : 100}
            priority
          />
          <CldImage
            className="relative"
            src="datadrops/facebook_wu5rpl"
            alt="Integrate with Facebook"
            width={isMobile ? 50 : 100}
            height={isMobile ? 50 : 100}
            priority
          />
          <CldImage
            className="relative"
            src="datadrops/spotify_frjig3"
            alt="Integrate with Spotify"
            width={isMobile ? 50 : 100}
            height={isMobile ? 50 : 100}
            priority
          />
          <CldImage
            className="relative"
            src="datadrops/ig_k7axma"
            alt="Integrate with Instagram"
            width={isMobile ? 50 : 100}
            height={isMobile ? 50 : 100}
            priority
          />
          <CldImage
            className="relative"
            src="datadrops/github_u5r5zd"
            alt="Integrate with Instagram"
            width={isMobile ? 50 : 100}
            height={isMobile ? 50 : 100}
            priority
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
