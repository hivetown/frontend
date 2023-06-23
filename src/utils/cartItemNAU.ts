export class CartNAU {
    cart: object[];

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
    addItemByItem(item: object) {
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
    removeItem(item: object) {
        this.cart = this.getCart();
        for (let i = 0; i < this.cart.length; i++) {
            if (item.id == this.cart[i].id) {
                this.cart.splice(i, 1);
            }
        }
        this.writeLocalStorage();
    }

    //método para editar (edita na lista e chama-o de escrever)
    substituteCartItem(itemBef: object, itemAft: object) {
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
            this.cart = JSON.parse(cartData) as object[];
        }
    }

    //método para verificar itens repetidos:
    checkItemInCart(item: object) {
        if (this.cart.length !== 0) {
            for (let i = 0; i < this.cart.length; i++) {
                if (item.id == this.cart[i].id) {
                    this.incrementQuantity(i);
                    return true;
                }
            }
        }
        return false;
    }

    changeQuantity(item: object, quantity: number) {
        this.cart = this.getCart();
        console.log('item', item);
        console.log('item id', item.id);
        for (let i = 0; i < this.cart.length; i++) {
            if (item.id == this.cart[i].id) {
                this.cart[i].quantity = quantity;
            }
        }
        this.writeLocalStorage();
    }

    //para add +1 de quantidade
    incrementQuantity(id: number) {
        this.cart[id].quantity = this.cart[id].quantity + 1;
    }
}
