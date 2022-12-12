import { useContext } from 'react';
import { LayoutsContext } from './LayoutsContext';

export const useLayouts = () => {
  const layouts = useContext(LayoutsContext);
  return layouts;
};
