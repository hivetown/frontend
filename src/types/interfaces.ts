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

export interface Role {
    id: number;
    name: string;
    permissions: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    vat: string;
    role?: Role;
    image?: {
        url?: string;
    };
    type: 'PRODUCER' | 'CONSUMER';
}

export interface Producer {
    user: User & { type: 'PRODUCER' };
    imageShowcase: Image[];
}

export interface Consumer {
    user: User & { type: 'CONSUMER' };
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

export interface BaseItems<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
}

export interface Address {
    id: number;
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

export interface Image {
    id: number;
    name: string;
    url: string;
    alt: string;
}

export type AuthenticatedUser = Consumer | Producer;
