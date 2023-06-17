import { BaseItems, Transport } from '../types/interfaces';
import { api } from './_base';

export const fetchAllTransports = (
    id: number,
    page: number,
    pageSize: number
) =>
    api.get<BaseItems<Transport>>(`/producers/${id}/carriers`, {
        params: { page, pageSize },
    });
