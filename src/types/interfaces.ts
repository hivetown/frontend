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
}

export interface Consumer {
    id: number;
    name: string;
    email: string;
    phone: string;
    vat: string;
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
    door: number;
    floor: number;
    zip_code: string;
    street: string;
    parish: string;
    county: string;
    city: string;
    district: string;
    latitude: number;
    longitude: number;
}