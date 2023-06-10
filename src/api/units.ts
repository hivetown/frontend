import { ProductionUnits } from '../types/interfaces';
import { api } from './_base';

// export const fetchAllProducts = (id: number) =>
//     api.get<ProducerProducts[]>(`/producers/${id}/products`);

export const fetchAllUnits = (id: number, page: number, pageSize: number) =>
    api.get<ProductionUnits[]>(`/producers/${id}/units`, {
        params: { page, pageSize },
    });
