'use client';

import { APP_DOMAIN, SHOW_BACKGROUND_SEGMENTS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useMediaQuery, useScroll } from '@/lib/hooks';
import { MaxWidthWrapper } from '@/lib/components';

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
        <div className="flex h-14 items-center justify-between">
          <div>
            <Link
              className="pr-8 text-xl font-bold normal-case sm:px-8"
              href="/home">
              Datadrops
            </Link>
            {!isMobile && (
              <>
                <Link
                  className="px-4 text-lg font-light normal-case"
                  href="#features">
                  Solutions
                </Link>
                <Link
                  className="px-4 text-lg font-light normal-case"
                  href="#pricing">
                  Pricing
                </Link>
                <Link
                  className="px-4 text-lg font-light normal-case"
                  href="#faq">
                  FAQ
                </Link>
              </>
            )}
          </div>

          <div className="flex gap-4 rounded-full">
            <div className="btn btn-primary text-white">
              <Link href={`${APP_DOMAIN}/sign-in`}>Sign In</Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
