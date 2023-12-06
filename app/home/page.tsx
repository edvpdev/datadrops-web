import FAQ from 'features/home/faq';
import Features from 'features/home/features';
import Hero from 'features/home/hero';
import Integrations from 'features/home/integrations';
import Pricing from 'features/home/pricing';
import StatsSection from 'features/home/stats';

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
