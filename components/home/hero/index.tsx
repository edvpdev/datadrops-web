import ClientOnlyCldImage from '@/components/shared/ClientOnlyCldImage';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Hero({
  className
}: {
  className?: string;
}) {
  return (
    <MaxWidthWrapper>
      <div
        id="hero"
        className={cn('text-center', className)}>
        <div className="flex w-full justify-center">
          <ClientOnlyCldImage
            className="relative"
            src="datadrops/logo1_y9dxau"
            alt="Datadrops Logo"
            width={240}
            height={54}
          />
        </div>
        <h1 className="font-display my-5 text-2xl font-extrabold leading-[1.15] text-gray-600 sm:text-6xl sm:leading-[1.15]">
          Inspect Drops of Your Data With
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Datadrops
          </span>
        </h1>
        <button className="btn btn-primary btn-md border-0 bg-gradient-to-r from-primary to-secondary bg-size-200 bg-pos-0 text-white transition-all duration-500 sm:btn-lg hover:bg-pos-100">
          <Link href="/sign-in">Get Started</Link>
        </button>
      </div>
    </MaxWidthWrapper>
  );
}
