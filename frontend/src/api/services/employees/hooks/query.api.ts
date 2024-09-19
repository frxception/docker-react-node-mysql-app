import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import methodsApi from '../methods/methods.api.ts';
import { ResponseDataType, EmployeeDataType } from '@/api/services/employees';
import { QueryOptionsType } from '@/helpers/types/system.types';

const employees = createQueryKeys('employees', {
  list: () => ({
    queryKey: ['employees'],
    queryFn: () => methodsApi.getList(),
  }),
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => methodsApi.getDetail(id),
  }),
});

export const useEmployeeListQuery = <T = ResponseDataType>(
  options: QueryOptionsType<T, ResponseDataType> = {}
) => {
  return useQuery({
    ...employees.list(),
    keepPreviousData: true,
    ...options,
  } as any);
};

export const useEmployeeDetailQuery = (id: string, options: QueryOptionsType<EmployeeDataType> = {}) => {
  return useQuery({
    ...employees.detail(id),
    ...options,
  });
};

export const useAddEmployeeMutation = () => {
  return useMutation({
    mutationFn: methodsApi.add,
    onSuccess: () => {
      void toast.success('Create new employee successfully');
    },
    onError: () => {
      void toast.error('Create new employee failed');
    },
  });
};

export const useUpdateEmployeeMutation = () => {
  return useMutation({
    mutationFn: methodsApi.update,
    onSuccess: () => {
      void toast.success('Update employee successfully');
    },
    onError: () => {
      void toast.error('Update employee failed');
    },
  });
};

export const useDeleteEmployeeMutation = () => {
  return useMutation({
    mutationFn: methodsApi.delete,
    onSuccess: () => {
      void toast.success('Delete employee successfully');
    },
    onError: () => {
      void toast.error('Delete employee failed');
    },
  });
};
