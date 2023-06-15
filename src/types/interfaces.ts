export interface Product {
    id: number;
    currentPrice: number;
    productionDate: Date;
    specification?: ProductSpec;
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

export interface ProducerProduct {
    id: number;
    currentPrice: number;
    productionDate: Date;
    stock: number;
    deletedAt: Date | null;
    producer?: Producer;
    productionUnit?: productionUnit;
    productSpec?: ProductSpec;
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

export interface productionUnit {
    id: number;
    name: string;
    address: Address;
    producer?: Producer;
    deletedAt: Date | null;
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
export interface Address2 {
    //necessitava sem o id para adicionar um novo
    //id: number;
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
export interface ShippingAdress {
    shippingAddressId: number;
}
export interface Order {
    id: number;
    items: Product[];
    shippingAddress: Address;
    consumer?: User;
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
