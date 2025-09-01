import { useQuery } from '@tanstack/react-query';

import { getRandomIncidents } from '@/lib/mockData';
import { Incident } from '@/types/types';

const fetchIncidents = async (): Promise<Incident[]> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return getRandomIncidents();
};

export const useIncidents = () => {
  return useQuery({
    queryKey: ['incidents'],
    queryFn: fetchIncidents,
  });
};