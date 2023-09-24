import FAQ from '@/components/home/faq';
import Features from '@/components/home/features';
import Hero from '@/components/home/hero';
import Integrations from '@/components/home/integrations';
import Pricing from '@/components/home/pricing';
import StatsSection from '@/components/home/stats';

export default function Home() {
  return (
    <>
      <Hero className="container mx-auto my-20 w-full lg:mb-40" />
      <Integrations className="container mx-auto mb-20 flex w-full lg:mb-40" />
      <Features className="container mx-auto mb-20 w-full lg:mb-40" />
      <StatsSection className="mb-20 w-full lg:mb-40" />
      <Pricing className="container mx-auto mb-20 w-full lg:mb-40" />
      <FAQ className="container mx-auto mb-20 w-full lg:mb-40" />
    </>
  );
}
