import { ProductionUnits } from '../types/interfaces';
import { api } from './_base';

export const fetchAllUnits = (
    id: number,
    page: number,
    pageSize: number
) =>
    api.get<ProductionUnits[]>(`/producers/${id}/units`, {
        params: { page, pageSize },
    });
