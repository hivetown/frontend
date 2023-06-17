import { BaseItems, ProductionUnit } from '../types/interfaces';
import { api } from './_base';

export const fetchAllUnits = (id: number, page: number, pageSize: number) =>
    api.get<BaseItems<ProductionUnit>>(`/producers/${id}/units`, {
        params: { page, pageSize },
    });
