import { request } from '@/lib/request';
import { DeleteCollectionReq, DeleteCollectionRes } from './delect-collection';

/**
 * 删除收藏
 */
export const deleteCollection = (data: DeleteCollectionReq) => {
  return request<DeleteCollectionRes>({
    method: 'POST',
    url: '/user/deleteCollection',
    data,
  });
};
