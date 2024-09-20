export interface DeleteCollectionReq {
  key: string;
}

export interface DeleteCollectionRes {
  code: number;
  msg: string | string[];
  traceId: string;
  data: null;
}
