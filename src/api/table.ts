import { request } from "./api";
import { API } from '@/api/apiUrls';

  export const getTableData = async (tableName: string, limit: number, pagination: boolean, dataset:string) => {
    const requestData = {
        tableName,
        limit,
        pagination,
        dataset
    };
  
    const res = await request.post(
      API.getData,
      JSON.stringify(requestData)
    );
    const data = await res.data;
    return {
      data: data.result,
      status: res.status,
      resultCode: data.resultCode,
      error: data.error,
      message: data.message,
    };
  };
  