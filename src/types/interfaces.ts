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
  

export interface Consumer {
    id: number;
    name: string;
    email: string;
    phone: string;
    vat: string;
    type: string;
  }
  

export interface Order {
    id: number;
    items: Product[];
    shippingAddress: Address;
    consumer?: User;
  }

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    vat: string;
    type: string;
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
