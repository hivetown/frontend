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

export interface Consumer {
    id: number;
    name: string;
    email: string;
    phone: string;
    vat: string;
}

export interface ApiRequest {
    headers?: Record<string, string>;
    params?: Record<string, string>;
    data?: any;
}
