import { ClientOnlyCldImage, MaxWidthWrapper } from '@/lib/components';
import { APP_DOMAIN } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ImageModal } from './discover-img-modal';

enum Feature {
  QUERYING = 'Querying',
  VIEWS = 'Views'
}

export default function Discover({ className }: { className?: string }) {
  const featuresGallery = {
    [Feature.QUERYING]: {
      images: [
        {
          alt: 'Use Templates',
          src: 'datadrops/create_templates_c3jkeq'
        },
        {
          alt: 'Transform data',
          src: 'datadrops/create_transform_k2u0cz'
        }
      ]
    },
    [Feature.VIEWS]: {
      images: [
        {
          alt: 'Create a View',
          src: 'datadrops/views_create_izhszw'
        },
        {
          alt: 'Access a View',
          src: 'datadrops/views_access_e04do8'
        }
      ]
    }
  };

  return (
    <MaxWidthWrapper>
      <div
        id="discover"
        className={cn('flex flex-col items-center text-center', className)}>
        <h6 className="mb-2 text-sm font-semibold uppercase text-neutral">
          Discover
        </h6>
        <h2 className="mb-4 text-4xl font-bold uppercase text-neutral">
          Get Started with Datadrops Today
        </h2>
        <p className="mb-12 text-lg">
          Datadrops makes it easy for developers and users to connect their
          social profiles and interact with APIs just with a few clicks. Variety
          of prepared templates will remove headaches on how to start and gain
          enhanced insights into your social network data immediately.
        </p>
        <div className="mb-8 flex w-full justify-between gap-2">
          <div
            id="feature-card"
            className="flex basis-1/3 flex-col items-center gap-2">
            <div
              id="images"
              className="min-h-48 my-4 flex h-48 w-full flex-wrap items-center justify-center gap-4">
              <ClientOnlyCldImage
                className="relative h-auto"
                src="datadrops/gmail_qb5b6q"
                alt="Integrate with Gmail"
                width={100}
                height={100}
                mobileHeight={50}
                mobileWidth={50}
              />
              <ClientOnlyCldImage
                className="relative h-auto"
                src="datadrops/facebook_wu5rpl"
                alt="Integrate with Facebook"
                width={100}
                height={100}
                mobileHeight={50}
                mobileWidth={50}
              />
            </div>
            <h3 className="my-8 text-2xl font-bold text-neutral">
              Connect with various providers
            </h3>
            <p>
              You can grab data from various providers like Google, Facebook and
              Github
            </p>
          </div>
          <div
            id="feature-card"
            className="flex basis-1/3 flex-col items-center gap-2">
            <div
              id="images"
              className="min-h-48 my-4 flex h-48 w-full flex-wrap items-center justify-center gap-4">
              <ImageModal
                id="query_images_modal"
                images={featuresGallery[Feature.QUERYING].images}
              />
            </div>
            <h3 className="my-8 text-2xl font-bold text-neutral">
              Create Custom Data Views
            </h3>
            <p>Easily create and transform data leveraging JSONata.</p>
          </div>
          <div
            id="feature-card"
            className="flex basis-1/3 flex-col items-center gap-2">
            <div
              id="images"
              className="min-h-48 my-4 flex h-48 w-full flex-wrap items-center justify-center gap-4">
              <ImageModal
                id="view_images_modal"
                images={featuresGallery[Feature.VIEWS].images}
              />
            </div>
            <h3 className="my-8 text-2xl font-bold text-neutral">
              Access anytime
            </h3>
            <p>Re-synchronize data and access it anytime as views.</p>
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
    </MaxWidthWrapper>
  );
}
