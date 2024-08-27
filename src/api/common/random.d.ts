export interface RandomResponse {
  code: number;
  msg: string;
  traceId: string;
  data: RandomData[];
}

export interface RandomData {
  text: string;
  priority: null | number;
  background: string;
  key: string;
}
