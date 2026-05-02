import * as React from 'react';
import { cn } from '@/lib/utils';

const RadioGroup = ({ className, value, onValueChange, children, ...props }) => (
  <div className={cn('grid gap-2', className)} {...props}>
    {React.Children.map(children, child =>
      React.isValidElement(child) ? React.cloneElement(child, { groupValue: value, onValueChange }) : child
    )}
  </div>
);

const RadioGroupItem = React.forwardRef(({ className, value, groupValue, onValueChange, ...props }, ref) => (
  <button
    type="button"
    role="radio"
    aria-checked={groupValue === value}
    onClick={() => onValueChange?.(value)}
    className={cn(
      'h-4 w-4 rounded-full border border-foreground flex items-center justify-center',
      className
    )}
    ref={ref}
    {...props}
  >
    {groupValue === value && <span className="h-2 w-2 rounded-full bg-foreground" />}
  </button>
));
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
