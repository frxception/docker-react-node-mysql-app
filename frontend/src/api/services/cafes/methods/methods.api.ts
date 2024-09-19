import axiosClient from '@/api/clients/axios-client.ts';
import { ResponseDataType, CafeDataType, CafeDataMutationType } from '@/api/services';

const baseUrl = 'cafes';

const methodsApi = {
  getList: (): Promise<ResponseDataType> => axiosClient.get(baseUrl),
  getDetail: (id: string): Promise<{ code: number; data: CafeDataType }> =>
    axiosClient.get(`${baseUrl}/${id}`),
  add: (body: CafeDataMutationType): Promise<{ code: number; data: CafeDataType }> =>
    axiosClient.post(baseUrl, { ...body, employees: parseInt(body.employees as string) }),
  update: (body: { id: string; data: CafeDataMutationType }): Promise<{ code: number; data: CafeDataType }> =>
    axiosClient.put(baseUrl, body),
  delete: (id: string): Promise<{ code: number; message: string }> => axiosClient.delete(baseUrl + `/${id}`),
};

export default methodsApi;
