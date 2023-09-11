import PricingCard from "@/components/pricing-card/PricingCard";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { cn } from "@/lib/utils";

export default function Pricing({ className }: { className?: string }) {
  return (
    <MaxWidthWrapper>
      <div
        id="pricing"
        className={cn(
          " bg-purple-glass backdrop-blur rounded-2xl p-6",
          className
        )}
      >
        <div className="xl:flex xl:flex-col xl:items-center">
          <div className="flex flex-col items-center xl:mx-8 mb-12">
            <h1 className="text-3xl font-medium capitalize text-gray-800 dark:text-white lg:text-4xl">
              Pricing
            </h1>

            <div className="mt-4">
              <span className="inline-block h-1 w-40 rounded-full bg-primary"></span>
              <span className="mx-1 inline-block h-1 w-3 rounded-full bg-accent"></span>
              <span className="inline-block h-1 w-1 rounded-full bg-secondary"></span>
            </div>

            <p className="mt-4 font-medium text-gray-500 dark:text-gray-300">
              Support us by choosing a plan
            </p>
          </div>

          <div className="flex-1 xl:mx-8">
            <div className="mt-8 space-y-8 md:-mx-4 md:flex md:items-stretch md:justify-evenly md:space-y-0 xl:mt-0">
              <PricingCard
                title="standard"
                monthlyPrice={9}
                yearlyPrice={99}
                features={[
                  "Up to 5GB of storage",
                  "Custom querying availability",
                  "Configurable data preservation",
                  "API logs of up to 100 requests",
                  "Email support",
                ]}
              />

              <PricingCard
                title="standard"
                monthlyPrice={20.0}
                yearlyPrice={200}
                features={[
                  "Up to 50GB of storage",
                  "Custom querying availability",
                  "Configurable data preservation",
                  "API logs of up to 5000 requests/month",
                  "Unlimited amount of Views and APIs",
                  "Multi-region support for your APIs",
                  "Email support",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
