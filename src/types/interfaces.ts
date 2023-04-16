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



export interface ApiRequest {
    headers?: Record<string, string>;
    params?: Record<string, string>;
    data?: any;
}


export interface ConsumerCart {
    items: {
        producerProduct?: ProducerProduct;
        consumer: Consumer;
        quantity: number;
    }[] //Para indicar que é um array destas vars
}

export interface ProducerProduct {
    id: number;
    currentPrice: number;
    productionDate: Date;
    stock: number;
    producer?: Producer; //Meto o ? para referir outra interface
    productionUnit?: ProductionUnit;
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