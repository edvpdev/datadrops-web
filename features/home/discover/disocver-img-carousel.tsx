'use client';

import { ClientOnlyCldImage } from '@/lib/components';
import { Carousel, CustomFlowbiteTheme } from 'flowbite-react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

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
      off: 'bg-primary/50 hover:bg-primary',
      on: 'bg-primary'
    },
    base: 'h-3 w-3 rounded-full',
    wrapper: 'absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3'
  },
  item: {
    base: 'absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2',
    wrapper: 'w-full flex-shrink-0 transform cursor-grab snap-center'
  },
  control: {
    base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10',
    icon: 'h-5 w-5 text-primary dark:text-gray-800 sm:h-6 sm:w-6'
  },
  scrollContainer: {
    base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg',
    snap: 'snap-x'
  }
};

interface ImageCarouselProps {
  images: { alt: string; src: string }[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const leftControl = (
    <FaChevronLeft className="hover:none inline-flex h-6 w-6 items-center justify-center rounded-full text-primary group-hover:text-primary-focus sm:h-10 sm:w-10" />
  );
  const rightControl = (
    <FaChevronRight className="hover:none inline-flex h-6 w-6 items-center justify-center rounded-full text-primary group-hover:text-primary-focus sm:h-10 sm:w-10" />
  );

  return (
    <Carousel
      theme={customTheme}
      slide={false}
      leftControl={leftControl}
      rightControl={rightControl}>
      {images.map((img, indx) => (
        <ClientOnlyCldImage
          key={indx}
          alt={img.alt}
          src={img.src}
          width={750}
          height={380}
          mobileHeight={50}
          mobileWidth={50}
          className="relative block"
        />
      ))}
    </Carousel>
  );
}
