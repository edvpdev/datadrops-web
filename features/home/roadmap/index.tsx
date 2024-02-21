import { MaxWidthWrapper } from '@/lib/components';
import { DropletSvg } from '@/lib/components/svgs';
import { cn } from '@/lib/utils';

export default function Roadmap({ className }: { className?: string }) {
  return (
    <MaxWidthWrapper>
      <div
        id="future"
        className={cn('flex flex-col items-center text-center', className)}>
        <h6 className="mb-2 text-sm font-semibold uppercase text-neutral">
          Future
        </h6>
        <h2 className="mb-4 text-2xl font-bold uppercase text-neutral lg:text-4xl">
          Many more features to come
        </h2>
        <p className="text-md mb-12 lg:text-lg">
          Datadrops is currently in alpha and we will be adding many more
          features in the future.
        </p>
        <div className="mb-8 flex w-full flex-col lg:flex-row lg:justify-between">
          <div
            id="feature-card"
            className="flex basis-1/3 flex-col items-center gap-2">
            <h3 className="my-8 text-xl font-bold text-neutral lg:text-2xl">
              Integrations
            </h3>
            <div className="mb-4 text-left">
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div className="text-wrap">Granular access levels</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div className="text-wrap">New providers</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div className="text-wrap">
                  Automatic & scheduled synchronizations
                </div>
              </div>
            </div>
          </div>
          <div
            id="feature-card"
            className="flex basis-1/3 flex-col items-center gap-2">
            <h3 className="my-8 text-xl font-bold text-neutral lg:text-2xl">
              Data Management
            </h3>
            <div className="mb-4 text-left">
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div className="text-wrap">Templates marketplace</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div className="text-wrap">Cross entity templates</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div className="text-wrap">Versioning</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div className="text-wrap">Sharing & access</div>
              </div>
            </div>
          </div>
          <div
            id="feature-card"
            className="flex flex-col items-center gap-2 lg:basis-1/3">
            <h3 className="my-8 text-xl font-bold text-neutral lg:text-2xl">
              Analytics
            </h3>
            <div className="mb-4 text-left">
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div className="text-wrap">APIs for views</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div className="text-wrap">Notifiers & subscriptions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
