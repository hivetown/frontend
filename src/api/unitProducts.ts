import { ProductionUnits } from '../types/interfaces';
import { api } from './_base';

export const fetchAllUnitProducts = (
    id: number,
    unitId: number,
    page: number,
    pageSize: number
) =>
    api.get<ProductionUnits[]>(`/producers/${id}/units/${unitId}/products`, {
        params: { page, pageSize },
    });
