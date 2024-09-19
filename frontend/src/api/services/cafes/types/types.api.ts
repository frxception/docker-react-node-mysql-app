import { EmployeeDataType } from '@/api/services/employees';

export type CafeDataType = {
  // _id?: string;
  id?: string;
  name: string;
  description: string;
  logo: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  employees: EmployeeDataType[];
};

export type ResponseDataType = {
  code: number;
  data: CafeDataType[];
};

export type CafeDataMutationType = Partial<CafeDataType>;
