'use client';

import { IJnataQuery } from '@/lib/types';

interface JNataQueriesDropdownProps {
  queries: IJnataQuery[];
  setJsonataQueryHandler: (query: string) => void;
}

export function JNataQueriesDropdown({
  queries,
  setJsonataQueryHandler
}: JNataQueriesDropdownProps) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="btn btn-sm">
        Queries
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
        {queries &&
          queries.map((query, idx) => (
            <li key={query._id}>
              <div
                className={`btn btn-sm text-center ${
                  idx === queries.length - 1 ? 'mb-2' : ''
                }`}
                onClick={() => setJsonataQueryHandler(query.jsonNataQuery)}>
                {query.title}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
