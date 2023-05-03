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
    images: Image[];
    products?: Product[];
}

export interface Image {
    id: number;
    name: string;
    url: string;
    alt: string;
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Cart extends BaseItems<CartItem> {}

export interface CartItem {
    producerProduct?: ProducerProduct;
    consumer: Consumer;
    quantity: number;
}

export interface ProducerProduct {
    id: number;
    currentPrice: number;
    productionDate: Date;
    stock: number;
    producer?: Producer; //Meto o ? para referir outra interface
    productionUnit?: ProductionUnit;
    productSpec?: ProductSpec;
}

export interface ProductionUnit {
    id: number;
    name: string;
    address?: Address;
    producer?: Producer;
}

export interface Address {
    // TODO
}
