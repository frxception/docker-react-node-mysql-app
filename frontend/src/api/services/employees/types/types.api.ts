import { CafeDataType } from '@/api/services';

export type EmployeeDataType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  gender: string;
  email: string;
  phone: string;
  days: number;
  cafe?: CafeDataType;
  cafesId: string;
};

export type ResponseDataType = {
  code: number;
  data: EmployeeDataType[];
};

export type EmployeeDataMutationType = Partial<EmployeeDataType>;
