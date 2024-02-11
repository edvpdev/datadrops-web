'use client';

import { TextField } from '@/components/form';
import { Badge } from 'flowbite-react';
import { useSession } from 'next-auth/react';

export default function ProfileInfoCard() {
  const { data: session, status } = useSession();
  return (
    <div className="card bg-gray-50 text-primary-content">
      <div className="card-body">
        <h2 className="card-title text-neutral">Profile Info</h2>
        {session && session.user && session.user.status && (
          <Badge color="gray" className="w-fit bg-primary text-primary-content">
            {session.user.status[0].toUpperCase() +
              session.user.status.substring(1) || 'Standard'}
          </Badge>
        )}
        <div>
          <TextField
            fieldSettings={{
              id: 'name',
              type: 'text',
              placeholder: 'Name',
              required: true,
              pattern: '',
              label: 'Name',
              disabled: true,
              propKey: 'name'
            }}
            readonly={true}
            value={session?.user?.name || ''}
          />
          <TextField
            fieldSettings={{
              id: 'email',
              type: 'text',
              placeholder: 'Email',
              required: true,
              pattern: '',
              label: 'Email',
              disabled: true,
              propKey: 'email'
            }}
            readonly={true}
            value={session?.user?.email || ''}
          />
        </div>
        {/* <div className="card-actions justify-end">
          {isBlocked && <ManageButton providerID={key} />}
          <ConnectButton isBlocked={isBlocked} providerID={key} />
        </div> */}
      </div>
    </div>
  );
}
