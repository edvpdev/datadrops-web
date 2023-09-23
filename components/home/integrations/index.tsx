import ClientOnlyCldImage from '@/components/shared/ClientOnlyCldImage';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { cn } from '@/lib/utils';

export default function Integrations({
  className
}: {
  className?: string;
}) {
  return (
    <MaxWidthWrapper>
      <div
        id="integrations"
        className={cn(
          'flex flex-col md:flex-row-reverse',
          className
        )}>
        <div className="mb-10 w-full text-center md:flex md:w-1/2 md:items-center">
          <h2 className="font-display my-5 text-2xl font-extrabold leading-[1.15] text-gray-600 sm:text-4xl sm:leading-[1.15]">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Integrate&nbsp;
            </span>
            your data with few clicks
          </h2>
        </div>
        <div
          id="images"
          className="flex w-full flex-wrap items-center justify-center gap-x-16 gap-y-8 px-12 md:w-1/2">
          <ClientOnlyCldImage
            className="relative"
            src="datadrops/gmail_qb5b6q"
            alt="Integrate with Gmail"
            width={100}
            height={100}
            mobileHeight={50}
            mobileWidth={50}
          />
          <ClientOnlyCldImage
            className="relative"
            src="datadrops/facebook_wu5rpl"
            alt="Integrate with Facebook"
            width={100}
            height={100}
            mobileHeight={50}
            mobileWidth={50}
          />
          <ClientOnlyCldImage
            className="relative"
            src="datadrops/spotify_frjig3"
            alt="Integrate with Spotify"
            width={100}
            height={100}
            mobileHeight={50}
            mobileWidth={50}
          />
          <ClientOnlyCldImage
            className="relative"
            src="datadrops/ig_k7axma"
            alt="Integrate with Instagram"
            width={100}
            height={100}
            mobileHeight={50}
            mobileWidth={50}
          />
          <ClientOnlyCldImage
            className="relative"
            src="datadrops/github_u5r5zd"
            alt="Integrate with Instagram"
            width={100}
            height={100}
            mobileHeight={50}
            mobileWidth={50}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
