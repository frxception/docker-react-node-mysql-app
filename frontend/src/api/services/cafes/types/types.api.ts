export type CafeDataType = {
  // _id?: string;
  id?: string;
  name: string;
  description: string;
  employees: string;
  logo: string;
  location: string;
};

export type ResponseDataType = {
  code: number;
  data: CafeDataType[];
};

export type CafeDataMutationType = Partial<CafeDataType>;
