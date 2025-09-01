import { useQuery } from '@tanstack/react-query';

import { user } from '@/lib/mockData';
import { User } from '@/types/types';

const fetchUser = async (): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return user;
};

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
};