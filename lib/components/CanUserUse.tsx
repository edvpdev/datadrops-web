import { useSession } from 'next-auth/react';

interface Props {
  children: (canUse: boolean) => React.ReactNode;
  roles: string[];
}

export function CanUserUse({ children, roles }: Props) {
  const { data: session, status } = useSession();
  const canUse = roles.some((role) => session?.user?.status === role);

  return children(canUse);
}
