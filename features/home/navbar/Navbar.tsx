'use client';

import { APP_DOMAIN, SHOW_BACKGROUND_SEGMENTS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useMediaQuery, useScroll } from '@/lib/hooks';
import { ClientOnlyCldImage, MaxWidthWrapper } from '@/lib/components';

export default function NavBar() {
  const { isMobile } = useMediaQuery();
  const scrolled = useScroll(80);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <nav
      className={cn(`sticky inset-x-0 top-0 z-30 w-full transition-all`, {
        'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
        'border-b border-gray-200 bg-white':
          selectedLayout && !SHOW_BACKGROUND_SEGMENTS.has(selectedLayout)
      })}>
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between max-md:justify-center">
          <Link href="/">
            <ClientOnlyCldImage
              className="relative"
              src="datadrops/sqq65jgwxrtxhnxljnf4"
              alt="Datadrops"
              width={100}
              height={40}
              mobileHeight={50}
              mobileWidth={120}
            />
          </Link>
          <div className="hidden lg:flex">
            {!isMobile && (
              <>
                {/* <Link
                  className="upper-case text-md/10 px-4 font-medium uppercase leading-8 text-neutral"
                  href="#features">
                  Documentation
                </Link> */}
                {/* <Link
                  className="upper-case text-md/10 px-4 font-medium uppercase leading-8 text-neutral"
                  href="#features">
                  Blog
                </Link> */}
              </>
            )}
          </div>

          <div className="hidden lg:flex">
            <div className="btn btn-primary h-[2rem] min-h-[2rem] rounded-full text-primary-content">
              <Link href={`${APP_DOMAIN}`}>Sign In</Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
