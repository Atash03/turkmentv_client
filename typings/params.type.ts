export interface IParam {
  isFirst?: boolean;
  name: string;
  value: string | number;
}

export interface IPageParams {
  params: {
    id: string;
  };
}
