export interface ProductSpecs extends BaseItems<ProductSpec> {
    maxPrice: number;
    minPrice: number;
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
    products?: ProducerProduct[];
}

export interface Image {
    id: number;
    name: string;
    url: string;
    alt: string;
}

export interface ProducerProduct {
    id: number;
    currentPrice: number;
    productionDate: Date;
    stock: number;
    deletedAt: Date | null;
    producer?: Producer;
    productionUnit?: ProductionUnit;
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
    disableEmails?: boolean;
    type: 'PRODUCER' | 'CONSUMER';
}

export interface Producer {
    user: User & { type: 'PRODUCER' };
    imageShowcase: Image[];
    addresses?: Address[];
    deletedAt?: string;
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
    deletedAt?: string;
    addresses?: Address[];
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

export interface ProductionUnit {
    id: number;
    name: string;
    address: Address;
    producer?: Producer | number;
    images?: Image[];
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

export interface Transport {
    id: number;
    licensePlate: string;
    productionUnit?: ProductionUnit;
    status: string;
    shipments?: Shipment[];
    image: Image;
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
    consumer?: number;
}

export type CreateAddress = Omit<Address, 'id'>;

export interface ShippingAdress {
    shippingAddressId: number;
}
export interface Order {
    id: number;
    shippingAddress: Address;
    orderDate: string;
    generalStatus: string;
    totalPrice: number;
}

export interface OrderItem {
    price: number;
    producerProduct: ProducerProduct;
    quantity: number;
    status: 'Paid' | 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';
}

export interface CreateProducerProduct {
    currentPrice: number;
    productionDate: Date;
    stock: number;
    productionUnitId: number;
    productSpecId: number;
}

export interface UpdateProducerProduct {
    currentPrice: number;
    productionDate: Date;
    stock: number;
    productionUnitId: number;
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

export interface SelectedUnit {
    id: number;
    name: string;
    address: Address;
    producer: Producer;
    deletedAt: Date | null;
}

export interface Location {
    items: {
        city: string;
        county: string;
        district: string;
        door: string;
        floor: number;
        id: number;
        latitude: number;
        longitude: number;
        number: number;
        parish: string;
        street: string;
        zipCode: string;
    }[];
    baseItems: BaseItems<{
        address: Address;
    }>;
}
export interface ReportCard {
    id: number;
    numeroEncomendas: number;
    numeroEncomendasCanceladas: number;
    totalProdutos: number;
    totalProdutosCancelados: number;
    comprasTotais: number;
    comprasTotaisCanceladas: number;
    numeroProdutosEncomendados: number;
    numeroProdutosEncomendadosCancelados: number;
}

export interface ReportMap {
    shippingAddress: Address;
    productionUnitAddress: Address;
}
export interface Cart extends BaseItems<CartItem> {}

export interface ReportEvolution {
    comprasTotais?: number;
    comprasTotaisCancelados?: number;
    numeroEncomendas?: number;
    numeroEncomendasCancelados?: number;
    totalProdutos?: number;
    totalProdutosCancelados?: number;
    numeroProdutosEncomendados?: number;
    numeroProdutosEncomendadosCancelados?: number;
}

export interface ReportBarChartProduct {
    id: number;
    nome: string;
    comprasTotais?: number;
    comprasTotaisCancelados?: number;
    numeroEncomendas?: number;
    numeroEncomendasCancelados?: number;
    totalProdutos?: number;
    totalProdutosCancelados?: number;
    numeroProdutosEncomendados?: number;
    numeroProdutosEncomendadosCancelados?: number;
}

// Ver se isto está a ser usado
export interface ReportProducts {
    id: number;
    nome: string;
    totalProdutos?: number;
    totalProdutosCancelados?: number;
    numeroEncomendas?: number;
    numeroEncomendasCancelados?: number;
    comprasTotais?: number;
    comprasTotaisCancelados?: number;
    numeroProdutosEncomendados?: number;
    numeroProdutosEncomendadosCancelados?: number;
}

export interface reportProducerClients {
    id: number;
    nome: string;
    totalProdutos?: number;
    totalProdutosCancelados?: number;
    numeroEncomendas?: number;
    numeroEncomendasCancelados?: number;
    comprasTotais?: number;
    comprasTotaisCancelados?: number;
    numeroProdutosEncomendados?: number;
    numeroProdutosEncomendadosCancelados?: number;
}
export interface CartItem {
    producerProduct: ProducerProduct;
    consumer?: Consumer;
    quantity: number;
}
export interface Shipment {
    carrier: Carrier;
    events: ShipmentEvent[];
}
export enum ShipmentStatus {
    /* eslint-disable no-unused-vars*/
    Paid = 0,
    Processing = 1,
    Shipped = 2,
    Delivered = 3,
    Canceled = 4,
    /* eslint-enable no-unused-vars*/
}
export interface ShipmentEvent {
    id: number;
    date: string;
    shipment?: Shipment;
    address: Address;
    status: ShipmentStatus;
}
export enum CarrierStatus {
    /* eslint-disable no-unused-vars*/
    Available = 'AVAILABLE',
    Unavailable = 'UNAVAILABLE',
    /* eslint-enable no-unused-vars*/
}
export interface Carrier {
    id: number;
    licensePlate: string;
    productionUnit: ProductionUnit;
    status: CarrierStatus;
    image: Image;
}

export interface Notification {
    id: number;
    actor: User | number;
    notifier: User;
    createdAt: string;
    readAt: string | null;
    title: string;
    message: string;
}

export interface ProductSpecFieldWithCategory {
    category: Category;
    products: {
        fieldValues: ProductSpecField[];
    }[];
}
