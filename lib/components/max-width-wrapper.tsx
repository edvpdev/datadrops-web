import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export default function MaxWidthWrapper({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('mx-auto w-full px-40', className)}>{children}</div>
  );
}
