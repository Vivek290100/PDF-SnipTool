// src/redux/types/storeTypes.ts
import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;