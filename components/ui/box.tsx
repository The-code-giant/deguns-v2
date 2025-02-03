import styled from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flex,
  flexbox,
  FlexboxProps,
  FlexProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

type BoxProps = {
  shadow?: number;
  cursor?: string;
  transition?: string;
} & LayoutProps &
  ColorProps &
  PositionProps &
  SpaceProps &
  FlexProps &
  BorderProps &
  FlexboxProps &
  TypographyProps;

const Box = styled.div<BoxProps>(
  ({ shadow = 0, cursor = 'unset', transition, theme }) => ({
    // boxShadow: theme.shadows[shadow],
    cursor,
    transition,
  }),
  compose(layout, space, color, position, flexbox, flex, border, typography)
);

export default Box;
