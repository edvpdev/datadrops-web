import FAQ from "@/components/home/faq";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import Integrations from "@/components/home/integrations";
import Pricing from "@/components/home/pricing";
import StatsSection from "@/components/home/stats";

export default function Home() {
  return (
    <>
      <Hero className="container mx-auto w-full my-20 lg:mb-40" />
      <Integrations className="container mx-auto w-full flex mb-20 lg:mb-40" />
      <Features className="container mx-auto w-full mb-20 lg:mb-40" />
      <StatsSection className="w-full mb-20 lg:mb-40" />
      <Pricing className="container mx-auto w-full mb-20 lg:mb-40" />
      <FAQ className="container mx-auto w-full mb-20 lg:mb-40" />
    </>
  );
}
