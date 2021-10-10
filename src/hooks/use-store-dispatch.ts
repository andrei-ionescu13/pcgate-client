import { useDispatch } from 'react-redux';
import type { StoreDispatch } from '../store';

export const useStoreDispatch = () => useDispatch<StoreDispatch>();