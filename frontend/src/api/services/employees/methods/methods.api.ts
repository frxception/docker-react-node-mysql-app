import { omit } from 'lodash';

import axiosClient from '@/api/clients/axios-client.ts';
import { ResponseDataType } from '@/api/services';
import { EmployeeDataType, EmployeeDataMutationType } from '@/api/services/employees';

const baseUrl = 'Employees';

const methodsApi = {
  getList: (): Promise<ResponseDataType> => axiosClient.get(baseUrl),

  getDetail: (id: string): Promise<{ code: number; data: EmployeeDataType }> =>
    axiosClient.get(`${baseUrl}/${id}`),

  add: (body: EmployeeDataMutationType): Promise<{ code: number; data: EmployeeDataType }> =>
    axiosClient.post(baseUrl, body),

  update: (body: {
    id: string;
    data: EmployeeDataMutationType;
  }): Promise<{ code: number; data: EmployeeDataType }> =>
    axiosClient.patch(baseUrl + `/${body.id}`, {
      ...omit(body?.data, ['cafe', 'id', 'updatedAt', 'createdAt']),
    }),
  delete: (id: string): Promise<{ code: number; message: string }> => axiosClient.delete(baseUrl + `/${id}`),
};

export default methodsApi;
