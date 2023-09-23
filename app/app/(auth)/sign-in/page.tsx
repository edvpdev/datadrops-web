import getCurrentUser from '@/actions/getCurrentUser';
import { Provider } from 'next-auth/providers/index';
import ProviderButton from '@/components/auth/ProviderButton';
import { HOME_DOMAIN } from '@/lib/constants';

async function getProviders(): Promise<Provider> {
  const res = await fetch(
    `${HOME_DOMAIN}/api/auth/providers`
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function SignIn() {
  const user = await getCurrentUser();
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  console.log(user);
  if (user) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <ProviderButton
            key={provider.name}
            provider={provider}
          />
        ))}
    </>
  );
}
