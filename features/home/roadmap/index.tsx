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
        <h2 className="mb-4 text-4xl font-bold uppercase text-neutral">
          Many more features to come
        </h2>
        <p className="mb-12 text-lg">
          Datadrops is currently in alpha and we will be adding many more
          features in the future.
        </p>
        <div className="mb-8 flex w-full justify-between">
          <div
            id="feature-card"
            className="flex basis-1/3 flex-col items-center gap-2">
            <h3 className="my-8 text-2xl font-bold text-neutral">
              Integrations
            </h3>
            <div className="mb-4">
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div>Granular access levels</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div>New providers</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div>Automatic & scheduled synchronizations</div>
              </div>
            </div>
          </div>
          <div
            id="feature-card"
            className="flex basis-1/3 flex-col items-center gap-2">
            <h3 className="my-8 text-2xl font-bold text-neutral">
              Data Management
            </h3>
            <div className="mb-4">
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div>Templates marketplace</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div>Cross entity templates</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div>Versioning</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div>Sharing & access</div>
              </div>
            </div>
          </div>
          <div
            id="feature-card"
            className="flex basis-1/3 flex-col items-center gap-2">
            <h3 className="my-8 text-2xl font-bold text-neutral">Analytics</h3>
            <div className="mb-4">
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div>APIs for views</div>
              </div>
              <div className="mb-2 flex gap-4">
                <DropletSvg></DropletSvg>
                <div>Notifiers & subscriptions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
