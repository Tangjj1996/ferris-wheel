import { ConfigData } from '@/api/common/config';

export interface State {
  configData?: ConfigData[];
}

export const initialState: State = {};
