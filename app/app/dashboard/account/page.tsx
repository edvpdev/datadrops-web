'use client';

import {
  DeleteAccountCard,
  DeleteAllDataCard,
  ProfileInfoCard
} from '@/components/dashboard/account';

export default function AccountPage() {
  return (
    <div className="flex flex-col gap-8">
      <ProfileInfoCard />
      <DeleteAllDataCard />
      <DeleteAccountCard />
    </div>
  );
}
