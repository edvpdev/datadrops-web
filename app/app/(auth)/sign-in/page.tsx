import getCurrentUser from '@/actions/getCurrentUser';
import { Provider } from 'next-auth/providers/index';
import { FcGoogle } from 'react-icons/fc';
import { HOME_DOMAIN, PROVIDERS } from '@/lib/constants';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import ProviderButton from '@/components/auth/ProviderButton';

// async function getProviders(): Promise<Provider> {
//   console.log(`${HOME_DOMAIN}/api/auth/providers`);
//   try {
//     const { data } = await axios.get(`${HOME_DOMAIN}/api/auth/providers`);

//     return data;
//   } catch (err) {
//     console.log(err);
//     throw new Error('Failed to fetch data');
//   }
// }

export default async function SignIn() {
  const user = await getCurrentUser();
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  console.log(user);
  if (user) {
    return { redirect: { destination: '/' } };
  }

  return (
    <>
      {PROVIDERS.map((provider) => (
        <ProviderButton key={provider.name} provider={provider} />
      ))}
    </>
  );
}
