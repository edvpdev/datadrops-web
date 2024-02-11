'use client';

import ReactPaginate from 'react-paginate';

interface PaginationWrapperProps {
  page: number;
  changeResultsPageFn: (page: number) => void;
  totalResults: number;
}

export function PaginationWrapper({
  page,
  changeResultsPageFn,
  totalResults
}: PaginationWrapperProps) {
  return (
    <div className="flex items-center gap-2">
      {!!totalResults && (
        <ReactPaginate
          className="flex items-center"
          previousClassName="ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
          nextClassName="rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
          activeLinkClassName="bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          disabledClassName="opacity-50 cursor-normal"
          pageClassName="border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500  enabled:hover:bg-gray-100 enabled:hover:text-gray-700"
          breakClassName="border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500  enabled:hover:bg-gray-100 enabled:hover:text-gray-700"
          breakLabel="..."
          nextLabel=" > "
          onPageChange={({ selected }) => changeResultsPageFn(selected + 1)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={totalResults}
          previousLabel=" < "
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
}
