import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from './';

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;