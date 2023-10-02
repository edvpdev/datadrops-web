import { cn } from '@/lib/utils';
import { Toast } from 'react-hot-toast';

interface ToastProps {
  t: Toast;
  type: 'info' | 'success' | 'error';
  message: string;
}

export default function Toasty({ t, type, message }: ToastProps) {
  return (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'}`}>
      <div className="toast toast-center toast-top">
        <div
          className={cn(
            'alert',
            type === 'info' && 'alert-info',
            type === 'success' && 'alert-success',
            type === 'error' && 'alert-error'
          )}>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
