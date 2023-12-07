'use client';

import { CldImage } from 'next-cloudinary';
import ClientOnly from './ClientOnly';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/lib/hooks';

interface ClientOnlyCldImageProps {
  className?: string;
  src: string;
  mobileWidth?: number;
  mobileHeight?: number;
  width: number;
  height: number;
  alt: string;
}

export default function ClientOnlyCldImage({
  className,
  src,
  mobileWidth = undefined,
  mobileHeight = undefined,
  width,
  height,
  alt
}: ClientOnlyCldImageProps) {
  const { isMobile } = useMediaQuery();
  return (
    <ClientOnly>
      <CldImage
        className={cn('', className)}
        src={src}
        alt={alt}
        width={isMobile && mobileWidth ? mobileWidth : width}
        height={isMobile && mobileHeight ? mobileHeight : height}
        priority
      />
    </ClientOnly>
  );
}
