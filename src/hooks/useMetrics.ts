import { useQuery } from '@tanstack/react-query';

import { getRandomMetrics } from '@/lib/mockData';
import { Metrics } from '@/types/types';

const fetchMetrics = async (): Promise<Metrics> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return getRandomMetrics();
};

export const useMetrics = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
  });
};