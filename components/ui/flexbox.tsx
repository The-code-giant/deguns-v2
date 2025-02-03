import React from 'react';
import { twMerge } from 'tailwind-merge';

interface FlexBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: number;
  className?: string;
}

const FlexBox: React.FC<FlexBoxProps> = ({
  children,
  direction = 'row',
  wrap,
  justify,
  items,
  gap,
  className,
  ...props
}) => {
  const classes = twMerge(
    'flex',
    direction && `flex-${direction}`,
    wrap && `flex-${wrap}`,
    justify && `justify-${justify}`,
    items && `items-${items}`,
    gap !== undefined && `gap-${gap}`,
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default FlexBox;
