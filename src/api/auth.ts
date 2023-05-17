import { AuthenticatedUser } from '@/types';
import { api } from './_base';

export const fetchAuth = async () => api.get<AuthenticatedUser>('/auth');
