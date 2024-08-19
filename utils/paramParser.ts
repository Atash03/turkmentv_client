import { IParam } from "@/typings/params.type";

export default (params: IParam[]) => {
  let result: string = "";
  params.forEach((param) => {
    if (param.isFirst) result = `?${param.name}=${param.value}`;
    else result = `${result}&${param.name}=${param.value}`;
  });
  return result;
};
