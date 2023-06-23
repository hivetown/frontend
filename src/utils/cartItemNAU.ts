import { CartItem } from '@/types';

export class CartNAU {
    cart: CartItem[];

    constructor() {
        this.cart = [];
    }

    // Retornar o cart
    getCart() {
        const cartData = localStorage.getItem('cartNAU');
        if (cartData !== null) {
            return JSON.parse(cartData);
        }
        return null;
    }

    getLength() {
        const cartData = localStorage.getItem('cartNAU');
        if (cartData !== null) {
            return JSON.parse(cartData).length;
        }
    }

    //método para escrever na localstorage (a lista)
    writeLocalStorage() {
        localStorage.setItem('cartNAU', JSON.stringify(this.cart));
    }

    //método para adicionar um item (adiciona à lista e chama o de escrever)
    addItem(item: CartItem) {
        // Verifica se o carrinho existe
        this.checkCartExists();
        // Verifica se o item não está no carrinho
        // Se não estiver adiciona, se não, incrementa
        if (this.checkItemInCart(item) === false) {
            this.cart.push(item);
        }
        this.writeLocalStorage();
    }

    //método para remover um item (remove da lista e chama o de escrever)
    removeItem(item: CartItem) {
        this.cart = this.getCart();
        for (let i = 0; i < this.cart.length; i++) {
            if (item.id == this.cart[i].producerProduct.productSpec?.id) {
                this.cart.splice(i, 1);
            }
        }
        this.writeLocalStorage();
    }

    //método para editar (edita na lista e chama-o de escrever)
    substituteCartItem(itemBef: CartItem, itemAft: CartItem) {
        let indexToEdit = this.cart.indexOf(itemBef);
        this.cart[indexToEdit] = itemAft;
    }

    //método para limpar (define lista a vazio e chama-o de escrever)
    cleanCart() {
        this.cart = [];
        this.writeLocalStorage();
    }

    checkCartExists() {
        const cartData = localStorage.getItem('cartNAU');
        if (cartData) {
            this.cart = JSON.parse(cartData) as CartItem[];
        }
    }

    //método para verificar itens repetidos:
    checkItemInCart(item: CartItem) {
        console.log('item', item);
        console.log('productSpec', item.producerProduct.productSpec);
        console.log('cartGuardado', this.cart);
        if (this.cart.length !== 0) {
            for (let i = 0; i < this.cart.length; i++) {
                if (
                    item.producerProduct.productSpec?.id ==
                    this.cart[i].producerProduct.productSpec?.id
                ) {
                    this.incrementQuantity(i);
                    return true;
                }
            }
        }
        return false;
    }

    changeQuantity(item: CartItem, quantity: number) {
        this.cart = this.getCart();
        for (let i = 0; i < this.cart.length; i++) {
            if (item.id == this.cart[i].producerProduct.productSpec?.id) {
                this.cart[i].quantity = quantity;
            }
        }
        this.writeLocalStorage();
    }

    //para add +1 de quantidade
    incrementQuantity(producerProduct: number) {
        this.cart[producerProduct]['quantity'] =
            this.cart[producerProduct]['quantity'] + 1;
    }
}
