'use client';

import { IView } from '@/lib/types';

interface ViewsListProps {
  views: IView[] | undefined;
  selectViewFn: (view: IView) => void;
}

export default function ViewsList({ views, selectViewFn }: ViewsListProps) {
  return (
    <div className="w-[250px] overflow-y-auto border-r-2 px-4 py-6">
      {!views && (
        <div className="flex h-full items-center justify-center">
          No Filters selected
        </div>
      )}
      {views?.map((view) => (
        <div
          key={view._id}
          onClick={() => selectViewFn(view)}
          className="mb-4 cursor-pointer whitespace-nowrap rounded hover:bg-gray-100">
          <span className="p-2">{view.title}</span>
        </div>
      ))}
    </div>
  );
}
