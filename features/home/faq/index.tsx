import { cn } from '@/lib/utils';
import FaqQA from './faq-qa';
import { MaxWidthWrapper } from '@/lib/components';

export default function FAQ({ className }: { className?: string }) {
  return (
    <MaxWidthWrapper>
      <div
        id="faq"
        className={cn(
          ' rounded-2xl bg-purple-glass p-6 backdrop-blur',
          className
        )}>
        <div className="xl:flex xl:flex-col xl:items-center">
          <div className="mb-12 flex flex-col items-center xl:mx-8">
            <h1 className="text-3xl font-medium capitalize text-gray-800 dark:text-white lg:text-4xl">
              FAQ
            </h1>

            <div className="mt-4">
              <span className="inline-block h-1 w-40 rounded-full bg-primary"></span>
              <span className="mx-1 inline-block h-1 w-3 rounded-full bg-accent"></span>
              <span className="inline-block h-1 w-1 rounded-full bg-secondary"></span>
            </div>
          </div>

          <FaqQA />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
