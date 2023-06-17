import { BaseItems, ProducerProduct } from '../types/interfaces';
import { api } from './_base';

export const fetchAllUnitProducts = (
    id: number,
    unitId: number,
    page: number,
    pageSize: number
) =>
    api.get<BaseItems<ProducerProduct>>(
        `/producers/${id}/units/${unitId}/products`,
        {
            params: { page, pageSize },
        }
    );
