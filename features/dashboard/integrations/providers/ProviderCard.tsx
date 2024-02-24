'use client';

import { CanUserUse, Toasty, providerIcons } from '@/lib/components';
import { useCustomLog } from '@/lib/hooks';
import { IProviderWithStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
  useDeleteAllDataMutation,
  useDisconnectMutation
} from 'redux/apis/providersApi';
import { openModal } from 'redux/slices';

function ConnectButton({
  isBlocked,
  providerID
}: {
  isBlocked: boolean;
  providerID: string;
}) {
  const customLog = useCustomLog();
  const onClickHandler = useCallback(() => {
    if (isBlocked) return;
    customLog.info('Provider connect', {
      type: 'client',
      subtype: 'conversion',
      data: {
        providerID
      }
    });
    signIn(providerID);
  }, [isBlocked, customLog, providerID]);
  return (
    <button
      className={cn('btn btn-primary btn-sm', isBlocked && 'btn-disabled')}
      onClick={() => onClickHandler()}>
      {isBlocked ? 'In use' : 'Connect'}
    </button>
  );
}

interface ManageButtonProps {
  providerID: string;
  disabled?: boolean;
}

function ManageButton({ providerID, disabled = false }: ManageButtonProps) {
  const customLog = useCustomLog();
  const dispatch = useDispatch();

  const [deleteAllData] = useDeleteAllDataMutation();
  const [disconnect] = useDisconnectMutation();

  const onDisconnectHandler = useCallback(() => {
    customLog.info('Provider disconnect', {
      type: 'client',
      subtype: 'conversion',
      data: {
        providerID
      }
    });
    if (disabled) return;
    dispatch(
      openModal({
        message:
          "Associated data won't be deleted, you will be able to reconnect to synchronized data. Confirm to continue.",
        onConfirm: async () => {
          await disconnect(providerID)
            .unwrap()
            .then((res) => {
              // toast.custom((t) => (
              //   <Toasty t={t} type="success" message="Sync started successfully" />
              // ));
            })
            .catch((err) => {
              toast.custom((t) => (
                <Toasty
                  t={t}
                  type="error"
                  message="Failed disconnecting the provider"
                />
              ));
            });
        },
        onCancel: () => {}
      })
    );
  }, [customLog, providerID, dispatch, disconnect, disabled]);

  const onDataDeleteHandler = useCallback(() => {
    customLog.info('Provider delete data', {
      type: 'client',
      subtype: 'conversion',
      data: {
        providerID
      }
    });
    if (disabled) return;
    dispatch(
      openModal({
        message:
          'All associated data for this provider will be deleted. Confirm to continue.',
        onConfirm: async () => {
          await deleteAllData(providerID)
            .unwrap()
            .then((res) => {
              // toast.custom((t) => (
              //   <Toasty t={t} type="success" message="Sync started successfully" />
              // ));
            })
            .catch((err) => {
              toast.custom((t) => (
                <Toasty
                  t={t}
                  type="error"
                  message="Failed deleting the data for this provider"
                />
              ));
            });
        },
        onCancel: () => {}
      })
    );
  }, [customLog, providerID, dispatch, deleteAllData, disabled]);

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        className={cn('btn btn-secondary btn-sm', disabled && 'btn-disabled')}>
        Manage
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box z-[1] mt-1 w-52 bg-base-100 p-2 text-neutral shadow">
        {providerID !== 'google' && (
          <li onClick={() => onDisconnectHandler()}>
            <a>Disconnect</a>
          </li>
        )}

        <li onClick={() => onDataDeleteHandler()}>
          <a>Delete data</a>
        </li>
      </ul>
    </div>
  );
}

interface ProviderCardProps {
  provider: IProviderWithStatus;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const { title, description, isBlocked, _id, key } = provider;
  return (
    <div className="card h-56 w-80 bg-gray-50 text-neutral">
      <div className="card-body">
        <h2 className="card-title">
          {providerIcons[title] || null}
          {title}
        </h2>
        <div className="h-20">{description}</div>
        <div className="card-actions justify-end">
          {isBlocked && (
            <CanUserUse roles={['pro', 'standard']}>
              {(canUse) => <ManageButton providerID={key} disabled={!canUse} />}
            </CanUserUse>
          )}
          <CanUserUse roles={['pro', 'standard']}>
            {(canUse) => (
              <ConnectButton
                isBlocked={isBlocked || !canUse}
                providerID={key}
              />
            )}
          </CanUserUse>
        </div>
      </div>
    </div>
  );
}
