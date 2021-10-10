import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../store';

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;