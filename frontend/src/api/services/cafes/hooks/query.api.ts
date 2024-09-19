import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import methodsApi from '../methods/methods.api.ts';
import { ResponseDataType, CafeDataType } from '@/api/services/cafes';
import { QueryOptionsType } from '@/helpers/types/system.types';

const cafes = createQueryKeys('cafes', {
  list: () => ({
    queryKey: ['cafes'],
    queryFn: () => methodsApi.getList(),
  }),
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => methodsApi.getDetail(id),
  }),
});

export const useCafeListQuery = <T = ResponseDataType>(
  options: QueryOptionsType<T, ResponseDataType> = {}
) => {
  return useQuery({
    ...cafes.list(),
    keepPreviousData: true,
    ...options,
  });
};

export const useCafeDetailQuery = (id: string, options: QueryOptionsType<CafeDataType> = {}) => {
  return useQuery({
    ...cafes.detail(id),
    ...options,
  });
};

export const useAddCafeMutation = () => {
  return useMutation({
    mutationFn: methodsApi.add,
    onSuccess: () => {
      void toast.success('Create new cafe successfully');
    },
    onError: (err) => {
      console.log(err);
      void toast.error('Create new cafe failed');
    },
  });
};

export const useUpdateCafeMutation = () => {
  return useMutation({
    mutationFn: methodsApi.update,
    onSuccess: () => {
      void toast.success('Update cafe successfully');
    },
    onError: (err: AxiosError) => {
      console.log(err);
      let msg = 'Update cafe failed';
      if (err?.config?.method === 'put' && err?.response?.status === 404) {
        msg = 'Error found: Check name if it already exist and try again';
      }
      void toast.error(msg);
    },
  });
};

export const useDeleteCafeMutation = () => {
  return useMutation({
    mutationFn: methodsApi.delete,
    onSuccess: () => {
      void toast.success('Delete cafe successfully');
    },
    onError: (err) => {
      console.log(err);
      void toast.error('Delete cafe failed');
    },
  });
};
