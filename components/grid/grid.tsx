import React, { Children, cloneElement } from "react";

interface GridProps {
  container?: boolean;
  containerHeight?: string;
  item?: boolean;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
  spacing?: number;
  horizontal_spacing?: number;
  vertical_spacing?: number;
  className?: string;
  flexWrap?: string;
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ 
  children, 
  container, 
  item,
  xl,
  lg,
  md,
  sm,
  xs,
  spacing = 0,
  horizontal_spacing,
  vertical_spacing,
  containerHeight = "unset",
  className = "",
  flexWrap,
  ...props 
}) => {
  const getColumnClass = (breakpoint: string, value?: number) => {
    if (!value) return '';
    return `${breakpoint}:col-span-${value}`;
  };

  const getSpacingClass = () => {
    if (horizontal_spacing !== undefined && vertical_spacing !== undefined) {
      return `gap-x-${horizontal_spacing} gap-y-${vertical_spacing}`;
    }
    return spacing ? `gap-${spacing}` : '';
  };

  const classes = [
    className,
    container && 'grid',
    container && getSpacingClass(),
    flexWrap && `flex-${flexWrap}`,
    item && 'col-span-12',
    getColumnClass('xl', xl),
    getColumnClass('lg', lg),
    getColumnClass('md', md),
    getColumnClass('sm', sm),
    getColumnClass('', xs), // Default breakpoint (xs)
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    height: containerHeight
  };

  let childList = children;

  if (container) {
    childList = Children.map(children, (child) => {
      if (React.isValidElement<GridProps>(child)) {
        return cloneElement(child, {
          spacing,
          horizontal_spacing,
          vertical_spacing,
        } as GridProps);
      }
      return child;
    });
  }

  return (
    <div className={classes} style={style} {...props}>
      {childList}
    </div>
  );
};

export default Grid;
