import { cn } from "@/lib/utils";
import { FeaturesIntro } from "../features-intro";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function Features({ className }: { className?: string }) {
  return (
    <MaxWidthWrapper>
      <div id="features" className={cn("", className)}>
        <div className="w-full text-center mb-10">
          <h2 className="my-5 font-display font-extrabold leading-[1.15] text-gray-600 text-2xl sm:text-4xl sm:leading-[1.15]">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Deverlopers&nbsp;
            </span>
            and casual&nbsp;
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              users friendly
            </span>
          </h2>
          <h2 className="my-5 font-display text-base font-light leading-[1.15] text-gray-600 sm:text-xl sm:leading-[1.15]">
            Datadrops thinks about both non technical and technical users. Use
            prebuilt queries for common tasks or write your own. Share your
            results by building your own API.
          </h2>
        </div>
        <FeaturesIntro />
      </div>
    </MaxWidthWrapper>
  );
}
