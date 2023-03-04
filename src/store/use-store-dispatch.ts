import { useDispatch } from 'react-redux';
import type { StoreDispatch } from './';

export const useAppDispatch = () => useDispatch<StoreDispatch>();