import { CartItem } from '@/types';

export class CartNAU {
    cart: CartItem[];

    constructor() {
        this.cart = [];
    }

    getCart();

    //método para ler da localstorage e carregar para memória (para a lista)
    //TODO: Apagar se continuar a ser inutil
    readAndSaveFromLS() {
        const cartData = localStorage.getItem('cartNAU');
        //if (cartData !== null) {
        ///    this.cart = JSON.parse(cartData);
        //}
        this.writeLS();
    }

    //método para escrever na localstorage (a lista)
    writeLS() {
        localStorage.setItem('cartNAU', JSON.stringify(this.cart));
    }

    //método para adicionar um item (adiciona à lista e chama o de escrever)
    buildCartNonAut(item: CartItem) {
        if (this.checkItemInCart(item) === false) {
            this.cart.push(item);
        }
        this.writeLS();
    }

    //método para remover um item (remove da lista e chama o de escrever)
    removeItem(item: CartItem) {
        let indexToRmv = this.cart.indexOf(item);
        this.cart.splice(indexToRmv, 1);
    }

    //método para editar (edita na lista e chama-o de escrever)
    editCart(itemBef: CartItem, itemAft: CartItem) {
        let indexToEdit = this.cart.indexOf(itemBef);
        this.cart[indexToEdit] = itemAft;
    }

    //método para limpar (define lista a vazio e chama-o de escrever)
    cleanCart() {
        this.cart = [];
        this.writeLS();
    }

    //método para verificar itens repetidos:
    checkItemInCart(item: CartItem) {
        if (this.cart.length !== 0) {
            for (let i = 0; i < this.cart.length; i++) {
                if (item.producerProduct == this.cart[i]['producerProduct']) {
                    this.incrementQuantity(i);
                    return true;
                }
            }
        }
        return false;
    }

    //para add +1 de quantidade
    incrementQuantity(producerProduct: number) {
        this.cart[producerProduct]['quantity'] =
            this.cart[producerProduct]['quantity'] + 1;
    }
}

// Usage example:
//const cart = new Cart();
//const item = new CartItem(12345, 2);
//cart.buildCartNonAut(item);

// -> CartItem -> [] -> Cart([])
// -> +CartItem -> [] -> repeat
