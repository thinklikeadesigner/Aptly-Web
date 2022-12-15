import { createContext } from 'react';
import { IProperty } from '../../types';



export const PropertyContext = createContext<IProperty[]>([]);