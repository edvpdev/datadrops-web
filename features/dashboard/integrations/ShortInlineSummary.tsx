import { ReactNode } from 'react';

interface ShortSummaryProps {
  button: ReactNode;
  preButtonText: ReactNode;
  mainText: ReactNode;
}

export default function ShortSummaryWrapper({
  button,
  preButtonText,
  mainText
}: ShortSummaryProps) {
  return (
    <div className="my-2 flex items-center justify-between">
      <div>{mainText}</div>
      <div className="flex items-center gap-2">
        {preButtonText}
        {button}
      </div>
    </div>
  );
}
