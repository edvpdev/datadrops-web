import { cn } from '@/lib/utils';
import Link from 'next/link';
import Raindrops from '../raindrops';
import { MaxWidthWrapper } from '@/lib/components';
import { APP_DOMAIN } from '@/lib/constants';

export default function Hero({ className }: { className?: string }) {
  return (
    <MaxWidthWrapper className="bg-accent">
      <div
        id="hero"
        className={cn(
          'flex flex-col items-center text-center md:flex-row md:text-left',
          className
        )}>
        <div className="lg:basis-1/2">
          <h1 className="font-display my-5 text-2xl font-extrabold leading-[1.15] text-primary-content sm:text-6xl sm:leading-[1.15]">
            Connect, analyze and optimize with
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Datadrops
            </span>
          </h1>
          <p className="mb-10">
            Datadrops is the platform for developers and users to seamlessly
            connect their social profiles, collect the data and gain valuable
            insights by transforming data with prebuilt templates and custom
            queries.
          </p>
          <div className="hidden justify-center gap-2 lg:flex lg:justify-start">
            <button className="btn btn-primary btn-md border-0 bg-gradient-to-r from-primary to-secondary bg-size-200 bg-pos-0 transition-all duration-500 hover:bg-pos-100">
              <Link href={`${APP_DOMAIN}/sign-in`}>Get Started</Link>
            </button>
            {/* <button className="btn btn-primary btn-outline btn-md">
              <Link href="/sign-in">Learn more</Link>
            </button> */}
          </div>
        </div>
        <div className="hidden self-stretch lg:block lg:basis-1/2">
          <Raindrops />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
