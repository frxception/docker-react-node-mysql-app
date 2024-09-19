export type EmployeeDataType = {
  _id: string;
  id?: string;
  name: string;
  description: string;
  employees: string;
  logo: string;
  location: string;
};

export type ResponseDataType = {
  code: number;
  data: EmployeeDataType[];
};

export type EmployeeDataMutationType = Partial<EmployeeDataType>;
