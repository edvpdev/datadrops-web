'use client';

import { IProviderEntity } from '@/lib/types';
import { Badge } from 'flowbite-react';
import { isEqual } from 'lodash';
import { memo } from 'react';

interface SyncOverviewDetailsProps {
  entity: IProviderEntity | undefined;
}

const SyncOverviewDetails = memo(function SyncOverviewDetails({
  entity
}: SyncOverviewDetailsProps) {
  console.log('rerender');
  if (!entity)
    return (
      <div className="max-w grid gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Details
        </h5>
        No Entity
      </div>
    );

  return (
    <div className="max-w grid gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        Details
      </h5>
      <div className="text-base font-normal text-gray-700 dark:text-gray-400">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: entity.description }}></div>
      </div>
      {!!entity.dependsOn.length && (
        <>
          <h6 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
            Depends on:
          </h6>
          <div className="mb-2 flex flex-wrap gap-2">
            {entity.dependsOn.map((dependency) => (
              <Badge key={dependency.entity} color="gray">
                {dependency.title}
              </Badge>
            ))}
          </div>
        </>
      )}
      {/* TODO DOCS PAGE */}
      {/* <button className="btn btn-info btn-sm w-auto justify-self-end text-white">
            Read more <HiOutlineArrowRight className="ml-2" />
          </button> */}
    </div>
  );
}, isEqual);

export default SyncOverviewDetails;
