import { ProducerProduct } from '@types';

export class CartNAU {
    cart: ProducerProduct[];
    cartQuantities = [] as number[];

    constructor() {
        this.cart = [];
        this.cartQuantities = [];
    }

    // Retornar o cart
    getCart() {
        const cartData = localStorage.getItem('cartNAU');
        if (cartData !== null) {
            return JSON.parse(cartData);
        } else {
            this.writeLocalStorage();
            return null;
        }
    }

    // Retornar quantidades do cart
    getCartQuantities() {
        const cartData = localStorage.getItem('cartNAUQts');
        if (cartData !== null) {
            return JSON.parse(cartData);
        } else {
            this.writeLocalStorage();
            return null;
        }
    }

    getLength() {
        const cartData = localStorage.getItem('cartNAU');
        if (cartData !== null) {
            return JSON.parse(cartData).length;
        }
    }

    getQuantity(item: ProducerProduct) {
        this.cart = this.getCart();
        this.cartQuantities = this.getCartQuantities();
        const indexIwant = this.findIndex(item);
        if (indexIwant !== null) {
            return this.cartQuantities[indexIwant];
        } else {
            return -1;
        }
    }

    //método para escrever na localstorage (a lista)
    writeLocalStorage() {
        localStorage.setItem('cartNAU', JSON.stringify(this.cart));
        localStorage.setItem('cartNAUQts', JSON.stringify(this.cartQuantities));
    }

    //método para adicionar um item (adiciona à lista e chama o de escrever)
    addItemByItem(item: ProducerProduct) {
        // Verifica se o carrinho existe
        this.checkCartExists();
        this.cart = this.getCart();
        this.cartQuantities = this.getCartQuantities();
        // Verifica se o item não está no carrinho
        // Se não estiver adiciona, se não, incrementa
        if (this.checkItemInCart(item) === false) {
            this.cart.push(item);
            this.cartQuantities.push(1);
        }
        this.writeLocalStorage();
    }

    //método para remover um item (remove da lista e chama o de escrever)
    removeItem(item: ProducerProduct) {
        this.cart = this.getCart();
        this.cartQuantities = this.getCartQuantities();
        const indexIwant = this.findIndex(item);
        this.cart.splice(indexIwant, 1);
        this.cartQuantities.splice(indexIwant, 1);
        this.writeLocalStorage();
    }

    //método para limpar (define lista a vazio e chama-o de escrever)
    cleanCart() {
        this.cart = [];
        this.cartQuantities = [];
        this.writeLocalStorage();
    }

    checkCartExists() {
        const cartData = localStorage.getItem('cartNAU');
        if (cartData) {
            this.cart = JSON.parse(cartData) as ProducerProduct[];
        }
    }

    //método para verificar itens repetidos:
    checkItemInCart(item: ProducerProduct) {
        this.cart = this.getCart();
        this.cartQuantities = this.getCartQuantities();
        if (this.cart.length !== 0) {
            const indexIwant = this.findIndex(item);
            if (indexIwant >= 0 && indexIwant < this.cart.length) {
                this.incrementQuantity(indexIwant);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    changeQuantity(item: ProducerProduct, quantity: number) {
        this.cart = this.getCart();
        const indexIwant = this.findIndex(item);
        if (indexIwant >= 0 && indexIwant < this.cartQuantities.length) {
            this.cartQuantities[indexIwant] = quantity;
        }
        this.writeLocalStorage();
    }

    //para add +1 de quantidade
    incrementQuantity(indexIwant: number) {
        this.cartQuantities = this.getCartQuantities();
        this.cartQuantities[indexIwant] = this.cartQuantities[indexIwant] + 1;
        this.writeLocalStorage();
    }

    findIndex(item: ProducerProduct) {
        let indexIwant = -1;

        for (let i = 0; i < this.cart.length; i++) {
            if (item.id === this.cart[i].id) {
                indexIwant = i;
            }
        }
        return indexIwant;
    }
}
