import { createContext } from 'react';
import { TLayout } from '@cntrl-site/core';

export const LayoutsContext = createContext<TLayout[]>([]);
