<template>
    <div class="" style="width: 100%">
      <h2 class="parent dgreen-txt">Encomenda</h2>
	  <br>
	  <h4 class="parent dgreen-txt">Detalhes da Encomenda Nº936872893</h4>
      <div>
		<b-row>
			<b-col>
				<OrderItems></OrderItems>
				<OrderItems></OrderItems>
			</b-col>
			<b-col class="d-flex align-items-center justify-content-center ">
				<div class="text-center">
					<p><b>Preço Total:</b> Bué</p>
					<p><b>Quantidade de Itens:</b> Tantos que não sei</p>
					<p><b>Transportador:</b> Euro Truck Simulator Delivery</p>
					<p><b>Morada:</b> Rua das Ruas Nº943</p>
					<p><b>Modo de Pagamento:</b> PayAmigo</p>
				</div>
			</b-col>
		</b-row>
	  </div>
	  </div>
</template>

<script setup lang="ts">
import OrderItems from "@/components/OrderItems.vue";
import { onMounted, ref, watch } from "vue";
import { fetchAllProducts } from "@/api";
import { Product } from "@/types/interfaces";

const products = ref<Product[]>([]);

const fetchProducts = async (search?: string) => {
  products.value = await fetchAllProducts(search).then((ps) => ps.data);
};

onMounted(fetchProducts);

const search = ref("");
watch(search, fetchProducts);
</script>
