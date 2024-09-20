import { request } from '@/lib/request';
import { CollectionReq, CollectionRes } from './Collection';

export const postCollection = (data: CollectionReq) => {
  return request<CollectionRes>({
    url: '/user/collection',
    data,
    method: 'POST',
  });
};
