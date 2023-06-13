export class CartItemNAU {
    itemID: number;
    quantity: number;

    constructor(itemID: number, quantity: number) {
        this.itemID = itemID;
        this.quantity = quantity;
    }
}

export class CartNAU {
    listForNonAut: CartItemNAU[];

    constructor() {
        this.listForNonAut = [];
    }

    buildCartNonAut(item: CartItemNAU) {
        this.listForNonAut.push(item);
        localStorage.setItem(
            'cartOfNonAutUser',
            JSON.stringify(this.listForNonAut)
        );
    }
}

// Usage example:
//const cart = new Cart();
//const item = new CartItem(12345, 2);
//cart.buildCartNonAut(item);

// -> CartItem -> [] -> Cart([])
// -> +CartItem -> [] -> repeat
