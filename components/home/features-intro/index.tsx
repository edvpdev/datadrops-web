"use client";

import type { CustomFlowbiteTheme } from "flowbite-react";
import { Carousel } from "flowbite-react";
import { useState } from "react";
import { IoAnalytics } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";

enum Feature {
  INTEGRATIONS = "Integrations",
  QUERYING = "Querying",
  ANALYTICS = "Analytics",
}

const customTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
  indicators: {
    active: {
      off: "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
      on: "bg-white dark:bg-gray-800",
    },
    base: "h-3 w-3 rounded-full",
    wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: "w-full flex-shrink-0 transform cursor-grab snap-center",
  },
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};

const featuresGallery = {
  [Feature.INTEGRATIONS]: {
    description: "some text 1",
    images: [
      {
        alt: "Gmail",
        src: "datadrops/gmail_qb5b6q",
      },
      {
        alt: "Gmail",
        src: "https://flowbite.com/docs/images/carousel/carousel-2.svg",
      },
    ],
  },
  [Feature.QUERYING]: {
    description: "some text 2",
    images: [
      {
        alt: "Gmail",
        src: "https://flowbite.com/docs/images/carousel/carousel-3.svg",
      },
      {
        alt: "Gmail",
        src: "https://flowbite.com/docs/images/carousel/carousel-4.svg",
      },
    ],
  },
  [Feature.ANALYTICS]: {
    description: "some text 3",
    images: [
      {
        alt: "Gmail",
        src: "https://flowbite.com/docs/images/carousel/carousel-5.svg",
      },
    ],
  },
};

export function FeaturesIntro() {
  const [feature, setFeature] = useState<Feature>(Feature.INTEGRATIONS);
  return (
    <div className="bg-purple-glass backdrop-blur rounded-2xl">
      <div className="flex flex-col lg:content-center lg:justify-evenly lg:flex-row w-full lg:w-5/6 mx-auto px-8 lg:p-8">
        <div
          id="feature-title"
          className=" bg-anti-glass rounded-md justify-center flex flex-col p-4 my-4 md:flex-row lg:flex-col md:py-4 lg:px-4 md:my-4 lg:my-0 lg:py-32 lg:mr-8 gap-8 lg:gap-4"
        >
          <div
            className={cn(
              "flex gap-2 md:gap-4 items-center justify-start font-bold text-sm sm:text-md md:text-xl cursor-pointer",
              feature === Feature.INTEGRATIONS
                ? "text-primary"
                : "text-gray-600"
            )}
            onClick={() => setFeature(Feature.INTEGRATIONS)}
          >
            <IoAnalytics /> Integrations
          </div>
          <div className="divider hidden lg:flex m-0"></div>
          <div
            className={cn(
              "flex gap-2 md:gap-4 items-center justify-start font-bold text-sm sm:text-md md:text-xl cursor-pointer",
              feature === Feature.QUERYING ? "text-primary" : "text-gray-600"
            )}
            onClick={() => setFeature(Feature.QUERYING)}
          >
            <SiSimpleanalytics /> Querying
          </div>
          <div className="divider hidden lg:flex m-0"></div>
          <div
            className={cn(
              "flex gap-2 md:gap-4 items-center justify-start font-bold text-sm sm:text-md md:text-xl cursor-pointer",
              feature === Feature.ANALYTICS ? "text-primary" : "text-gray-600"
            )}
            onClick={() => setFeature(Feature.ANALYTICS)}
          >
            <TbReportAnalytics /> Analytics
          </div>
        </div>

        <div id="feature-img" className="relative flex flex-col">
          <div className="h-[400px] max-h-[400px] max-w-[700px]">
            <Carousel theme={customTheme}>
              {featuresGallery[feature].images.map((img, indx) => (
                <CldImage
                  key={indx}
                  alt={img.alt}
                  src={img.src}
                  width={700}
                  height={400}
                  className="block relative"
                />
              ))}
            </Carousel>
          </div>

          <div className="my-4 text-center text-gray-500">
            <h4>{featuresGallery[feature].description}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
