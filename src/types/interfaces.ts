export interface Product {
    id: number;
    currentPrice: number;
    productionDate: Date;
    specification?: ProductSpecification;
    producer?: Producer;
}

export interface ProductSpecification {
    id: number;
    name: string;
    description: string;
    image: string;
    products?: Product[];
}

export interface Producer {
    id: number;
    name: string;
    email: string;
    phone: string;
    vat: string;
    products?: Product[];
}

export interface Category {
    id: number;
    name: string;
    parent: number;
}

// export interface CategoryData {
//     items: Category[];
//     page: number;
//     pageSize: number;
//     totalPages: number;
// }
