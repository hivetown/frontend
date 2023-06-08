// import type { DefineComponent } from 'vue';
import ProductionUnits from '@/views/ProductionUnits.vue';
export interface Product {
    id: number;
    currentPrice: number;
    productionDate: Date;
    // specification?: ProductSpec;
    specification?: ProductSpecification;
    producer?: Producer;
}

export interface ProductSpec {
    id: number;
    name: string;
    description: string;
    deletedAt: Date;
    minPrice: number;
    maxPrice: number;
    producersCount: number;
    images: Image[];
    products?: Product[];
}

export interface Image {
    id: number;
    name: string;
    url: string;
    alt: string;
}

// export interface ProducerProduct {
//     id: number;
//     currentPrice: number;
//     productionDate: Date;
//     stock: number;
//     deletedAt: Date | null;
//     producer?: Producer;
//     productionUnit?: productionUnit;
//     productSpec?: ProductSpec;
// }

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
    image?: Image;
    type: 'PRODUCER' | 'CONSUMER';
}

export interface Producer {
    user: User & { type: 'PRODUCER' };
    imageShowcase: Image[];
}

export interface Category {
    id: number;
    name: string;
    parent?: Category;
    image: Image;
    showSubCategories?: boolean;
    subCategories?: Category;
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

// export interface productionUnit {
//     id: number;
//     name: string;
//     address: Address;
//     producer?: Producer;
//     deletedAt: Date | null;
// }

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
    items: Product[];
    id: number;
    currentPrice: number;
    productionDate: Date;
    specification?: ProductSpecification;
    producer?: Producer;
}

export interface ProductionUnits {
    id: number;
    name: string;
    description: string;
    producer: Producer;
    products: Product[];
    address: Address;
    images: Image[];
}

export interface Transport {
    id: number;
    name: string;
    description: string;
    producer: Producer;
    products: Product[];
    address: Address;
    images: Image[];
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
    // productionUnit?: ProductionUnit;
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

export interface ProductSpecField {
    field: Field;
    value: string;
}

export interface Field {
    id: number;
    name: string;
    unit: string;
    type: string;
    possibleValues: FieldPossibleValue[];
}

export interface FieldPossibleValue {
    id: number;
    value: string;
}
