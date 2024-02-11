'use client';

interface QuertNavbarProps {
  setPage: (page: number) => void;
}

export default function QueryWrapperNavbar({ setPage }: QuertNavbarProps) {
  return (
    <div className="mb-10 flex w-full justify-center gap-8 rounded bg-gray-50 p-4 text-xl font-semibold tracking-widest">
      <div
        className="cursor-pointer hover:underline"
        onClick={() => setPage(0)}>
        Templates
      </div>
      <div
        className="cursor-pointer hover:underline"
        onClick={() => setPage(1)}>
        Transform
      </div>
    </div>
  );
}
