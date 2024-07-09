import { cn } from '@/lib/utils';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: FontAwesomeIconProps['icon'];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, startIcon, ...props }, ref) => {
  const StartIcon = startIcon;

  return (
    <div className="relative">
      {StartIcon && (
        <div className="pointer-events-none absolute top-1/2 flex h-full w-[34px] -translate-y-1/2 transform items-center justify-center text-muted-foreground">
          <FontAwesomeIcon icon={StartIcon} fixedWidth />
        </div>
      )}
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
          startIcon ? 'pl-[34px]' : '',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
