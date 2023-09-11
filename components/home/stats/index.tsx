import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { cn } from "@/lib/utils";

export default function StatsSection({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-y border-gray-200 bg-white/10 py-8 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur",
        className
      )}
    >
      <MaxWidthWrapper className="grid gap-y-4 divide-x divide-gray-200 md:grid-cols-3 md:gap-y-0">
        {[
          { name: "Users", value: "1000+" },
          { name: "Emails parsed", value: "100000+" },
          { name: "User built APIs", value: "100+" },
        ].map(({ name, value }) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center space-y-2"
          >
            <p className="text-4xl font-bold md:text-6xl">{value}</p>
            <p className="font-semibold uppercase text-gray-500 md:text-lg">
              {name}
            </p>
          </div>
        ))}
      </MaxWidthWrapper>
    </div>
  );
}
