export interface OpenidResponse {
  code: number;
  msg: string;
  traceId: string;
  data: TokenData;
}

export interface TokenData {
  token: string;
  openid: string;
}
