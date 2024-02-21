import { clsx, type ClassValue } from 'clsx';
import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';
import { HOME_DOMAIN } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = 'Datadrops - Get more from your data',
  description = 'Datadrops is freemium model based application to inspect, transform and share data from various sources.',
  icons = '/favicon.ico',
  noIndex = false
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@edvdevp'
    },
    icons,
    metadataBase: new URL(HOME_DOMAIN),
    themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
    // viewport: 'width=device-width, target-densityDpi=device-dpi'
  };
}
