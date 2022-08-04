import { getLayoutMediaQuery, TLayout } from '@cntrl-site/core';
import React, { FC } from 'react';
// @ts-ignore
import JSXStyle from 'styled-jsx/style';

export interface LayoutStyleProps {
  id: string;
  layouts: TLayout[];
  layoutId: string;
  children?: string;
}

export const LayoutStyle: FC<LayoutStyleProps> = ({ layoutId, layouts, children }) => {
  return <JSXStyle>{`
    ${getLayoutMediaQuery(layoutId, layouts)} {
      ${children}
    }
  `}</JSXStyle>;
};
