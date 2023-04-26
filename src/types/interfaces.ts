// import type { DefineComponent } from 'vue';
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
    type: "PRODUCER";
}

export interface Consumer {
    id: number;
    name: string;
    email: string;
    phone: string;
    vat: string;
    type: "CONSUMER";
}

export interface CreateConsumer {
    name: string;
    phone: string;
    vat: string;
}

export interface CreateProducer {
    name: string;
    phone: string;
    vat: string;
}

export interface ApiRequest {
    headers?: Record<string, string>;
    params?: Record<string, string>;
    data?: any;
}

export interface auth {
    id: number;
    name: string;
    email: string;
    phone: number;
    vat: number;
    authId: string;
    image: string;
    type: string;
}

export interface AddressConsumer {
    number: number;
    door: string;
    floor: number;
    zipCode: string;
    street: string;
    parish: string;
    county: string;
    city: string;
    district: string;
    latitude: number;
    longitude: number;
}
export interface BaseItems<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
}

export interface ProducerProducts {
    id: number;
    currentPrice: number;
    productionDate: Date;
    specification?: ProductSpecification;
    producer?: Producer;
}

// export interface Producers {
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
//     vat: string;
//     products?: Product[];
// }

export interface ProducerProduct {
    id: number;
    currentPrice: number;
    productionDate: Date;
    producer?: Producer;
    productionUnit?: 
}
