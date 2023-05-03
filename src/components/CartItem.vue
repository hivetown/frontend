<template>
	<div class="d-flex gap-4">
		<router-link to="/produto">
			<b-card class="prod-card">
				<!-- <img src="https://placehold.jp/150x150.png" class="square-image"> -->
				<img :src="cartItem.producerProduct!.productSpec!.images[0].url" class="square-image" alt="Product image"/>
			</b-card>
		</router-link>
		<b-card-text class="w-100" style="background-color: ">
			<div style="margin-top: 45px">
				<!--<p>{{cartItem}}</p>-->

				<div class="d-flex">
					<h5>{{ cartItem.producerProduct!.productSpec!.name }}</h5>
				</div>

				<div class="d-flex gap-2"> 
          <p class="mt-3">Quantidade:</p>
					<div class="d-flex" style="margin-top: -10px">
						<b-col col lg="5">
							<b-form-select v-model="selectedBD" :options="options" size="sm" class="mt-3" @change=""></b-form-select>
						</b-col>
					</div>
          <p class="mt-3">{{ cartItem.producerProduct!.currentPrice }}€/item</p>
          <div class="d-flex ms-auto mt-3 justify-content-end">
            <h3>{{ cartItemPrice }}€</h3>
          </div>
					<!-- O <p> seguinte apenas é adicionado quando o item tem outro preço e está agor em promoção -->

					<div class="d-flex ms-auto justify-content-end">
						<button @click="removeCartItem" type="button" class="btn btn-outline-secondary circle-btn" title="Remover do carrinho">
							<i class="bi bi-x-lg"></i>
						</button>
					</div>
				</div>
			</div>
		</b-card-text>
	</div>
</template>

<script lang="ts">
	import { CartItem } from '@/types';
	import { PropType } from 'vue';
	import { deleteCartItem } from "@/api"; //'@/api' vai buscar ao src/api/index.ts que por sua vez vai ao src/api/consumers.ts

	export default {
	  data() {
	    return {
        selectedBD: this.cartItem.quantity,
	      selectedDefault: 1,
	      options: [
	        { value: 1, text: '1' },
	        { value: 2, text: '2' },
	        { value: 3, text: '3' },
	        { value: 4, text: '4' },
	        { value: 5, text: '5' },
	        { value: 6, text: '6' },
	        { value: 7, text: '7' },
	        { value: 8, text: '8' },
	        { value: 9, text: '9' },
	        { value: 10, text: '10' },
	      ],

        cartItemPrice: this.priceCalc(),
	    };
	  },
	  props: { // Isto são coisas que se recebe do componente pai
	    cartItem: {
	      type: Object as PropType<CartItem>,
	      required: true,
	    },
	  },

    methods: {
      priceCalc(): number {
        return this.cartItem.producerProduct!.currentPrice * this.cartItem.quantity;
      },


	  async removeCartItem(): Promise<void> {
		try	{
			//TODO: Fazer aviso de confirmação ao user se realmente quer apagar o item do carrinho
			//TODO: Desativar botão aqui
			await deleteCartItem(1,this.cartItem.producerProduct!.id)
			//TODO: Mudar o 1 para o id do cliente
			console.log('test');
			this.$emit('deleteCartItem',this.cartItem.producerProduct!.id);
			console.log('id:',this.cartItem.producerProduct!.id);
		}
		catch(error) {
			if(error instanceof Error) {
				console.log(error.message)
			}
		}
	  }
    },
	};
</script>

<style>
  .square-image {
    width: 50%;
    height: 50%;
  }
</style>