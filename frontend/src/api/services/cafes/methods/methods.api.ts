import { omit } from 'lodash';

import axiosClient from '@/api/clients/axios-client.ts';
import { ResponseDataType, CafeDataType, CafeDataMutationType } from '@/api/services';

const baseUrl = 'cafes';

const methodsApi = {
  getList: (): Promise<ResponseDataType> => axiosClient.get(baseUrl),

  getDetail: (id: string): Promise<{ code: number; data: CafeDataType }> =>
    axiosClient.get(`${baseUrl}/${id}`),

  add: (body: CafeDataMutationType): Promise<{ code: number; data: CafeDataType }> =>
    axiosClient.post(baseUrl, { ...omit(body, 'employees') }),

  update: (body: { id: string; data: CafeDataMutationType }): Promise<{ code: number; data: CafeDataType }> =>
    axiosClient.patch(baseUrl + `/${body.id}`, {
      ...omit(body?.data, ['employees', 'id', 'updatedAt', 'createdAt']),
    }),

  delete: (id: string): Promise<{ code: number; message: string }> => axiosClient.delete(baseUrl + `/${id}`),
};

export default methodsApi;
