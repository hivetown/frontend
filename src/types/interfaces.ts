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

export interface ShippingAdress {
    shippingAddressId: number;
}


export interface ApiRequest {
    headers?: Record<string, string>;
    params?: Record<string, string>;
    data?: any;
}

export interface Address {
    id: number;
    door: string;
    floor: string;
    number: string;
    zipCode: string;
    street: string;
    parish: string;
    county: string;
    city: string;
    district: string;
    latitude: number;
    longitude: number;
  }
