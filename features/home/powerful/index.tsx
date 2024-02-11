import { MaxWidthWrapper } from '@/lib/components';
import { DropletSvg } from '@/lib/components/svgs';
import { APP_DOMAIN } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Powerful({ className }: { className?: string }) {
  return (
    <MaxWidthWrapper>
      <div id="powerful" className={cn('flex', className)}>
        <div className="flex basis-1/2 flex-col text-left">
          <h6 className="mb-2 text-sm font-semibold uppercase text-neutral">
            Powerful
          </h6>
          <h2 className="mb-4 text-4xl font-bold uppercase text-neutral">
            Unleash the Power of Data Analysis
          </h2>
          <p className="mb-4 text-lg">
            Datadrops empowers developers and users to seamlessly connect social
            profiles, interact with APIs, and analyze data.
          </p>
          <div className="mb-4">
            <div className="mb-2 flex gap-4">
              <DropletSvg></DropletSvg>
              <div>
                Analyze your data from biggest networks like Google, Github and
                Facebook{' '}
              </div>
            </div>
            <div className="mb-2 flex gap-4">
              <DropletSvg></DropletSvg>
              <div>Use prebuilt templates for each provider</div>
            </div>
            <div className="mb-2 flex gap-4">
              <DropletSvg></DropletSvg>
              <div>Transform the data to your liking with JSONata</div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-primary btn-md border-0 bg-gradient-to-r from-primary to-secondary bg-size-200 bg-pos-0 transition-all duration-500 hover:bg-pos-100">
              <Link href={`${APP_DOMAIN}/sign-in`}>Get Started</Link>
            </button>
            {/* <button className="btn btn-outline btn-md text-neutral">
              <Link href="/sign-in">Learn more</Link>
            </button> */}
          </div>
        </div>

        <div className="basis-1/2"></div>

        {/* <div className="mb-8 flex justify-between">
          <div
            id="feature-card"
            className="flex basis-1/3 flex-col items-center gap-2">
            <div className="h-48 w-48 rounded-md bg-base-300"></div>
            <h3 className="my-8 text-2xl font-bold text-neutral">
              Connect Profiles and Analyze Data
            </h3>
            <p>
              Connect your social profiles and start analyzing your data in just
              a few simple steps.
            </p>
          </div>
          <div
            id="feature-card"
            className="flex basis-1/3 flex-col items-center gap-2">
            <div className="h-48 w-48 rounded-md bg-base-300"></div>
            <h3 className="my-8 text-2xl font-bold text-neutral">
              Create Custom Data Views
            </h3>
            <p>
              Easily create, save, share, and consume data views as new APIs.
            </p>
          </div>
          <div
            id="feature-card"
            className="flex basis-1/3 flex-col items-center gap-2">
            <div className="h-48 w-48 rounded-md bg-base-300"></div>
            <h3 className="my-8 text-2xl font-bold text-neutral">
              Gain Actionable Insights
            </h3>
            <p>
              Leverage the power of SQL-like or JSONata-like queries to gain
              actionable insights from your social network data.
            </p>
          </div>
        </div> */}
      </div>
    </MaxWidthWrapper>
  );
}
