import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, description, footer, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden', className)}
        {...props}
      >
        {(title || description) && (
          <div className="px-6 py-4 border-b border-gray-100">
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
          </div>
        )}
        <div className="p-6">{children}</div>
        {footer && <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
