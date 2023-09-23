'use client';

import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Carousel } from 'flowbite-react';
import { useState } from 'react';
import { IoAnalytics } from 'react-icons/io5';
import { SiSimpleanalytics } from 'react-icons/si';
import { TbReportAnalytics } from 'react-icons/tb';
import { cn } from '@/lib/utils';
import ClientOnlyCldImage from '@/components/shared/ClientOnlyCldImage';

enum Feature {
  INTEGRATIONS = 'Integrations',
  QUERYING = 'Querying',
  ANALYTICS = 'Analytics'
}

const customTheme: CustomFlowbiteTheme['carousel'] = {
  root: {
    base: 'relative h-full w-full',
    leftControl:
      'absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none',
    rightControl:
      'absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none'
  },
  indicators: {
    active: {
      off: 'bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800',
      on: 'bg-white dark:bg-gray-800'
    },
    base: 'h-3 w-3 rounded-full',
    wrapper:
      'absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3'
  },
  item: {
    base: 'absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2',
    wrapper:
      'w-full flex-shrink-0 transform cursor-grab snap-center'
  },
  control: {
    base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10',
    icon: 'h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6'
  },
  scrollContainer: {
    base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg',
    snap: 'snap-x'
  }
};

const featuresGallery = {
  [Feature.INTEGRATIONS]: {
    description: 'some text 1',
    images: [
      {
        alt: 'Gmail',
        src: 'datadrops/gmail_qb5b6q'
      },
      {
        alt: 'Gmail',
        src: 'https://flowbite.com/docs/images/carousel/carousel-2.svg'
      }
    ]
  },
  [Feature.QUERYING]: {
    description: 'some text 2',
    images: [
      {
        alt: 'Gmail',
        src: 'https://flowbite.com/docs/images/carousel/carousel-3.svg'
      },
      {
        alt: 'Gmail',
        src: 'https://flowbite.com/docs/images/carousel/carousel-4.svg'
      }
    ]
  },
  [Feature.ANALYTICS]: {
    description: 'some text 3',
    images: [
      {
        alt: 'Gmail',
        src: 'https://flowbite.com/docs/images/carousel/carousel-5.svg'
      }
    ]
  }
};

export function FeaturesIntro() {
  const [feature, setFeature] = useState<Feature>(
    Feature.INTEGRATIONS
  );
  return (
    <div className="rounded-2xl bg-purple-glass backdrop-blur">
      <div className="mx-auto flex w-full flex-col px-8 lg:w-5/6 lg:flex-row lg:content-center lg:justify-evenly lg:p-8">
        <div
          id="feature-title"
          className=" my-4 flex flex-col justify-center gap-8 rounded-md bg-anti-glass p-4 md:my-4 md:flex-row md:py-4 lg:my-0 lg:mr-8 lg:flex-col lg:gap-4 lg:px-4 lg:py-32">
          <div
            className={cn(
              'sm:text-md flex cursor-pointer items-center justify-start gap-2 text-sm font-bold md:gap-4 md:text-xl',
              feature === Feature.INTEGRATIONS
                ? 'text-primary'
                : 'text-gray-600'
            )}
            onClick={() =>
              setFeature(Feature.INTEGRATIONS)
            }>
            <IoAnalytics /> Integrations
          </div>
          <div className="divider m-0 hidden lg:flex"></div>
          <div
            className={cn(
              'sm:text-md flex cursor-pointer items-center justify-start gap-2 text-sm font-bold md:gap-4 md:text-xl',
              feature === Feature.QUERYING
                ? 'text-primary'
                : 'text-gray-600'
            )}
            onClick={() => setFeature(Feature.QUERYING)}>
            <SiSimpleanalytics /> Querying
          </div>
          <div className="divider m-0 hidden lg:flex"></div>
          <div
            className={cn(
              'sm:text-md flex cursor-pointer items-center justify-start gap-2 text-sm font-bold md:gap-4 md:text-xl',
              feature === Feature.ANALYTICS
                ? 'text-primary'
                : 'text-gray-600'
            )}
            onClick={() => setFeature(Feature.ANALYTICS)}>
            <TbReportAnalytics /> Analytics
          </div>
        </div>

        <div
          id="feature-img"
          className="relative flex flex-col">
          <div className="h-[400px] max-h-[400px] max-w-[700px]">
            <Carousel theme={customTheme}>
              {featuresGallery[feature].images.map(
                (img, indx) => (
                  <ClientOnlyCldImage
                    key={indx}
                    alt={img.alt}
                    src={img.src}
                    width={700}
                    height={400}
                    className="relative block"
                  />
                )
              )}
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
