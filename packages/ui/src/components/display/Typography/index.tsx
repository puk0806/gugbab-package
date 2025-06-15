import { bem, classnames } from '@gugbab-package/utils';
import type { Color, PolymorphicComponentProps } from '@types';
import type { ElementType } from 'react';

const cn = bem('typography');

type TypographyTags =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'strong'
  | 'em'
  | 'address'
  | 'span'
  | 'p'
  | 'div'
  | 'ul'
  | 'li'
  | 'label'
  | 'figcaption'
  | 'mark';

type TypographySizeTypes = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'B1' | 'B2' | 'B3' | 'B4' | 'D1' | 'D2';

export interface TypographyProps {
  /** 텍스트 타입 지정(type 별 font-size, letter-spacing, line-height desgin guide 참고) */
  variant?: TypographySizeTypes;
  /** text font weight */
  weight?: 'regular' | 'semibold' | 'bold';
  /** font color */
  color?: Color;
  /** underline */
  underline?: boolean;
  /** 1줄 ...표시 */
  isEllipsisOneLine?: boolean;
  /** 2줄 ...표시 */
  isEllipsisTwoLine?: boolean;
}

const Typography = <T extends TypographyTags = 'span'>({
  children,
  color,
  component,
  isEllipsisOneLine,
  isEllipsisTwoLine,
  underline,
  variant = 'B3',
  weight = 'regular',
  ...props
}: PolymorphicComponentProps<T, TypographyProps>) => {
  const Component = (component || 'span') as ElementType;

  return (
    <Component
      {...props}
      className={classnames(
        cn(undefined, {
          [`${variant}`]: variant,
          regular: weight === 'regular',
          semibold: weight === 'semibold',
          bold: weight === 'bold',
          [`${color}`]: color ?? false,
          underline: !!underline,
          ['is-ellipsis-1']: !!isEllipsisOneLine,
          ['is-ellipsis-2']: !!isEllipsisTwoLine,
        }),
      )}
    >
      {children}
    </Component>
  );
};

Typography.displayName = 'Typography';

export default Typography;
